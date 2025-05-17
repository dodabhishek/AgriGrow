import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Eye, EyeOff, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) return toast.error("Please enter a valid Gmail address");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  if (isSigningUp) {
    return <Loader text="Creating account..." />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div
              className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200
              transition-colors"
            >
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold mt-2 text-gray-800">Create Account</h1>
            <p className="text-gray-500">Get started with your free account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700">Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="input input-bordered w-full pl-10 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
          </div>

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
                placeholder="you@example.com"
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
          >
            Create Account
          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
