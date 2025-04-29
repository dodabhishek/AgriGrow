import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

// Initialize authUser from localStorage if available
const initialAuthUser = localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null;

export const useAuthStore = create((set, get) => ({
  authUser: initialAuthUser,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: false,
  hasCheckedAuth: false,
  onlineUsers: [],
  socket: null,

  // Check if the user is authenticated
  checkAuth: async () => {
    // If already checking auth, don't start another check
    if (get().isCheckingAuth) {
      console.log("Authentication check already in progress");
      return;
    }
    
    // If we've already checked auth and there's no user, don't check again
    if (get().hasCheckedAuth && get().authUser === null) {
      console.log("Authentication already checked, no user found");
      return;
    }
    
    console.log("Starting authentication check...");
    set({ isCheckingAuth: true });
    
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data, hasCheckedAuth: true });
      console.log("Authentication successful:", res.data);
      get().connectSocket(); // Connect to the socket if authenticated
    } catch (error) {
      console.error("Error in checkAuth:", error);
      // Only set authUser to null if it's not already null
      if (get().authUser !== null) {
        set({ authUser: null });
      }
      set({ hasCheckedAuth: true });
      // Only show the error toast if it's not a 401 Unauthorized error
      if (error.response?.status !== 401) {
        toast.error("Authentication failed. Please log in again.");
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Signup function
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // Login function
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      // Store the user data in localStorage for persistence
      localStorage.setItem('authUser', JSON.stringify(res.data));
      // Update the auth state
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
      return res.data; // Return the user data for the component to use
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
      throw error; // Rethrow the error for the component to handle
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // Expert login function - This is now redundant but kept for backward compatibility
  expertLogin: async (data) => {
    // Simply call the regular login function
    return get().login(data);
  },

  // Logout function
  logout: async (navigate) => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      toast.success("Logged out successfully");
      if (navigate) navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  // Update profile function
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      // Store the updated user data in localStorage
      localStorage.setItem('authUser', JSON.stringify(res.data));
      // Update the auth state
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error in updateProfile:", error);
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // Connect to the socket
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    console.log("Socket connected");
  },

  // Disconnect from the socket
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) {
      socket.off("getOnlineUsers");
      socket.disconnect();
      console.log("Socket disconnected");
    }
  },
}));