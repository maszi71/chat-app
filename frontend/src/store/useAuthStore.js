import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLogginingIng: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in Check Auth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account Created Successfully");
      get().connectSocket();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    try {
      set({ isLogginingIng: true });
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged In Successfully");
      get().connectSocket();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLogginingIng: false });
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      toast.success(res.data.message);
      get().disconnectSocket();
      set({ authUser: null });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.put("/auth//update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: async () => {
    try {
      const { authUser } = get();
      // if user is not logged in or socket is already connected
      if (!authUser || get().socket?.connected) return;
      const socket = io("http://localhost:5001" , {
        query : {
          userId : authUser._id
        }
      });
      socket.connect();
      set({ socket });
      socket.on("getOnlineUsers" , (onlineUsers)=> {
        set({onlineUsers})
      })
    } catch (error) {
      console.log(error);
    }
  },
  disconnectSocket: async () => {
    try {
      // if socket is connected
      if (get().socket?.connected) {
        get().socket.disconnect();
        set({ socket: null });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
