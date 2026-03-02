import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'boxicons/css/boxicons.min.css'
import programData from '../data/programData'

const Program = ({ onDonasi }) => {
  return (
    <section id="program" className="relative w-full min-h-screen bg-[#2E7D32] overflow-hidden">

      {/* Background */}
      <img
        src="/bg_program.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-[#2E7D32]/85"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto text-white">
          <h2 className="text-4xl md:text-5xl font-black">
            Program <span className="text-white">Donasi</span>
          </h2>
          <p className="mt-4 text-white/90 text-base md:text-lg">
            Pilih program yang ingin Anda dukung
          </p>
        </div>

        {/* Slider */}
        <div className="mt-16 max-w-7xl mx-auto w-full">

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            loop
            spaceBetween={24}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false
            }}
            pagination={{
              clickable: true,
              el: '.program-pagination'
            }}
            navigation={{
              nextEl: '.program-next',
              prevEl: '.program-prev'
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
          >
            {programData.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full">

                  {/* Image */}
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-52 object-cover"
                    />
                    <span className="absolute top-4 right-4 bg-[#2E7D32] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {item.type}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-between h-[230px]">
                    <div>
                      <h3 className="text-lg font-bold text-black">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600">
                        {item.desc}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <i className="bx bx-user"></i>
                        <span>{item.donatur} Donatur</span>
                      </div>

                      <button
                        onClick={() => onDonasi(item)}
                        className="px-4 py-2 bg-[#2E7D32] text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition active:scale-95">
                        Donasi
                      </button>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-10 flex items-center justify-between max-w-xs mx-auto relative px-8">

{/* Prev - DI KIRI */}
<button className="program-prev w-11 h-11 flex items-center justify-center rounded-full bg-white/90 text-[#2E7D32] shadow hover:scale-105 transition">
  <i className="bx bx-chevron-left text-2xl"></i>
</button>

{/* Pagination - TITIK DI TENGAH */}
<div className="program-pagination flex gap-2 justify-center flex-1 mx-4">
  {/* Titik pagination akan muncul otomatis di sini */}
</div>

{/* Next - DI KANAN */}
<button className="program-next w-11 h-11 flex items-center justify-center rounded-full bg-white/90 text-[#2E7D32] shadow hover:scale-105 transition">
  <i className="bx bx-chevron-right text-2xl"></i>
</button>

</div>

        </div>
      </div>
    </section>
  )
}

export default Program
