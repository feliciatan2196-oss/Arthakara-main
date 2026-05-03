"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const BASE_URL = "http://localhost:8000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products/${id}`);
        const data = await res.json();

        setProduct(data);
      } catch (err) {
        console.error("Error fetch product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const totalPrice = (product?.price || 0) * quantity;

  const handleCheckout = () => {
    if (!selectedVariant) return alert("Pilih warna dulu");
    if (selectedVariant.stock === 0) return alert("Stok habis");

    const params = new URLSearchParams({
      product_id: product.id,
      product_variant_id: selectedVariant.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
    });

    router.push(`/checkout?${params.toString()}`);
  };

  if (loading)
    return <div className="text-center mt-20">Loading...</div>;

  if (!product)
    return <div className="text-center mt-20">Produk tidak ditemukan</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow">

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
            Rp {Number(product.price).toLocaleString("id-ID")}
          </p>

          {/* ✅ COLOR (VARIANT) */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Pilih Warna</h3>
            <div className="flex gap-2 flex-wrap">
              {product.variants?.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-4 py-2 rounded border ${
                    selectedVariant?.id === v.id
                      ? "bg-cyan-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {v.color}
                </button>
              ))}
            </div>
          </div>

          {/* STOCK */}
          {selectedVariant && (
            <div className="mb-4">
              <p className="font-semibold">
                Stock:{" "}
                {selectedVariant.stock > 0
                  ? selectedVariant.stock
                  : "Habis"}
              </p>
            </div>
          )}

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
            disabled={!selectedVariant || selectedVariant.stock === 0}
            className="w-full bg-cyan-600 text-white py-3 rounded-lg disabled:bg-gray-400"
          >
            {selectedVariant?.stock === 0
              ? "Stok Habis"
              : "Lanjut ke Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}