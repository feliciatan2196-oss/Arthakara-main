"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getCollections } from "@/app/api/CollectionApi";

export default function CollectionPage() {
  const [collections, setCollections] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:8000"; // 🔥 ganti kalau backend kamu beda

  // FETCH PRODUCTS PER COLLECTION
  const fetchProducts = async (collectionId) => {
    try {
      const res = await fetch(`/api/collections/${collectionId}/products`);
      const data = await res.json();

      // 🔥 amanin semua bentuk response API
      return data?.data || data || [];
    } catch (err) {
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const res = await getCollections();

      if (res.status === 200) {
        const collectionsData = res.data;
        setCollections(collectionsData);

        const productData = {};

        await Promise.all(
          collectionsData.map(async (col) => {
            const products = await fetchProducts(col.id);
            productData[col.id] = products;
          })
        );

        setProductsMap(productData);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen py-16 sm:py-20 md:py-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="text-center pt-16 mb-16 sm:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Koleksi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-sky-600">Produk</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Temukan koleksi produk favorit Anda dari berbagai kategori pilihan
          </p>
        </div>
        
        {/* LOADING */}
        {loading ? (
          <div className="text-center text-gray-500">
            Loading collections...
          </div>
        ) : (
          <div className="space-y-16 sm:space-y-20">

            {collections.map((collection, index) => (
              <div key={collection.id}>

                {/* COLLECTION HEADER */}
                <div className="mb-10 sm:mb-12">

                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-6">

                    <div className="flex-1">

                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 sm:mb-3">
                        {collection.name}
                      </h2>

                      <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl">
                        {collection.description ?? "Koleksi produk terbaik kami"}
                      </p>

                    </div>

                    <Link href={`/collections/${collection.slug}`}>
                      <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 sm:px-6 py-2 rounded-full font-semibold transition-colors flex items-center gap-2 text-sm sm:text-base whitespace-nowrap">
                        Lihat Semua
                        <ChevronRight size={18} className="hidden sm:block" />
                        <ChevronRight size={16} className="sm:hidden" />
                      </button>
                    </Link>

                  </div>
                </div>

                {/* PRODUCTS GRID */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">

                  {productsMap[collection.id]?.length > 0 ? (
                    productsMap[collection.id].map((product) => (

                      <Link key={product.id} href={`/products/${product.id}`}>
                        <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full">

                          {/* IMAGE FIXED */}
                          <div className="relative overflow-hidden h-48 sm:h-56 md:h-64 bg-gray-200">

                           <img
                              src={
                                product.usage_image
                                  ? product.usage_image.startsWith("http")
                                    ? product.usage_image
                                    : `${BASE_URL}/storage/${product.usage_image}`
                                  : "/no-image.png"
                              }
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />

                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all"></div>

                          </div>

                          {/* CONTENT */}
                          <div className="p-4 sm:p-5">

                            <h3 className="font-semibold text-base sm:text-lg text-gray-800 group-hover:text-cyan-600 transition-colors line-clamp-1">
                              {product.title || product.name}
                            </h3>

                            <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                              {product.description}
                            </p>

                            <div className="flex items-center justify-between">
                              <span className="text-cyan-600 font-bold text-sm sm:text-base">
                                Rp.{product.price}
                              </span>

                              <span className="text-cyan-600 group-hover:translate-x-1 transition-transform">
                                →
                              </span>
                            </div>

                          </div>

                        </div>
                      </Link>

                    ))
                  ) : (
                    <div className="col-span-full text-center text-gray-400">
                      Tidak ada produk dalam koleksi ini
                    </div>
                  )}

                </div>

                {/* DIVIDER */}
                {index < collections.length - 1 && (
                  <div className="h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent"></div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}