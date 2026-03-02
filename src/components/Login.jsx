import { useRef } from "react";
import { loginWithGoogle } from "../firebase/auth";

const Login = ({ isOpen, onClose }) => {
  const cardRef = useRef(null);

  if (!isOpen) return null;

  // 🔑 HANDLE LOGIN GOOGLE (FE ONLY)
  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();

      // FE only (sementara)
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Login Google sukses:", user);

      onClose(); // tutup modal login
    } catch (error) {
      console.error("Login Google gagal:", error);
      alert("Login Google dibatalkan atau gagal");
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* LOGIN CARD */}
      <div
        ref={cardRef}
        data-aos="zoom-in"
        data-aos-duration="700"
        className="
          relative z-50 w-[90%] max-w-4xl
          bg-white/10 backdrop-blur-xl
          rounded-2xl shadow-2xl
          grid grid-cols-1 md:grid-cols-2
          overflow-hidden text-white
          transition-shadow duration-300
        "
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl hover:text-red-400 transition"
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

        {/* FORM */}
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-2">Login Akun</h2>
          <p className="text-sm text-white/70 mb-8">
            Login untuk keamanan dan transparansi donasi Anda
          </p>

          {/* FORM EMAIL (BELUM DIPAKAI, FE ONLY) */}
          <form className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              className="
                w-full px-4 py-3 rounded-lg
                bg-white/20 border border-white/30
                focus:ring-2 focus:ring-emerald-400
                outline-none transition
              "
            />

            <input
              type="password"
              placeholder="Password"
              className="
                w-full px-4 py-3 rounded-lg
                bg-white/20 border border-white/30
                focus:ring-2 focus:ring-emerald-400
                outline-none transition
              "
            />

            <button
              type="button"
              className="
                w-full py-3 rounded-lg
                bg-emerald-500 hover:bg-emerald-600
                transition font-semibold active:scale-95
              "
            >
              Login
            </button>
          </form>

          <div className="my-6 text-center text-white/60 text-sm">
            ~~~~~ Yuk Donasi ~~~~~
          </div>

          {/* 🔥 GOOGLE LOGIN (INI YANG NYAMBUNG KE FIREBASE) */}
          <button
            onClick={handleGoogleLogin}
            className="
              w-full py-3 rounded-lg
              border border-white/30
              hover:bg-white/10 transition
              flex items-center justify-center gap-2
              active:scale-95
            "
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5"
              alt="Google"
            />
            Login dengan Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
