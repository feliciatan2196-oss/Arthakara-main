"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCollections } from "@/app/api/CollectionApi";

export default function CollectionSection() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      const res = await getCollections();

      if (res.status === 200) {
        setCollections(res.data);
      }

      setLoading(false);
    };

    fetchCollections();
  }, []);

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-100">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-gray-800 text-2xl sm:text-3xl md:text-5xl font-semibold mb-4">
            Koleksi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-sky-400">Kami</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-lg">
            Jelajahi berbagai koleksi produk pilihan yang telah kami kurasi dengan cermat untuk Anda
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="text-center text-gray-500">Loading collections...</div>
        ) : (
          <>
            {/* GRID */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-12">

              {collections.map((collection) => (
                <Link key={collection.id} href={`/collections/${collection.slug}`}>
                  <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-64 sm:h-72 md:h-80">

                    {/* IMAGE */}
                    <img
                      src={collection.image_url}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 group-hover:from-black/20 transition-all duration-300"></div>

                    {/* CONTENT */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">

                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-cyan-300 transition-colors line-clamp-1">
                        {collection.name}
                      </h3>

                      <p className="text-gray-200 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                        {collection.description ?? "Koleksi produk terbaik kami"}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-cyan-300 text-xs sm:text-sm font-semibold">
                          {collection.productCount ?? 0} Produk
                        </span>

                        <span className="text-white group-hover:translate-x-2 transition-transform text-lg">
                          →
                        </span>
                      </div>

                    </div>
                  </div>
                </Link>
              ))}

            </div>

            {/* CTA */}
            <div className="text-center">
              <Link href="/collections">
                <button className="bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
                  Lihat Semua Koleksi
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}