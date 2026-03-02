import { useRef } from "react";

const Donasi = ({ isOpen, onClose, program }) => {
  const cardRef = useRef(null);
  if (!isOpen || !program) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">

      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* CARD DONASI */}
      <div
        ref={cardRef}
        data-aos="zoom-in"
        data-aos-duration="700"
        className="
          relative z-50 w-[92%] max-w-3xl
          h-[540px] md:h-[580px]
          bg-white rounded-2xl shadow-2xl
          overflow-hidden
        "
      >

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#2E7D32] text-white">
          <h2 className="text-lg font-bold">Form Donasi</h2>
          <button
            onClick={onClose}
            className="text-3xl hover:text-red-300 transition"
          >
            <i className="bx bx-x"></i>
          </button>
        </div>

        {/* BODY (SCROLLABLE) */}
        <div className="p-6 overflow-y-auto h-[calc(100%-64px)] donasi-scroll">
          {/* PROGRAM */}
          <div className="mb-5">
            <label className="text-sm font-semibold text-gray-700">
              Program Donasi
            </label>
            <input
              type="text"
              value={program.title}
              readOnly
              className="w-full mt-1 px-4 py-3 rounded-lg
                         bg-gray-100 border border-gray-300
                         text-gray-700 font-medium"
            />
          </div>

          {/* NAMA */}
          <div className="mb-5">
            <label className="text-sm font-semibold text-gray-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Nama lengkap Anda"
              className="w-full mt-1 px-4 py-3 rounded-lg
                         border border-gray-300 focus:ring-2
                         focus:ring-[#2E7D32] outline-none"
            />
          </div>

          {/* EMAIL */}
          <div className="mb-5">
            <label className="text-sm font-semibold text-gray-700">
              Email Anda
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full mt-1 px-4 py-3 rounded-lg
                         border border-gray-300 focus:ring-2
                         focus:ring-[#2E7D32] outline-none"
            />
          </div>

          {/* PHONE */}
          <div className="mb-5">
            <label className="text-sm font-semibold text-gray-700">
              Nomor Telepon
            </label>
            <input
              type="number"
              placeholder="08xxxxxxxx"
              className="w-full mt-1 px-4 py-3 rounded-lg
                         border border-gray-300 focus:ring-2
                         focus:ring-[#2E7D32] outline-none"
            />
          </div>

          {/* DANA */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-700">
              Metode Pembayaran
            </label>
            <div className="mt-2 flex justify-center">
              <img
                src="/barcode.png"
                alt="QR Donasi"
                className="w-48 rounded-lg shadow"
              />
            </div>
          </div>

          {/* PESAN */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-700">
              Pesan untuk Penerima (Opsional)
            </label>
            <textarea
              rows="3"
              className="w-full mt-1 px-4 py-3 rounded-lg
                         border border-gray-300 focus:ring-2
                         focus:ring-[#2E7D32] outline-none resize-none"
            ></textarea>
          </div>

          {/* SUBMIT */}
          <button
            className="w-full py-3 rounded-lg bg-[#2E7D32]
                       hover:bg-green-700 transition
                       font-semibold text-white active:scale-95"
          >
            Konfirmasi Donasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Donasi;
