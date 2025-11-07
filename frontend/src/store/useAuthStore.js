import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";


const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";


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
      
      console.log("Auth check response:", res.data);
      console.log("Authenticated user:", res.data?.email, "ID:", res.data?._id);
      
      // Update user data from backend (in case it changed)
      if (res.data) {
        // Store in localStorage
        localStorage.setItem('authUser', JSON.stringify(res.data));
        set({ authUser: res.data, hasCheckedAuth: true });
        console.log("Authentication successful, user stored:", res.data.email);
        get().connectSocket(); // Connect to the socket if authenticated
      } else {
        // No user data returned
        localStorage.removeItem('authUser');
        set({ authUser: null, hasCheckedAuth: true });
        console.log("No user data in auth check response");
      }
    } catch (error) {
      console.error("Error in checkAuth:", error);
      console.error("Auth check failed, clearing user data");
      
      // Clear all auth data on error
      localStorage.removeItem('authUser');
      set({ authUser: null, hasCheckedAuth: true });
      
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
  login: async (data, expectedRole) => {
    set({ isLoggingIn: true });
    try {
      console.log("Login attempt with email:", data.email);
      
      // IMPORTANT: Clear old session data before new login
      // This ensures old cookies/tokens don't interfere
      localStorage.removeItem('authUser');
      set({ authUser: null });
      set({ hasCheckedAuth: false }); // Reset auth check flag
      
      // Normalize email input
      const normalizedData = {
        ...data,
        email: data.email?.toLowerCase().trim()
      };
      
      const res = await axiosInstance.post("/auth/login", normalizedData);
      
      console.log("Login response received:", res.data);
      console.log("Logged in user:", res.data.email, "ID:", res.data._id);
      
      // Check if the user's role matches the expected role (only if expectedRole is provided)
      if (expectedRole && res.data.role !== expectedRole) {
        console.error("Role mismatch:", res.data.role, "expected:", expectedRole);
        throw new Error(`Please use the ${expectedRole} login form`);
      }
      
      // Store the user data in localStorage for persistence
      localStorage.setItem('authUser', JSON.stringify(res.data));
      
      // Update the auth state
      set({ authUser: res.data });
      set({ hasCheckedAuth: true }); // Mark as checked
      
      // Connect socket
      get().connectSocket();
      
      console.log("Login successful, user stored:", res.data.email);
      console.log("Current authUser state:", get().authUser);
      
      return res.data; // Return the user data for the component to use
    } catch (error) {
      console.error("Login error:", error);
      console.error("Error response:", error.response?.data);
      
      // Clear localStorage on login failure
      localStorage.removeItem('authUser');
      set({ authUser: null });
      set({ hasCheckedAuth: false });
      
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
      console.log("Logging out user:", get().authUser?.email);
      
      // Clear backend session (cookie)
      await axiosInstance.post("/auth/logout");
      
      // Clear frontend state
      localStorage.removeItem('authUser');
      set({ authUser: null });
      set({ hasCheckedAuth: false }); // Reset auth check flag
      
      // Disconnect socket
      get().disconnectSocket();
      
      console.log("Logout successful, user cleared");
      
      toast.success("Logged out successfully");
      if (navigate) navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
      
      // Even if backend logout fails, clear frontend state
      localStorage.removeItem('authUser');
      set({ authUser: null });
      set({ hasCheckedAuth: false });
      
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