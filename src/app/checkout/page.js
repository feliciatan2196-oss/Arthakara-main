"use client";
import Navbar from "@/components/ui/Navbar";
import Checkout from "@/components/checkout/CheckoutPage";

export default function checkoutPage() {
  return (
    <main className="min-h-screen bg-[#faebd7] font-sans">
        <Navbar />
      <div className=" ">
        <Checkout />
      </div>
    </main>
  );
}