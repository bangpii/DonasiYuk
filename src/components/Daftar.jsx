import { useRef } from "react";

const Daftar = ({ isOpen, onClose }) => {
  const cardRef = useRef(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* CARD DAFTAR */}
      <div
        ref={cardRef}
        data-aos="zoom-in"
        data-aos-duration="700"
        className="
          relative z-50 w-[90%] max-w-4xl
          h-[520px] md:h-[560px]
          bg-white/10 backdrop-blur-xl
          rounded-2xl shadow-2xl
          grid grid-cols-1 md:grid-cols-2
          overflow-hidden text-white
        "
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl hover:text-red-400 transition z-10"
        >
          <i className="bx bx-x"></i>
        </button>

        {/* LEFT IMAGE */}
        <div
          className="hidden md:block bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800)",
          }}
        />

        {/* FORM (SCROLLABLE) */}
        <div
          className="
            p-10
            overflow-y-auto
            scrollbar-hide
          "
        >
          <h2 className="text-3xl font-bold mb-2">Daftar Akun</h2>
          <p className="text-sm text-white/70 mb-6">
            Buat akun untuk mulai berdonasi dan berpartisipasi
          </p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30
                         focus:ring-2 focus:ring-emerald-400 outline-none"
            />

            <input
              type="email"
              placeholder="Email Anda"
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30
                         focus:ring-2 focus:ring-emerald-400 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30
                         focus:ring-2 focus:ring-emerald-400 outline-none"
            />

            <input
              type="password"
              placeholder="Ulangi Password"
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30
                         focus:ring-2 focus:ring-emerald-400 outline-none"
            />

            {/* CHECKBOX */}
            <label className="flex items-start gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                className="mt-1 accent-emerald-500"
              />
              Saya menyetujui syarat & ketentuan yang berlaku
            </label>

            <button
              type="button"
              className="w-full py-3 rounded-lg bg-emerald-500
                         hover:bg-emerald-600 transition font-semibold active:scale-95"
            >
              Daftar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Daftar;
