// Admin Panel React Component
"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";

const API_BASE_URL = "https://hnm2-be.vercel.app";

interface Registration {
  id: string;
  registrationId: string;
  userName: string;
  userEmail: string;
  planName: string;
  planType: string;
  planPrice: number;
  paymentId: string;
  paymentStatus: string;
  registrationDate: string;
  adminVerified?: boolean;
  adminNotes?: string;
  revenue?: number; // For analytics
}

interface Analytics {
  totalRegistrations: number;
  totalRevenue: number;
  planBreakdown: Record<string, number>;
  typeBreakdown: Record<string, number>;
  dailyRegistrations: Record<string, number>;
  recentRegistrations: Registration[];
  topPlans: { name: string; count: number }[];
  verificationStatus: {
    verified: number;
    pending: number;
  };
}

interface AdminUser {
  username: string;
  email: string;
  role: string;
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Data states
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Filters and pagination
  const [filters, setFilters] = useState({
    search: "",
    planType: "",
    planName: "",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 20
  });

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const adminData = localStorage.getItem("adminData");

    if (token && adminData) {
      try {
        setAdmin(JSON.parse(adminData));
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid admin data");
        logout();
      }
    }
  }, []);

  // Load data when authenticated and tab changes
  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === "dashboard") {
        loadAnalytics();
      } else if (activeTab === "registrations") {
        loadRegistrations();
      }
    }
  }, [isAuthenticated, activeTab, filters, pagination]);

  // Admin login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminData", JSON.stringify(data.admin));
      
      setAdmin(data.admin);
      setIsAuthenticated(true);
      setLoginForm({ username: "", password: "" });
      
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoginLoading(false);
    }
  };

  // Admin logout
  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    setAdmin(null);
    setIsAuthenticated(false);
    setActiveTab("dashboard");
  };

  // Load analytics data
  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_BASE_URL}/admin/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setAnalytics(data.analytics);
      }
    } catch (error) {
      console.error("Failed to load analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load registrations data
  const loadRegistrations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const queryParams = new URLSearchParams({
        page: pagination.currentPage.toString(),
        limit: pagination.limit.toString(),
        ...filters,
      });

      const response = await fetch(
        `${API_BASE_URL}/admin/registrations?${queryParams}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRegistrations(data.registrations);
      }
    } catch (error) {
      console.error("Failed to load registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Verify registration
  const verifyRegistration = async (registrationId: string, verified: boolean, notes = "") => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${API_BASE_URL}/admin/verify-registration/${registrationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ verified, notes }),
        }
      );

      if (response.ok) {
        loadRegistrations(); // Refresh data
        alert(`Registration ${verified ? "verified" : "unverified"} successfully!`);
      }
    } catch (error) {
      console.error("Failed to verify registration:", error);
      alert("Failed to update registration status");
    }
  };

  // Export CSV
  const exportCSV = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_BASE_URL}/admin/export/csv`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `registrations-${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Failed to export CSV:", error);
      alert("Failed to export data");
    }
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Admin Login
          </h2>
          
          {error && (
            <div className="bg-red-600 text-white p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              {loginLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Main admin panel
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold">
              Hikari no Matsuri - Admin Panel
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {admin?.username}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {["dashboard", "registrations"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-300 hover:text-white hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="mt-2">Loading...</p>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && analytics && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Registrations</h3>
                <p className="text-3xl font-bold text-blue-400">
                  {analytics.totalRegistrations}
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
                <p className="text-3xl font-bold text-green-400">
                  ₹{analytics.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Verified</h3>
                <p className="text-3xl font-bold text-green-400">
                  {analytics.verificationStatus.verified}
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Pending</h3>
                <p className="text-3xl font-bold text-yellow-400">
                  {analytics.verificationStatus.pending}
                </p>
              </div>
            </div>

            {/* Top Plans */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Top Plans</h3>
              <div className="space-y-2">
                {analytics.topPlans.map((plan, index) => (
                  <div key={plan.name} className="flex justify-between items-center">
                    <span>{plan.name}</span>
                    <span className="bg-blue-600 px-2 py-1 rounded text-sm">
                      {plan.count} registrations
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Registrations */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Recent Registrations</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2">Name</th>
                      <th className="text-left py-2">Plan</th>
                      <th className="text-left py-2">Revenue</th>
                      <th className="text-left py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.recentRegistrations.map((reg) => (
                      <tr key={reg.id} className="border-b border-gray-700">
                        <td className="py-2">{reg.userName}</td>
                        <td className="py-2">{reg.planName}</td>
                        <td className="py-2">₹{reg.revenue}</td>
                        <td className="py-2">
                          {new Date(reg.registrationDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Registrations Tab */}
        {activeTab === "registrations" && (
          <div className="space-y-6">
            {/* Filters and Actions */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                  />
                  <select
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                    value={filters.planType}
                    onChange={(e) =>
                      setFilters({ ...filters, planType: e.target.value })
                    }
                  >
                    <option value="">All Types</option>
                    <option value="pass">Pass</option>
                    <option value="workshop">Workshop</option>
                  </select>
                </div>
                <button
                  onClick={exportCSV}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                >
                  Export CSV
                </button>
              </div>
            </div>

            {/* Registrations Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="text-left py-3 px-4">Registration ID</th>
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Plan</th>
                      <th className="text-left py-3 px-4">Price</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg) => (
                      <tr key={reg.id} className="border-b border-gray-700">
                        <td className="py-3 px-4 font-mono text-sm">
                          {reg.registrationId}
                        </td>
                        <td className="py-3 px-4">{reg.userName}</td>
                        <td className="py-3 px-4">{reg.userEmail}</td>
                        <td className="py-3 px-4">
                          <span className="bg-blue-600 px-2 py-1 rounded text-xs">
                            {reg.planName}
                          </span>
                        </td>
                        <td className="py-3 px-4">₹{reg.planPrice}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              reg.paymentStatus === "Verified"
                                ? "bg-green-600"
                                : "bg-yellow-600"
                            }`}
                          >
                            {reg.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => verifyRegistration(reg.id, true)}
                              className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs"
                            >
                              Verify
                            </button>
                            <button
                              onClick={() => verifyRegistration(reg.id, false)}
                              className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
