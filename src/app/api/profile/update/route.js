import { NextResponse } from "next/server";
import { getUserData, updateUserProfile } from "@/lib/db";

export async function PUT(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: "Format request tidak valid" },
        { status: 400 }
      );
    }

    const { userId, name, phone } = body;

    // Validasi
    if (!userId) {
      return NextResponse.json(
        { error: "User ID tidak ditemukan" },
        { status: 400 }
      );
    }

    // Cek user ada
    const user = getUserData(userId);
    if (!user) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    // Update profile (hanya nama dan phone)
    const updatedUser = updateUserProfile(userId, {
      name: name || user.name,
      phone: phone !== undefined ? phone : user.phone,
    });

    return NextResponse.json(
      {
        message: "Profil berhasil diperbarui",
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          createdAt: updatedUser.createdAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
