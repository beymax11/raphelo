"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserProfile, Address, Order } from "@/types";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password?: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  addresses: Address[];
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  orders: Order[];
  createOrder: (orderData: Omit<Order, "id" | "orderNumber" | "date">) => Order;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: UserProfile = {
  id: "user-demo-12345",
  email: "collector@raphelo.com",
  firstName: "Aurelien",
  lastName: "Vasseur",
  phone: "+1 (555) 234-8901",
};

const INITIAL_ADDRESSES: Address[] = [
  {
    id: "addr-1",
    firstName: "Aurelien",
    lastName: "Vasseur",
    street: "740 Park Avenue",
    apartment: "Penthouse B",
    city: "New York",
    province: "NY",
    postalCode: "10021",
    phone: "+1 (555) 234-8901",
    isDefault: true,
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-1092",
    orderNumber: "RAP-2026-9041",
    email: "collector@raphelo.com",
    date: "September 15, 2026",
    status: "delivered",
    items: [
      {
        productId: "11111111-1111-1111-1111-111111111111",
        productName: "HALO",
        size: "100ml",
        quantity: 1,
        price: 195,
        imageUrl: "/images/products/halo.jpg",
      },
    ],
    subtotal: 195,
    shipping: 0,
    total: 195,
    shippingAddress: INITIAL_ADDRESSES[0],
    paymentMethod: "Visa ending in 4242",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("raphelo_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      const savedAddresses = localStorage.getItem("raphelo_addresses");
      if (savedAddresses) {
        setAddresses(JSON.parse(savedAddresses));
      }
      const savedOrders = localStorage.getItem("raphelo_orders");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (e) {
      console.error("Failed to load auth state", e);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        if (user) {
          localStorage.setItem("raphelo_user", JSON.stringify(user));
        } else {
          localStorage.removeItem("raphelo_user");
        }
        localStorage.setItem("raphelo_addresses", JSON.stringify(addresses));
        localStorage.setItem("raphelo_orders", JSON.stringify(orders));
      } catch (e) {
        console.error("Failed to persist auth state", e);
      }
    }
  }, [user, addresses, orders, mounted]);

  const login = async (email: string, password = "") => {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) return { success: false, error: error.message };
        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email || email,
            firstName: data.user.user_metadata?.first_name || "Guest",
            lastName: data.user.user_metadata?.last_name || "",
          });
          return { success: true };
        }
      } catch (err: unknown) {
        console.warn("Supabase auth failed, fallback to local session", err);
      }
    }

    // Seamless local authentication fallback
    const loggedUser: UserProfile = {
      id: "user-" + Date.now(),
      email,
      firstName: email.split("@")[0].replace(/[._]/g, " "),
      lastName: "Collector",
    };
    setUser(loggedUser);
    return { success: true };
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password = ""
  ) => {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { first_name: firstName, last_name: lastName },
          },
        });
        if (error) return { success: false, error: error.message };
        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email || email,
            firstName,
            lastName,
          });
          return { success: true };
        }
      } catch (err: unknown) {
        console.warn("Supabase signup failed, fallback to local session", err);
      }
    }

    const newUser: UserProfile = {
      id: "user-" + Date.now(),
      email,
      firstName,
      lastName,
    };
    setUser(newUser);
    return { success: true };
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn("Supabase signout failed", e);
      }
    }
    setUser(null);
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...profileData } : null));
  };

  const addAddress = (address: Omit<Address, "id">) => {
    const newAddr: Address = {
      ...address,
      id: "addr-" + Date.now(),
    };
    setAddresses((prev) => {
      if (newAddr.isDefault) {
        return [...prev.map((a) => ({ ...a, isDefault: false })), newAddr];
      }
      return [...prev, newAddr];
    });
  };

  const updateAddress = (id: string, addressData: Partial<Address>) => {
    setAddresses((prev) =>
      prev.map((addr) => {
        if (addr.id === id) {
          return { ...addr, ...addressData };
        }
        if (addressData.isDefault) {
          return { ...addr, isDefault: false };
        }
        return addr;
      })
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const createOrder = (orderData: Omit<Order, "id" | "orderNumber" | "date">): Order => {
    const newOrder: Order = {
      ...orderData,
      id: "ord-" + Date.now(),
      orderNumber: "RAP-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        orders,
        createOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
