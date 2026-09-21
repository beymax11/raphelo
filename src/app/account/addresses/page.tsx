"use client";

import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import AccountNav from "@/components/account/AccountNav";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/context/AuthContext";
import { Address } from "@/types";
import { Plus, Check, Trash2, Edit2 } from "lucide-react";

export default function AddressesPage() {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } =
    useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    apartment: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "",
    isDefault: false,
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      firstName: "",
      lastName: "",
      street: "",
      apartment: "",
      city: "",
      province: "",
      postalCode: "",
      phone: "",
      isDefault: addresses.length === 0,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (addr: Address) => {
    setEditingId(addr.id);
    setFormData({
      firstName: addr.firstName,
      lastName: addr.lastName,
      street: addr.street,
      apartment: addr.apartment || "",
      city: addr.city,
      province: addr.province,
      postalCode: addr.postalCode,
      phone: addr.phone || "",
      isDefault: addr.isDefault || false,
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateAddress(editingId, formData);
    } else {
      addAddress(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <PageContainer>
      <div className="border-b border-[#C8BDAF]/30 pb-8 mb-12 text-left">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
          Delivery Archives
        </span>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#1D1C1A] tracking-tight mb-2">
              SAVED ADDRESSES
            </h1>
            <p className="text-xs sm:text-sm font-sans text-[#68645E]">
              Manage your delivery locations for seamless checkout.
            </p>
          </div>
          <Button onClick={handleOpenAdd} size="sm">
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Add New Address
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start text-left">
        <AccountNav />

        <div className="grow w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-6 bg-[#E9E3D9]/40 border transition-all text-xs text-[#68645E] flex flex-col justify-between ${
                addr.isDefault
                  ? "border-[#1D1C1A]"
                  : "border-[#C8BDAF]/40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#C8BDAF]/30">
                  <span className="font-serif text-base text-[#1D1C1A]">
                    {addr.firstName} {addr.lastName}
                  </span>
                  {addr.isDefault && (
                    <span className="inline-block px-2 py-0.5 text-[9px] uppercase tracking-wider bg-[#1D1C1A] text-[#F4F0E8]">
                      Default Address
                    </span>
                  )}
                </div>

                <div className="space-y-1 mb-6">
                  <p>{addr.street}</p>
                  {addr.apartment && <p>{addr.apartment}</p>}
                  <p>
                    {addr.city}, {addr.province} {addr.postalCode}
                  </p>
                  {addr.phone && <p>Phone: {addr.phone}</p>}
                </div>
              </div>

              <div className="pt-4 border-t border-[#C8BDAF]/30 flex items-center justify-between">
                <div className="flex gap-4">
                  <button
                    onClick={() => handleOpenEdit(addr)}
                    className="flex items-center gap-1 text-[#1D1C1A] hover:text-[#A8735B]"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="flex items-center gap-1 text-red-700 hover:underline"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>

                {!addr.isDefault && (
                  <button
                    onClick={() => setDefaultAddress(addr.id)}
                    className="text-[#A8735B] hover:text-[#1D1C1A] underline"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Address Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Address" : "Add New Address"}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
          </div>

          <Input
            label="Street Address"
            value={formData.street}
            onChange={(e) =>
              setFormData({ ...formData, street: e.target.value })
            }
            required
          />

          <Input
            label="Apartment, suite, unit (optional)"
            value={formData.apartment}
            onChange={(e) =>
              setFormData({ ...formData, apartment: e.target.value })
            }
          />

          <div className="grid grid-cols-3 gap-3">
            <Input
              label="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              required
            />
            <Input
              label="Province / State"
              value={formData.province}
              onChange={(e) =>
                setFormData({ ...formData, province: e.target.value })
              }
              required
            />
            <Input
              label="Postal Code"
              value={formData.postalCode}
              onChange={(e) =>
                setFormData({ ...formData, postalCode: e.target.value })
              }
              required
            />
          </div>

          <Input
            label="Phone (optional)"
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />

          <label className="flex items-center gap-2 pt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isDefault}
              onChange={(e) =>
                setFormData({ ...formData, isDefault: e.target.checked })
              }
              className="accent-[#1D1C1A]"
            />
            <span className="text-xs text-[#68645E]">
              Make this my default delivery address
            </span>
          </label>

          <div className="pt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingId ? "Save Changes" : "Save Address"}
            </Button>
          </div>
        </form>
      </Modal>
    </PageContainer>
  );
}
