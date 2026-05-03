"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/app/api/ProductApi";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchProducts();
        setProducts(res.data || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg">
        Loading produk...
      </div>
    );
  }

  return (
    <section className="py-20 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl pt-20 mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl text-gray-600 font-bold mb-10 text-center">
          Semua Produk
        </h1>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center col-span-4">
              Produk tidak ditemukan
            </p>
          )}
        </div>

      </div>
    </section>
  );
}