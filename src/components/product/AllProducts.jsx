"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  const BASE_URL = "http://localhost:8000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        const data = await res.json();

        setProducts(data.data || []);
      } catch (err) {
        console.error("Error fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-cyan-50 to-white">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Koleksi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-sky-600">Produk</span> Kami
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Temukan semua produk unggulan kami
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">

                {/* IMAGE */}
                <div className="relative overflow-hidden h-64 bg-gray-200">
                  <img
                    src={
                      product.usage_image
                        ? product.usage_image
                        : "/no-image.png"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-cyan-600 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <p className="text-cyan-600 font-bold mb-2">
                    Rp {Number(product.price).toLocaleString("id-ID")}
                  </p>

                  <div className="flex items-center text-cyan-600 font-semibold text-sm">
                    Lihat Detail →
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}