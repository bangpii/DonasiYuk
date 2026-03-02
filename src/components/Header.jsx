import { useState} from "react";
import 'boxicons/css/boxicons.min.css'
import useStickyNavbar from '../hooks/useStickyNavbar'
import useScrollSpy from '../hooks/useScrollSpy'
import NavMobile from "./NavMobile";

/* ===== NAV ITEM ===== */
const NavItem = ({ id, label, active }) => (
  <a
    href={`#${id}`}
    className={`
      relative pb-1 transition-colors duration-300
      ${active === id ? 'text-[#2E7D32]' : 'text-black hover:text-[#2E7D32]'}
    `}
  >
    {label}
    <span
      className={`
        absolute left-0 -bottom-1 h-[2px] w-full bg-[#2E7D32]
        transform origin-left transition-transform duration-300
        ${active === id ? 'scale-x-100' : 'scale-x-0'}
      `}
    />
  </a>
);

const Header = ({ onLogin, onDaftar }) => {
  const isSticky = useStickyNavbar();
  const active = useScrollSpy();
  const [openMobile, setOpenMobile] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  

  return (
    <>
<header
  className={`
    fixed top-0 left-0 w-full
    z-[100] h-[72px]
    flex items-center
    bg-white transition-all duration-300
    ${isSticky ? 'shadow-md' : ''}
  `}
>

        <nav className="flex w-full items-center justify-between px-6 md:px-10">

          {/* LEFT */}
          <div className="flex items-center gap-2">
            <img src="./logoNav.png" alt="logo" className="w-8 h-8" />
            <h2 className="text-xl font-extrabold text-black">
              Donasi <span className="text-[#2E7D32]">Yuk</span>
            </h2>
          </div>

          {/* CENTER */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            <NavItem id="beranda" label="Beranda" active={active} />
            <NavItem id="tutorial" label="Tutorial" active={active} />
            <NavItem id="program" label="Program" active={active} />
            <NavItem id="gallery" label="Galery" active={active} />
            <NavItem id="contact" label="Kontak" active={active} />
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex gap-3">

{user ? (
  <>
    <span className="px-4 py-2 text-[#2E7D32] font-semibold">
      {user.email}
    </span>

    <button
      onClick={() => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.reload();
      }}
      className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
    >
      Logout
    </button>
  </>
) : (
  <>
    <button
      onClick={onLogin}
      className="px-4 py-2 border border-[#2E7D32] text-[#2E7D32] rounded-lg hover:bg-[#2E7D32] hover:text-white transition"
    >
      Login
    </button>

    <button
      onClick={onDaftar}
      className="px-4 py-2 bg-[#2E7D32] text-white rounded-lg hover:bg-green-700 transition"
    >
      Daftar
    </button>
  </>
)}

</div>

          {/* MOBILE BUTTON */}
          <button
              onClick={() => setOpenMobile(!openMobile)}
              className="md:hidden text-3xl text-black relative z-[110]"
            >
              <i className={`bx ${openMobile ? "bx-menu" : "bx-menu"}`}></i>
            </button>
        </nav>
      </header>

      {/* MOBILE NAV */}
    <NavMobile
      isOpen={openMobile}
      onClose={() => setOpenMobile(false)}
      onLogin={() => onLogin()}
      onDaftar={() => onDaftar()}
    />

    </>
  )
}

export default Header
