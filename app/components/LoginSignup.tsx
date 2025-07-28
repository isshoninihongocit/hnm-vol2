import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "@remix-run/react";

export default function LoginSignup() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "",username: "", college: "", phone: "" });
  const [countryCode, setCountryCode] = useState("+91");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    console.log("Form submitted");
    try {
      const endpoint = isLogin
        ? "http://localhost:3000/auth/login"
        : "http://localhost:3000/auth/signup";
      console.log("Endpoint:", endpoint);
      const body = isLogin
        ? { email: form.email, password: form.password }
        : {
            email: form.email,
            password: form.password,
            username: form.username,
            college: form.college,
            phone: countryCode + form.phone.replace(/^0+/, "") // Remove leading zeros
          };
      console.log("Request body:", body);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Response data:", data);
      if (!res.ok) throw new Error(data.error || "Unknown error");
      alert("Success!");
      // Save user info after login
      if (isLogin) {
        setUser && setUser({
          uid: data.uid,
          name: data.username || null,
          email: data.email || form.email,
          photoURL: null,
          college: data.college || null,
          phone: data.phone || null
        });
      } else {
        setUser && setUser({
          uid: data.uid,
          name: form.username,
          email: form.email,
          photoURL: null,
          college: form.college,
          phone: countryCode + form.phone.replace(/^0+/, "")
        });
      }
      navigate("/");
    } catch (err: any) {
      console.error("Signup/Login error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
      <div className="flex justify-between mb-4">
        <button onClick={() => setIsLogin(true)} className={isLogin ? "font-bold" : ""}>Login</button>
        <button onClick={() => setIsLogin(false)} className={!isLogin ? "font-bold" : ""}>Sign Up</button>
      </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        {!isLogin && (
          <>
          <input 
                name="username" 
                placeholder="Username" 
                value={form.username} 
                onChange={handleChange} 
                required 
                className="border rounded px-3 py-2"
              />
            <input name="college" placeholder="College Name" value={form.college} onChange={handleChange} required />
            <div className="flex gap-2">
              <select value={countryCode} onChange={handleCountryCodeChange} className="border rounded px-2">
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+81">🇯🇵 +81</option>
                {/* Add more country codes as needed */}
              </select>
              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="flex-1"
              />
            </div>
          </>
        )}
        <button type="submit" className="bg-red-600 text-white py-2 rounded">{isLogin ? "Login" : "Sign Up"}</button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
      </div>
    </div>
  );
}
