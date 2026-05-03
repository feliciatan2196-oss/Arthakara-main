"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/ui/Navbar";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedScents, setSelectedScents] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/products/${id}`);
        const data = await res.json();

        setProduct(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // ✅ SCENT TOGGLE (MAX 2)
  const toggleScent = (scent) => {
    if (selectedScents.includes(scent.id)) {
      setSelectedScents(selectedScents.filter((s) => s !== scent.id));
    } else {
      if (selectedScents.length < 2) {
        setSelectedScents([...selectedScents, scent.id]);
      }
    }
  };

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  // ✅ HITUNG TOTAL (TERMASUK EXTRA SCENT)
  const extraPrice =
    product?.available_scents
      ?.filter((s) => selectedScents.includes(s.id))
      ?.reduce((acc, s) => acc + Number(s.extra_price || 0), 0) || 0;

  const totalPrice = ((product?.price || 0) + extraPrice) * quantity;

  const handleCheckout = () => {
    if (!selectedColor) return alert("Pilih warna dulu");
    if (selectedScents.length === 0)
      return alert("Pilih minimal 1 wangi");

    router.push(
      `/checkout?product_id=${product.id}&variant_id=${selectedColor.id}&quantity=${quantity}`
    );
  };

  if (loading)
    return <div className="text-center mt-20">Loading...</div>;

  if (!product)
    return <div className="text-center mt-20">Produk tidak ditemukan</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto mt-18 grid md:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow">

          {/* IMAGE */}
          <div className="w-full h-[400px] bg-gray-100 rounded-xl overflow-hidden">
            <img
              src={
                product?.usage_image
                  ? product.usage_image
                  : "/no-image.png"
              }
              alt={product?.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* DETAIL */}
          <div>
            <h1 className="text-3xl font-bold mb-3 text-gray-800">
              {product.name}
            </h1>

            <p className="text-2xl text-cyan-600 font-bold mb-6">
              Rp {product.price?.toLocaleString("id-ID")}
            </p>

            {/* ✅ COLOR (DARI API) */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Pilih Warna</h3>
              <div className="flex gap-2 flex-wrap">
                {product.variants?.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedColor(v)}
                    className={`px-4 py-2 rounded border ${
                      selectedColor?.id === v.id
                        ? "bg-cyan-600 text-white"
                        : "bg-white"
                    }`}
                  >
                    {v.color}
                  </button>
                ))}
              </div>
            </div>

            {/* ✅ SCENT (DARI API) */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Pilih Wangi (max 2)</h3>
              <div className="flex gap-2 flex-wrap">
                {product.available_scents?.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => toggleScent(s)}
                    className={`px-4 py-2 rounded border ${
                      selectedScents.includes(s.id)
                        ? "bg-cyan-600 text-white"
                        : "bg-white"
                    }`}
                  >
                    {s.name} (+Rp {Number(s.extra_price).toLocaleString("id-ID")})
                  </button>
                ))}
              </div>
            </div>

            {/* QTY */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Jumlah</h3>
              <div className="flex items-center gap-4">
                <button onClick={decreaseQty} className="px-3 py-1 bg-gray-200 rounded">-</button>
                <span>{quantity}</span>
                <button onClick={increaseQty} className="px-3 py-1 bg-gray-200 rounded">+</button>
              </div>
            </div>

            {/* TOTAL */}
            <div className="mb-6">
              <h3>Total Harga</h3>
              <p className="text-xl font-bold text-green-600">
                Rp {totalPrice.toLocaleString("id-ID")}
              </p>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleCheckout}
              className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700"
            >
              Lanjut ke Checkout
            </button>
          </div>

        </div>
      </div>
    </>
  );
}