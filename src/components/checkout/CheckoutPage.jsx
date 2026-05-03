"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const params = useSearchParams();

  const data = {
    product_id: params.get("product_id"),
    product_variant_id: params.get("product_variant_id"),
    name: params.get("name"),
    price: Number(params.get("price")),
    quantity: Number(params.get("quantity")),
    color_id: params.get("color_id"),
    scents: JSON.parse(params.get("scents") || "[]"),
  };

  const [shipping, setShipping] = useState({
    first_name: "",
    last_name: "",
    address: "",
    appartment_suite: "",
    city: "",
    province: "",
    postal_code: "",
    country: "Indonesia",
    phone_number: "",
  });

  const [billing, setBilling] = useState({
    first_name: "",
    last_name: "",
    address: "",
    appartment_suite: "",
    city: "",
    province: "",
    postal_code: "",
    country: "Indonesia",
    phone_number: "",
  });

  const total = data.price * data.quantity;

  const handleOrder = async () => {
    const payload = {
      shipping_address: shipping,
      billing_address: billing,
      shipping_method_id: 1,
      items: [
        {
          product_variant_id: Number(data.product_variant_id),
          quantity: data.quantity,
          price: data.price,
        },
      ],
    };

    try {
      const res = await fetch("http://localhost:8000/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Order berhasil!");
      } else {
        alert(result.message || "Gagal order");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-6 text-black">Checkout</h1>

      {/* PRODUCT */}
      <div className="mb-6 border p-4 rounded text-black">
        <h2 className="font-bold">{data.name}</h2>
        <p>Qty: {data.quantity}</p>
        <p>Total: Rp {total.toLocaleString("id-ID")}</p>
      </div>

      {/* SHIPPING */}
      <div className="mb-6">
        <h2 className="font-bold mb-2 text-black">Alamat Pengiriman</h2>
        <input placeholder="Nama Depan" onChange={(e)=>setShipping({...shipping, first_name:e.target.value})} />
        <input placeholder="Nama Belakang" onChange={(e)=>setShipping({...shipping, last_name:e.target.value})} />
        <input placeholder="Alamat" onChange={(e)=>setShipping({...shipping, address:e.target.value})} />
      </div>

      {/* BILLING */}
      <div className="mb-6">
        <h2 className="font-bold mb-2 text-black">Alamat Penagihan</h2>
        <input placeholder="Nama Depan" onChange={(e)=>setBilling({...billing, first_name:e.target.value})} />
        <input placeholder="Nama Belakang" onChange={(e)=>setBilling({...billing, last_name:e.target.value})} />
        <input placeholder="Alamat" onChange={(e)=>setBilling({...billing, address:e.target.value})} />
      </div>

      <button
        onClick={handleOrder}
        className="bg-cyan-600 text-white px-6 py-3 rounded"
      >
        Buat Order
      </button>
    </div>
  );
}