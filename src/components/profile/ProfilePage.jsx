"use client";

import { useAuth } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User, Mail, Phone, LogOut, ArrowLeft, Edit2, X, Check } from "lucide-react";

export default function ProfilePage() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    phone: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profil...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setUpdateMessage("");

    // Validasi user.id
    if (!user || !user.id) {
      setUpdateMessage("✗ User ID tidak ditemukan. Silakan login kembali.");
      setIsSaving(false);
      return;
    }

    try {
      const response = await fetch("/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          name: editData.name,
          phone: editData.phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal update profil");
      }

      // Update user di context
      setUpdateMessage("✓ Profil berhasil diperbarui");
      setIsEditing(false);
      
      // Refresh user data
      setTimeout(() => {
        setUpdateMessage("");
      }, 2000);
    } catch (error) {
      console.error("Update profile error:", error);
      setUpdateMessage("✗ " + (error.message || "Gagal update profil"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-sky-50 pt-20 pb-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-cyan-600 hover:text-cyan-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Profil Saya
          </h1>
          <p className="text-gray-600 mt-2">Kelola informasi akun Anda</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-sky-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Edit profil"
              >
                <Edit2 className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>

          {/* Success/Error Message */}
          {updateMessage && (
            <div
              className={`mb-6 p-4 rounded-lg border ${
                updateMessage.startsWith("✓")
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  updateMessage.startsWith("✓") ? "text-green-700" : "text-red-700"
                }`}
              >
                {updateMessage}
              </p>
            </div>
          )}

          {isEditing ? (
            // Edit Mode
            <div className="space-y-6 mb-8">
              {/* Name */}
              <div>
                <label htmlFor="name" className="text-sm font-medium text-gray-600 block mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all"
                  placeholder="Nama Anda"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="text-sm font-medium text-gray-600 block mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={editData.phone}
                  onChange={handleEditChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all"
                  placeholder="+62812345678"
                />
              </div>

              {/* Note */}
              <p className="text-xs text-gray-500">
                ℹ️ Email tidak dapat diubah
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-all"
                >
                  <Check className="w-5 h-5" />
                  Simpan
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all"
                >
                  <X className="w-5 h-5" />
                  Batal
                </button>
              </div>
            </div>
          ) : (
            // View Mode
            <div className="space-y-6 mb-8">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-100 rounded-lg">
                  <Mail className="w-5 h-5 text-cyan-600" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-800 text-lg">{user.email}</p>
                </div>
              </div>

              {/* Name */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600">Nama Lengkap</label>
                  <p className="text-gray-800 text-lg">{user.name || "Belum diisi"}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600">Nomor Telepon</label>
                  <p className="text-gray-800 text-lg">{user.phone || "Belum diisi"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <div className="pt-8 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-semibold transition-all"
            >
              <LogOut className="w-5 h-5" />
              Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
