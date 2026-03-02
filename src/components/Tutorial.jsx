import React from 'react'

const steps = [
  {
    img: '/program.png',
    title: 'Pilih Program Donasi',
    desc: 'Pilih program donasi yang sesuai dengan kepedulian dan tujuan kebaikanmu.',
    bubbleTitle: 'Langkah Pertama',
    bubbleText: 'Kenali program donasi yang tersedia dan pilih yang paling sesuai dengan niat kebaikanmu.'
  },
  {
    img: '/jumlah.png',
    title: 'Tentukan Jumlah Donasi',
    desc: 'Masukkan nominal donasi secara fleksibel sesuai kemampuan terbaikmu.',
    bubbleTitle: 'Langkah Kedua',
    bubbleText: 'Tentukan nominal donasi tanpa paksaan, semua kontribusi sangat berarti.'
  },
  {
    img: '/dana.png',
    title: 'Selesaikan Pembayaran',
    desc: 'Scan barcode dan selesaikan donasi dengan sistem yang aman dan terpercaya.',
    bubbleTitle: 'Langkah Terakhir',
    bubbleText: 'Selesaikan pembayaran dengan sistem yang aman dan transparan.'
  }
]


const Tutorial = () => {
  return (
    <section id="tutorial" className="relative w-full bg-white py-32 overflow-hidden">

      {/* Title */}
      <div className="relative text-center max-w-3xl mx-auto px-6">
        <h2 data-aos="fade-up" className="text-4xl md:text-5xl font-extrabold text-black">
          Cara <span className="text-[#2E7D32]">Berdonasi</span>
        </h2>
        <p data-aos="fade-up" data-aos-delay="150" className="mt-5 text-gray-600">
          Ikuti langkah mudah berikut untuk menyalurkan donasi
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-6xl mx-auto mt-24 px-6">

        {/* Vertical Line */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-[3px] bg-[#2E7D32]/40 -translate-x-1/2"></div>

        {steps.map((step, index) => {
          const reverse = index % 2 === 0

          return (
            <div
              key={index}
              className={`relative mb-32 flex flex-col md:flex-row ${
                reverse ? 'md:flex-row-reverse' : ''
              } items-center`}
            >
              {/* === CARD === */}
              <div
                data-aos={reverse ? 'fade-left' : 'fade-right'}
                className="relative w-full md:w-5/12 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full h-60 object-cover"
                />

                <div className="p-8 text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-black">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-gray-600 text-sm md:text-base">
                    {step.desc}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#2E7D32]"></div>
              </div>

              {/* === NUMBER === */}
              <div
                data-aos="zoom-in"
                className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#2E7D32] text-white text-xl font-bold items-center justify-center shadow-lg z-10"
              >
                {index + 1}
              </div>

              {/* === BUBBLE TEXT (DEKAT ANGKA) === */}
              <div
                data-aos="fade-up"
                className={`hidden md:block absolute top-0 ${
                  reverse ? 'right-[55%] text-right' : 'left-[55%] text-left'
                } max-w-xs`}
              >
                <div className="relative bg-white border border-[#2E7D32]/30 shadow-md rounded-2xl p-5">
                  <p className="text-xs font-semibold text-[#2E7D32] uppercase tracking-wide">
                    {step.bubbleTitle}
                  </p>
                  <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                    {step.bubbleText}
                  </p>

                  {/* Arrow kecil ke arah angka */}
                  <div
                    className={`absolute top-6 w-3 h-3 bg-white border border-[#2E7D32]/30 rotate-45 ${
                      reverse ? '-right-1' : '-left-1'
                    }`}
                  ></div>
                </div>
              </div>

            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Tutorial
