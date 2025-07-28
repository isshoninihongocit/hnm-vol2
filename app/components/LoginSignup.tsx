import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiPhone, FiMapPin } from "react-icons/fi";

export default function LoginSignup() {
  const { login, signUp, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ 
    email: "", 
    password: "", 
    username: "", 
    college: "", 
    phone: "" 
  });
  const [countryCode, setCountryCode] = useState("+91");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [planName, setPlanName] = useState<string | null>(null);

  // Get URL parameters safely after component mounts
  useEffect(() => {
    const plan = searchParams.get('plan');
    setPlanName(plan);
    console.log('🎯 LoginSignup: URL parameters - plan:', plan, 'redirect:', searchParams.get('redirect'));
  }, [searchParams]);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      console.log('👤 LoginSignup: User already authenticated, redirecting...');
      const redirectTo = searchParams.get('redirect') || '/registration';
      navigate(redirectTo, { replace: true });
    }
  }, [user, navigate, searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    console.log('🔄 LoginSignup: Form submission started', { isLogin, email: form.email });
    
    try {
      let success = false;
      
      if (isLogin) {
        // Use the AuthContext login function
        success = await login(form.email, form.password);
        console.log('🔐 LoginSignup: Login result:', success);
      } else {
        // Use the AuthContext signUp function
        success = await signUp({
          email: form.email,
          password: form.password,
          username: form.username,
          college: form.college,
          phone: countryCode + form.phone.replace(/^0+/, "")
        });
        console.log('📝 LoginSignup: Signup result:', success);
      }
      
      if (success) {
        // Get redirect URL and plan info from URL parameters
        const redirectTo = searchParams.get('redirect') || '/registration';
        
        console.log('✅ LoginSignup: Authentication successful, redirecting to:', redirectTo);
        
        // If there was a specific plan they were trying to purchase, show a message
        if (planName) {
          console.log('🎫 LoginSignup: Plan purchase flow detected:', planName);
          // Navigate immediately, then show message
          navigate(redirectTo, { replace: true });
          // Show a brief success message about completing the purchase
          setTimeout(() => {
            alert(`✅ Welcome back! You can now complete your purchase for "${planName}".`);
          }, 500);
        } else {
          console.log('🚀 LoginSignup: Direct navigation to:', redirectTo);
          navigate(redirectTo, { replace: true });
        }
      } else {
        console.error('❌ LoginSignup: Authentication failed');
        setError(isLogin ? "Login failed. Please check your credentials." : "Signup failed. Please try again.");
      }
    } catch (err: any) {
      console.error('❌ LoginSignup: Exception during authentication:', err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/hnmmain.jpg')] bg-cover bg-center"></div>
      </div>
      
      <div className="relative w-full max-w-md">
        {/* Logo and Festival Name */}
        <div className="text-center mb-8">
          <img 
            src="/hnmmainwhite.png" 
            alt="Hikari no Matsuri" 
            className="w-20 h-20 mx-auto mb-4 drop-shadow-xl"
          />
          <h1 className="text-3xl font-bold text-white font-hnm mb-2">
            Hikari no Matsuri
          </h1>
          <p className="text-red-200 text-sm font-hnm">
            Festival of Lights & Culture
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* Tab Switcher */}
          <div className="flex mb-8 bg-black/20 rounded-xl p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                isLogin
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                !isLogin
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Purchase Intent Message */}
          {planName && (
            <div className="mb-6 p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg">
              <p className="text-blue-200 text-sm text-center">
                🎫 Complete your login to purchase: <strong>{planName}</strong>
              </p>
            </div>
          )}

          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-200"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Sign Up Only Fields */}
            {!isLogin && (
              <>
                {/* Username Field */}
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                  <input
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300"
                  />
                </div>

                {/* College Field */}
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                  <input
                    name="college"
                    placeholder="College Name"
                    value={form.college}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300"
                  />
                </div>

                {/* Phone Field */}
                <div className="flex gap-2">
                  <div className="relative">
                    <select
                      value={countryCode}
                      onChange={handleCountryCodeChange}
                      className="appearance-none bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300"
                    >
                      <option value="+91" className="bg-gray-800 text-white">🇮🇳 +91</option>
                      <option value="+1" className="bg-gray-800 text-white">🇺🇸 +1</option>
                      <option value="+44" className="bg-gray-800 text-white">🇬🇧 +44</option>
                      <option value="+61" className="bg-gray-800 text-white">🇦🇺 +61</option>
                      <option value="+81" className="bg-gray-800 text-white">🇯🇵 +81</option>
                    </select>
                  </div>
                  <div className="relative flex-1">
                    <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                    <input
                      name="phone"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  {isLogin ? "Signing In..." : "Creating Account..."}
                </div>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-200 text-sm animate-fadeIn">
                {error}
              </div>
            )}
          </form>

          {/* Additional Links */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-red-400 hover:text-red-300 font-semibold transition-colors duration-200"
              >
                {isLogin ? "Sign up here" : "Sign in here"}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/40 text-xs">
            Join us for an unforgettable cultural experience
          </p>
        </div>
      </div>
    </div>
  );
}
