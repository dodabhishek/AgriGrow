import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, Shield } from "lucide-react";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [expertFormData, setExpertFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email: formData.email, password: formData.password }, "user");
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      if (error.message.includes("Please use the")) {
        toast.error(error.message);
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Invalid email or password");
      }
    }
  };

  const handleExpertSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email: expertFormData.email, password: expertFormData.password }, "admin");
      toast.success("Admin login successful!");
      navigate("/products");
    } catch (error) {
      console.error("Login error:", error);
      if (error.message.includes("Please use the")) {
        toast.error(error.message);
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Invalid email or password");
      }
    }
  };

  if (isLoggingIn) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <div className="absolute -inset-1 rounded-full bg-blue-100 opacity-20 blur-md animate-pulse"></div>
          </div>
          <p className="text-lg font-medium text-gray-700">Signing in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen grid lg:grid-cols-2 bg-gradient-to-r from-blue-50 to-gray-100">
      {/* Left Side - User Login */}
      <div className="flex flex-col justify-center items-center p-8 sm:p-12 bg-white shadow-lg rounded-lg">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200
              transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold mt-2 text-gray-800">Welcome Back</h1>
              <p className="text-gray-500">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="you@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg py-2 transition-all"
              disabled={isLoggingIn}
            >
              Sign in
            </button>
          </form>

          <div className="text-center">
            <p className="text-gray-500">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Admin Login */}
      <div className="flex flex-col justify-center items-center p-8 sm:p-12 bg-gray-50 shadow-lg rounded-lg">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center group-hover:bg-green-200
              transition-colors"
              >
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mt-2 text-gray-800">Admin Login</h1>
              <p className="text-gray-500">Access admin dashboard</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleExpertSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500"
                  placeholder="admin@example.com"
                  value={expertFormData.email}
                  onChange={(e) => setExpertFormData({ ...expertFormData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500"
                  placeholder="••••••••"
                  value={expertFormData.password}
                  onChange={(e) => setExpertFormData({ ...expertFormData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full bg-green-600 text-white hover:bg-green-700 rounded-lg py-2 transition-all"
              disabled={isLoggingIn}
            >
              Admin Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;