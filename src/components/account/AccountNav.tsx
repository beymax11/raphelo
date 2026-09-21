"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User, Package, Heart, MapPin, LogOut } from "lucide-react";

export default function AccountNav() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const links = [
    { name: "Overview", href: "/account", icon: User },
    { name: "Orders", href: "/account/orders", icon: Package },
    { name: "Wishlist", href: "/account/wishlist", icon: Heart },
    { name: "Addresses", href: "/account/addresses", icon: MapPin },
    { name: "Profile", href: "/account/profile", icon: User },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 text-left">
      <nav className="space-y-1 bg-[#E9E3D9]/40 border border-[#C8BDAF]/40 p-4">
        {links.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-[0.14em] font-medium transition-colors ${
                isActive
                  ? "bg-[#1D1C1A] text-[#F4F0E8]"
                  : "text-[#68645E] hover:text-[#1D1C1A] hover:bg-[#E9E3D9]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.name}</span>
            </Link>
          );
        })}

        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-[0.14em] font-medium text-red-700 hover:bg-red-50 transition-colors pt-4 border-t border-[#C8BDAF]/30"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </nav>
    </aside>
  );
}
