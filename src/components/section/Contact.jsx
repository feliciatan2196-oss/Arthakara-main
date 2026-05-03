import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

const logo = "/logo.png";

export default function Contact(){
  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-transparent to-cyan-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 text-gray-800">
            Hubungi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-sky-600">Kami</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Kami senang mendengar dari Anda. Jangan ragu untuk menghubungi kami!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg mb-1 text-gray-800">Email</h3>
                <a href="mailto:info@asihakara.com" className="text-gray-600 hover:text-cyan-600 transition-colors break-all sm:break-normal text-sm sm:text-base">
                  info@asihakara.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-sky-400 to-sky-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg mb-1 text-gray-800">Telepon</h3>
                <a href="tel:+628123456789" className="text-gray-600 hover:text-sky-600 transition-colors text-sm sm:text-base">
                  +62 812-3456-789
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg mb-1 text-gray-800">Alamat</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Jl. Pendidikan No. 123<br />
                  Jakarta, Indonesia 12345
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4 sm:pt-6">
              <h3 className="text-base sm:text-lg mb-4 text-gray-800">Ikuti Kami</h3>
              <div className="flex gap-3 sm:gap-4">
                <a 
                  href="#" 
                  className="w-10 sm:w-12 h-10 sm:h-12 bg-white border border-cyan-200 rounded-xl flex items-center justify-center hover:bg-cyan-50 hover:border-cyan-400 transition-all flex-shrink-0"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-600" />
                </a>
                <a 
                  href="#" 
                  className="w-10 sm:w-12 h-10 sm:h-12 bg-white border border-sky-200 rounded-xl flex items-center justify-center hover:bg-sky-50 hover:border-sky-400 transition-all flex-shrink-0"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 sm:w-6 h-5 sm:h-6 text-sky-600" />
                </a>
                <a 
                  href="#" 
                  className="w-10 sm:w-12 h-10 sm:h-12 bg-white border border-teal-200 rounded-xl flex items-center justify-center hover:bg-teal-50 hover:border-teal-400 transition-all flex-shrink-0"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 sm:w-6 h-5 sm:h-6 text-teal-600" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
            <form className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2 text-sm sm:text-base font-medium">Nama</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-cyan-400 transition-colors text-sm sm:text-base"
                  placeholder="Nama lengkap Anda"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2 text-sm sm:text-base font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-cyan-400 transition-colors text-sm sm:text-base"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2 text-sm sm:text-base font-medium">Pesan</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-cyan-400 transition-colors resize-none text-sm sm:text-base"
                  placeholder="Tulis pesan Anda di sini..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-400 to-sky-400 text-white rounded-xl hover:from-cyan-500 hover:to-sky-500 transition-all shadow-md hover:shadow-lg font-semibold text-sm sm:text-base"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 sm:mt-20 pt-8 sm:pt-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center px-4">
          <div className="mb-6">
            <img src={logo} alt="ASIHAKARA Logo" className="h-12 sm:h-16 mx-auto object-contain" />
          </div>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            ARTHAKARA Student Company - Membentuk Generasi Entrepreneur Masa Depan
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} ASIHAKARA. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
}