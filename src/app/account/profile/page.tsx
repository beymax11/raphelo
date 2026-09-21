"use client";

import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import AccountNav from "@/components/account/AccountNav";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [newPassword, setNewPassword] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      firstName,
      lastName,
      email,
      phone,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <PageContainer>
      <div className="border-b border-[#C8BDAF]/30 pb-8 mb-12 text-left">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
          Collector Information
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1D1C1A] tracking-tight mb-2">
          PROFILE SETTINGS
        </h1>
        <p className="text-xs sm:text-sm font-sans text-[#68645E]">
          Update your contact details and security preferences.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start text-left">
        <AccountNav />

        <div className="grow max-w-2xl bg-[#E9E3D9]/40 border border-[#C8BDAF]/40 p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <Input
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 234-8901"
            />

            <div className="pt-4 border-t border-[#C8BDAF]/30">
              <h3 className="font-serif text-xl text-[#1D1C1A] mb-4">
                Update Security Credentials
              </h3>
              <Input
                label="New Password (leave blank to keep current)"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Button type="submit">
                Save Profile Changes
              </Button>
              {saved && (
                <span className="text-xs text-[#707462] font-medium">
                  Preferences updated successfully.
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}
