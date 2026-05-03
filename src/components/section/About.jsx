"use client";

import { useEffect, useState } from "react";

// 🔥 Tambahan Counter (tidak mengubah kode lama)
function Counter({ val, label }) {
  const target = parseInt(val);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div
      className="bg-white px-4 sm:px-8 py-4 sm:py-6 rounded-2xl sm:rounded-3xl border border-cyan-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center min-w-[100px] sm:min-w-[120px]"
    >
      <span className="block text-2xl sm:text-3xl font-bold text-cyan-600">
        {count}+
      </span>
      <span className="text-xs font-semibold text-gray-400 tracking-widest mt-1">
        {label}
      </span>
    </div>
  );
}

export default function About() {
  return (
    <section className="relative py-16 sm:py-24 bg-white overflow-hidden" id="about">
      {/* TATA LETAK GRID */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        
        {/* Kolom Kiri: Teks */}
        <div className="flex flex-col order-2 md:order-1">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans-serif font-semibold text-gray-900 mb-4 sm:mb-6">
            Tentang <span className="text-cyan-600">Arthakara</span>
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
            ARTHAKARA Student Company adalah organisasi siswa yang
            berkomitmen untuk mengembangkan keterampilan kewirausahaan
            dan inovasi di kalangan pelajar.
          </p>

          {/* Statistik dengan Kotak Soft-Rounded & Glow Tipis */}
          <div className="flex flex-wrap gap-3 sm:gap-6">
            {[
              { val: "20+", label: "ANGGOTA" },
              { val: "1000+", label: "SOLD" },
              { val: "500+", label: "BUYER" }
            ].map((item, index) => (
              <Counter key={index} val={item.val} label={item.label} />
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Video dengan Shape Blob Persis & Video Loop */}
        <div className="relative flex justify-center items-center order-1 md:order-2">
          {/* CAHAYA DINAMIS */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <div className="radial-light w-[150%] h-[150%] animate-cyan-bloom"></div>
          </div>

          {/* Container Video */}
          <div className="relative z-10 w-full max-w-xs sm:max-w-sm aspect-square smooth-blob shadow-2xl bg-gray-200 overflow-hidden">
             <video
               src="/Penyu.mp4"
               autoPlay
               loop
               muted
               playsInline
               className="w-full h-full object-cover"
             />
          </div>
        </div>
      </div>

      <style jsx>{`

        @keyframes cyan-bloom {
          0%, 100% { opacity: 0.5; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); }
        }

        .animate-cyan-bloom {
          animation: cyan-bloom 10s ease-in-out infinite;
        }

        /* Bentuk disesuaikan dengan gambar referensi */
        .smooth-blob {
          border-radius: 54% 46% 62% 38% / 54% 53% 47% 46%;
        }
      `}</style>
    </section>
  );
}