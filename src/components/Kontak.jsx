import React from 'react'
import FooterNav from "../components/FooterNav";


const Kontak = () => {
  return (
    <section
      id="contact"
      className="
        relative w-full min-h-screen
        bg-[#2E7D32]
        overflow-hidden
        scroll-mt-24
      "
    >

      {/* CONTENT */}
      <div className="relative z-10 pt-36 md:pt-40 pb-20 px-6">


        {/* ===== TITLE ===== */}
        <div
          data-aos="fade-down"
          className="text-center max-w-3xl mx-auto text-white"
        >
          <h2 className="text-4xl md:text-5xl font-black">
            Kontak <span className="text-white">Kami</span>
          </h2>
          <p className="mt-4 text-white/90 text-base md:text-lg">
            Kami siap membantu, menjawab pertanyaan, dan mendukung kebutuhan Anda
          </p>
        </div>

        {/* ===== CARD ===== */}
        <div
          data-aos="zoom-in"
          className="
            mt-20 mb-16
            max-w-6xl mx-auto w-full
            bg-white rounded-3xl
            shadow-[0_40px_120px_rgba(0,0,0,0.25)]
            overflow-hidden
            grid grid-cols-1 md:grid-cols-2
          "
        >
          {/* LEFT - MAP */}
          <div className="relative h-[320px] md:h-auto">
            <iframe
              title="maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7964.127427132885!2d98.65108192796176!3d3.5728215611123537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312e4d8287c639%3A0x48d2c2f5ab1ddb98!2sKec.%20Medan%20Sunggal%2C%20Kota%20Medan%2C%20Sumatera%20Utara!5e0!3m2!1sid!2sid!4v1768603885445!5m2!1sid!2sid"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
          </div>

          {/* RIGHT - FORM */}
          <div className="p-8 md:p-14">
            <h3 className="text-3xl font-black text-black">
              Kirim <span className="text-[#2E7D32]">Pesan</span>
            </h3>

            <p className="mt-4 text-gray-600">
              Isi formulir berikut dan tim kami akan segera menghubungi Anda
            </p>

            <form className="mt-10 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  className="
                    w-full h-14 px-5
                    rounded-xl
                    border border-gray-300
                    focus:border-[#2E7D32]
                    focus:ring-2 focus:ring-[#2E7D32]/30
                    outline-none transition
                  "
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="
                    w-full h-14 px-5
                    rounded-xl
                    border border-gray-300
                    focus:border-[#2E7D32]
                    focus:ring-2 focus:ring-[#2E7D32]/30
                    outline-none transition
                  "
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Pesan
                </label>
                <textarea
                  rows="5"
                  placeholder="Tulis pesan Anda..."
                  className="
                    w-full px-5 py-4
                    rounded-xl
                    border border-gray-300
                    focus:border-[#2E7D32]
                    focus:ring-2 focus:ring-[#2E7D32]/30
                    outline-none transition resize-none
                  "
                ></textarea>
              </div>

              <button
                type="submit"
                className="
                  w-full h-14
                  bg-[#2E7D32]
                  text-white
                  rounded-xl
                  font-bold tracking-wide
                  hover:bg-[#256628]
                  hover:shadow-xl
                  transition
                "
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* ===== FOOTER SIMPLE & ELEGAN ===== */}
      <footer 
        data-aos="fade-up"
        data-aos-delay="200"
        className="
          w-full
          bg-white
          py-12 md:py-16
        "
      >
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Baris 1: Logo Sosial Media di Tengah */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-6">
              <a 
                href="#" 
                className="
                  w-12 h-12
                  flex items-center justify-center
                  bg-gray-100
                  rounded-full
                  text-gray-700
                  hover:bg-[#2E7D32]
                  hover:text-white
                  transition-all duration-300
                  hover:scale-110
                "
                aria-label="Instagram"
              >
                <i className='bx bxl-instagram text-2xl'></i>
              </a>
              
              <a 
                href="mailto:info@donasiyuk.com" 
                className="
                  w-12 h-12
                  flex items-center justify-center
                  bg-gray-100
                  rounded-full
                  text-gray-700
                  hover:bg-[#2E7D32]
                  hover:text-white
                  transition-all duration-300
                  hover:scale-110
                "
                aria-label="Email"
              >
                <i className='bx bx-envelope text-2xl'></i>
              </a>
              
              <a 
                href="#" 
                className="
                  w-12 h-12
                  flex items-center justify-center
                  bg-gray-100
                  rounded-full
                  text-gray700
                  hover:bg-[#2E7D32]
                  hover:text-white
                  transition-all duration-300
                  hover:scale-110
                "
                aria-label="Facebook"
              >
                <i className='bx bxl-facebook text-2xl'></i>
              </a>
            </div>
          </div>

          {/* Baris 2: Navigasi Footer di Tengah */}
          <div className="flex justify-center mb-8">
  <FooterNav />
</div>


          {/* Baris 3: Copyright di Tengah */}
          <div className="flex justify-center">
            <p className="text-gray-600 text-sm md:text-base">
              © 2026 DonasiYuk. All rights reserved.
            </p>
          </div>

        </div>
      </footer>
    </section>
  )
}

export default Kontak