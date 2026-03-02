import useScrollSpy from "../hooks/useScrollSpy";
import 'boxicons/css/boxicons.min.css';

/* =========================
   NAV ITEM (DI LUAR!)
========================= */
const NavItem = ({ id, label, active, onClose }) => {
  return (
    <a
      href={`#${id}`}
      onClick={onClose}
      className={`
        relative py-3 text-lg font-semibold transition-colors duration-300
        ${active === id ? "text-[#2E7D32]" : "text-black hover:text-[#2E7D32]"}
      `}
    >
      {label}

      {/* underline aktif */}
      <span
        className={`
          absolute left-0 -bottom-1 h-[2px] w-full bg-[#2E7D32]
          transform origin-left transition-transform duration-300
          ${active === id ? "scale-x-100" : "scale-x-0"}
        `}
      />
    </a>
  );
};

/* =========================
   NAV MOBILE
========================= */
const NavMobile = ({ isOpen, onClose, onLogin, onDaftar }) => {
  const active = useScrollSpy();

  return (
    <>
        {/* OVERLAY */}
        <div
        onClick={onClose}
        className={`
            fixed left-0 right-0 top-[72px] bottom-0
            bg-black/50 z-[80]
            transition-opacity duration-300
            ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        />

      {/* DRAWER */}
      <div
        className={`
            fixed top-0 right-0 h-full w-1/2 max-w-xs
            bg-white z-[90]
            transform transition-transform duration-300
            ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        >

        {/* HEADER SPACE (TANPA ICON X) */}
        <div className="h-[72px] border-b"></div>

        {/* NAV */}
        <div className="flex flex-col px-6 pt-6 gap-4">
          <NavItem id="beranda" label="Beranda" active={active} onClose={onClose} />
          <NavItem id="tutorial" label="Tutorial" active={active} onClose={onClose} />
          <NavItem id="program" label="Program" active={active} onClose={onClose} />
          <NavItem id="gallery" label="Galery" active={active} onClose={onClose} />
          <NavItem id="contact" label="Kontak" active={active} onClose={onClose} />

          {/* ACTION */}
          <div className="border-t mt-6 pt-6 flex flex-col gap-3">
            <button
              onClick={() => {
                onClose();
                onLogin();
              }}
              className="
                w-full py-3 border border-[#2E7D32]
                text-[#2E7D32] rounded-lg
                hover:bg-[#2E7D32] hover:text-white transition
              "
            >
              Login
            </button>

            <button
              onClick={() => {
                onClose();
                onDaftar();
              }}
              className="
                w-full py-3 bg-[#2E7D32]
                text-white rounded-lg
                hover:bg-green-700 transition
              "
            >
              Daftar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavMobile;
