import React from 'react'
import { motion as Motion } from 'framer-motion'
import 'boxicons/css/boxicons.min.css'
import galleryData from '../data/galleryData'

const Gallery = () => {
  return (
    <section
      id="gallery"
      className="relative w-full min-h-screen bg-white overflow-hidden scroll-mt-24 mb-40"
    >
      {/* Background blur */}
      <div className="hidden md:block absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#2E7D32]/20 rounded-full blur-3xl"></div>
   

      <div className="relative z-10 pt-32 px-6">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-black">
            Gallery <span className="text-[#2E7D32]">Kegiatan</span>
          </h2>
          <p className="mt-4 text-gray-600">
            Dokumentasi kegiatan dan program donasi kami
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {galleryData.map((item, index) => (
            <Motion.a
              key={item.id}
              href={item.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                rotateX: 8,
                rotateY: -8,
                scale: 1.05
              }}
              className="
                relative group
                bg-white rounded-3xl
                shadow-xl
                overflow-hidden
                cursor-pointer
                perspective-distant
              "
            >
              {/* Image */}
              <Motion.img
                src={item.image}
                alt="gallery"
                className="w-full h-72 object-cover"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.6 }}
              />

              {/* Instagram Icon */}
              <div className="absolute top-4 right-4 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg text-[#2E7D32] text-xl">
                <i className="bx bxl-instagram"></i>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition"></div>
            </Motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
