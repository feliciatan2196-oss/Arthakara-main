"use client";

import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group max-w-[250px] mx-auto hover:-translate-y-1 cursor-pointer">

        {/* IMAGE */}
        <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
          <img
            src={product.usage_image || "/no-image.png"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* CONTENT */}
        <div className="p-3 flex flex-col gap-1.5">

          {/* NAME */}
          <h2 className="text-xs font-medium text-gray-800 line-clamp-2 leading-tight min-h-[32px]">
            {product.name}
          </h2>

          {/* PRICE */}
          <p className="text-cyan-600 font-bold text-sm">
            Rp {product.price?.toLocaleString("id-ID")}
          </p>

          {/* DESC */}
          <p className="text-gray-400 text-[11px] line-clamp-1">
            {product.description}
          </p>

          {/* BUTTON */}
          <div className="mt-2 w-full bg-cyan-600 text-white py-1.5 rounded-md text-xs font-medium text-center">
            Detail
          </div>

        </div>
      </div>
    </Link>
  );
}