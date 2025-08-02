// Admin Panel React Component
"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Download, Search, Eye, Check, X, LogOut, BarChart3, Users, Plus, Trash2 } from "lucide-react";
import { toast, Toaster } from "sonner";

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
  const [registrationsLoading, setRegistrationsLoading] = useState(false);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
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

  // Add registration dialog states
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [addRegistrationForm, setAddRegistrationForm] = useState({
    userName: "",
    userEmail: "",
    planName: "",
    planType: "pass",
    planPrice: 0,
    paymentId: "",
    paymentStatus: "Pending"
  });
  const [addingRegistration, setAddingRegistration] = useState(false);

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
  }, [isAuthenticated, activeTab]);

  // Load registrations when filters change (with debounce)
  useEffect(() => {
    if (isAuthenticated && activeTab === "registrations") {
      const timeoutId = setTimeout(() => {
        loadRegistrations();
      }, 300); // 300ms debounce

      return () => clearTimeout(timeoutId);
    }
  }, [filters.search, filters.planType, filters.planName, pagination.currentPage]);

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
    setAnalyticsLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_BASE_URL}/admin/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setAnalytics(data.analytics);
      } else {
        setError("Failed to load analytics");
      }
    } catch (error) {
      console.error("Failed to load analytics:", error);
      setError("Network error while loading analytics");
    } finally {
      setAnalyticsLoading(false);
    }
  };

  // Load registrations data
  const loadRegistrations = async () => {
    setRegistrationsLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("adminToken");
      const queryParams = new URLSearchParams({
        page: pagination.currentPage.toString(),
        limit: pagination.limit.toString(),
      });

      // Only add non-empty filters
      if (filters.search.trim()) queryParams.append('search', filters.search.trim());
      if (filters.planType) queryParams.append('planType', filters.planType);
      if (filters.planName) queryParams.append('planName', filters.planName);

      console.log("Loading registrations from:", `${API_BASE_URL}/admin/registrations?${queryParams}`);
      const startTime = performance.now();
      
      const response = await fetch(
        `${API_BASE_URL}/admin/registrations?${queryParams}`,
        {
          headers: { 
            Authorization: `Bearer ${token}`
          },
        }
      );

      const endTime = performance.now();
      console.log(`Registration API call took ${endTime - startTime} milliseconds`);

      if (response.ok) {
        const data = await response.json();
        console.log("Registrations loaded:", data.registrations?.length || 0, "items");
        setRegistrations(data.registrations || []);
      } else {
        const errorText = await response.text();
        console.error("Registration loading error:", response.status, errorText);
        setError(`Failed to load registrations (${response.status})`);
      }
    } catch (error) {
      console.error("Failed to load registrations:", error);
      setError("Network error while loading registrations");
    } finally {
      setRegistrationsLoading(false);
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
        // Update the registration status in the local state immediately
        setRegistrations(prevRegistrations => 
          prevRegistrations.map(reg => 
            reg.id === registrationId 
              ? { 
                  ...reg, 
                  paymentStatus: verified ? "Verified" : "Pending",
                  adminVerified: verified 
                }
              : reg
          )
        );

        // Show success toast
        toast.success(
          verified 
            ? "Registration verified successfully!" 
            : "Registration marked as pending!"
        );
      } else {
        const errorText = await response.text();
        console.error("Verify registration error:", errorText);
        toast.error("Failed to update registration status");
      }
    } catch (error) {
      console.error("Failed to verify registration:", error);
      toast.error("Network error while updating registration");
    }
  };

  // Delete registration states
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState<{
    open: boolean;
    registrationId: string;
    registrationName: string;
  }>({
    open: false,
    registrationId: "",
    registrationName: ""
  });

  // Delete registration
  // Delete registration
  const deleteRegistration = async (registrationId: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${API_BASE_URL}/admin/registration/${registrationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Remove the registration from local state immediately
        setRegistrations(prevRegistrations => 
          prevRegistrations.filter(reg => reg.id !== registrationId)
        );

        // Close the confirmation dialog
        setDeleteConfirmDialog({ open: false, registrationId: "", registrationName: "" });
        
        // Show success toast
        toast.success("Registration deleted successfully!");
      } else {
        const errorText = await response.text();
        console.error("Delete registration error:", errorText);
        toast.error("Failed to delete registration");
      }
    } catch (error) {
      console.error("Failed to delete registration:", error);
      toast.error("Network error while deleting registration");
    }
  };

  // Handle delete confirmation
  const handleDeleteClick = (registrationId: string, registrationName: string) => {
    setDeleteConfirmDialog({
      open: true,
      registrationId,
      registrationName
    });
  };

  // Add registration
  const addRegistration = async () => {
    setAddingRegistration(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_BASE_URL}/admin/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addRegistrationForm),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Add the new registration to local state
        const newRegistration = {
          ...data.data,
          id: data.registrationId
        };
        setRegistrations(prevRegistrations => [newRegistration, ...prevRegistrations]);

        // Close dialog and reset form
        setShowAddDialog(false);
        setAddRegistrationForm({
          userName: "",
          userEmail: "",
          planName: "",
          planType: "pass",
          planPrice: 0,
          paymentId: "",
          paymentStatus: "Pending"
        });

        // Show success toast
        toast.success("Registration added successfully!");
      } else {
        const errorText = await response.text();
        console.error("Add registration error:", errorText);
        toast.error("Failed to add registration");
      }
    } catch (error) {
      console.error("Failed to add registration:", error);
      toast.error("Network error while adding registration");
    } finally {
      setAddingRegistration(false);
    }
  };

  // Export Excel
  const exportExcel = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_BASE_URL}/admin/export/excel`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `registrations-${new Date().toISOString().split("T")[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Failed to export Excel:", error);
      alert("Failed to export data");
    }
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-destructive text-destructive-foreground p-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Username
                </label>
                <Input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, username: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loginLoading}
                className="w-full"
              >
                {loginLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main admin panel
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <BarChart3 className="h-6 w-6" />
              Hikari no Matsuri - Admin Panel
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">Welcome, {admin?.username}</span>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "registrations", label: "Registrations", icon: Users }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className="h-12 px-4"
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <Card className="border-destructive mb-6">
            <CardContent className="pt-6">
              <div className="text-destructive text-center">
                <p>{error}</p>
                <Button 
                  onClick={() => activeTab === "dashboard" ? loadAnalytics() : loadRegistrations()}
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                >
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {analyticsLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-2 text-muted-foreground">Loading analytics...</p>
              </div>
            ) : analytics ? (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.totalRegistrations}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        ₹{analytics.totalRevenue.toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Verified</CardTitle>
                      <Check className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        {analytics.verificationStatus.verified}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pending</CardTitle>
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-yellow-600">
                        {analytics.verificationStatus.pending}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Top Plans */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Plans</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {analytics.topPlans.map((plan, index) => (
                        <div key={plan.name} className="flex justify-between items-center">
                          <span>{plan.name}</span>
                          <Badge variant="secondary">
                            {plan.count} registrations
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Registrations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Registrations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead>Revenue</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {analytics.recentRegistrations.map((reg) => (
                          <TableRow key={reg.id}>
                            <TableCell>{reg.userName}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{reg.planName}</Badge>
                            </TableCell>
                            <TableCell>₹{reg.revenue}</TableCell>
                            <TableCell>
                              {new Date(reg.registrationDate).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            ) : null}
          </div>
        )}

        {/* Registrations Tab */}
        {activeTab === "registrations" && (
          <div className="space-y-6">
            {/* Filters and Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search registrations..."
                        className="pl-10 w-64"
                        value={filters.search}
                        onChange={(e) =>
                          setFilters({ ...filters, search: e.target.value })
                        }
                      />
                    </div>
                    <Select 
                      value={filters.planType || "all"} 
                      onValueChange={(value) => setFilters({ ...filters, planType: value === "all" ? "" : value })}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="pass">Pass</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowAddDialog(true)}
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Registration
                    </Button>
                    <Button
                      onClick={exportExcel}
                      variant="outline"
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Export Excel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Registrations Table */}
            <Card>
              <CardContent className="p-0">
                {registrationsLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mt-2 text-muted-foreground">Loading registrations...</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Registration ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registrations.length > 0 ? (
                        registrations.map((reg) => (
                          <TableRow key={reg.id}>
                            <TableCell className="font-mono text-sm">
                              {reg.registrationId}
                            </TableCell>
                            <TableCell className="font-medium">{reg.userName}</TableCell>
                            <TableCell>{reg.userEmail}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                {reg.planName}
                              </Badge>
                            </TableCell>
                            <TableCell>₹{reg.planPrice}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  reg.paymentStatus === "Verified" ? "default" : "secondary"
                                }
                              >
                                {reg.paymentStatus}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  onClick={() => verifyRegistration(reg.id, true)}
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  title="Verify registration"
                                >
                                  <Check className="h-4 w-4 text-green-600" />
                                </Button>
                                <Button
                                  onClick={() => verifyRegistration(reg.id, false)}
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  title="Unverify registration"
                                >
                                  <X className="h-4 w-4 text-red-600" />
                                </Button>
                                <Button
                                  onClick={() => handleDeleteClick(reg.id, reg.userName)}
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  title="Delete registration"
                                >
                                  <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            No registrations found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Add Registration Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Registration</DialogTitle>
            <DialogDescription>
              Add a new registration for on-spot attendees.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="userName" className="text-right">
                Name
              </label>
              <Input
                id="userName"
                value={addRegistrationForm.userName}
                onChange={(e) =>
                  setAddRegistrationForm({
                    ...addRegistrationForm,
                    userName: e.target.value,
                  })
                }
                className="col-span-3"
                placeholder="Enter full name"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="userEmail" className="text-right">
                Email
              </label>
              <Input
                id="userEmail"
                type="email"
                value={addRegistrationForm.userEmail}
                onChange={(e) =>
                  setAddRegistrationForm({
                    ...addRegistrationForm,
                    userEmail: e.target.value,
                  })
                }
                className="col-span-3"
                placeholder="Enter email address"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="planType" className="text-right">
                Type
              </label>
              <Select
                value={addRegistrationForm.planType}
                onValueChange={(value) =>
                  setAddRegistrationForm({
                    ...addRegistrationForm,
                    planType: value,
                  })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pass">Pass</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="planName" className="text-right">
                Plan Name
              </label>
              <Input
                id="planName"
                value={addRegistrationForm.planName}
                onChange={(e) =>
                  setAddRegistrationForm({
                    ...addRegistrationForm,
                    planName: e.target.value,
                  })
                }
                className="col-span-3"
                placeholder="e.g., Day 1 Pass, Cosplay Workshop"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="planPrice" className="text-right">
                Price (₹)
              </label>
              <Input
                id="planPrice"
                type="number"
                value={addRegistrationForm.planPrice}
                onChange={(e) =>
                  setAddRegistrationForm({
                    ...addRegistrationForm,
                    planPrice: parseInt(e.target.value) || 0,
                  })
                }
                className="col-span-3"
                placeholder="0"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="paymentId" className="text-right">
                Payment ID
              </label>
              <Input
                id="paymentId"
                value={addRegistrationForm.paymentId}
                onChange={(e) =>
                  setAddRegistrationForm({
                    ...addRegistrationForm,
                    paymentId: e.target.value,
                  })
                }
                className="col-span-3"
                placeholder="Payment reference ID (optional)"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="paymentStatus" className="text-right">
                Status
              </label>
              <Select
                value={addRegistrationForm.paymentStatus}
                onValueChange={(value) =>
                  setAddRegistrationForm({
                    ...addRegistrationForm,
                    paymentStatus: value,
                  })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Verified">Verified</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={addRegistration}
              disabled={addingRegistration || !addRegistrationForm.userName || !addRegistrationForm.userEmail}
            >
              {addingRegistration ? "Adding..." : "Add Registration"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmDialog.open} onOpenChange={(open) => 
        setDeleteConfirmDialog({ ...deleteConfirmDialog, open })
      }>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Registration</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the registration for <strong>{deleteConfirmDialog.registrationName}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteConfirmDialog({ open: false, registrationId: "", registrationName: "" })}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => deleteRegistration(deleteConfirmDialog.registrationId)}
            >
              Delete Registration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toast Notifications */}
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default AdminPanel;
