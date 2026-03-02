import useScrollSpy from "../hooks/useScrollSpy";

/* =========================
   NAV ITEM (DI LUAR!)
========================= */
const NavItem = ({ id, label, active }) => {
  return (
    <a
      href={`#${id}`}
      className={`
        relative pb-1 text-sm md:text-base transition-colors duration-300
        ${active === id ? "text-[#2E7D32]" : "text-black hover:text-[#2E7D32]"}
      `}
    >
      {label}

      {/* underline */}
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
   FOOTER NAV
========================= */
const FooterNav = () => {
  const active = useScrollSpy();

  return (
    <div className="flex items-center gap-4 md:gap-8 font-medium">
      <NavItem id="beranda" label="Beranda" active={active} />
      <NavItem id="tutorial" label="Tutorial" active={active} />
      <NavItem id="program" label="Program" active={active} />
      <NavItem id="gallery" label="Galery" active={active} />
      <NavItem id="contact" label="Kontak" active={active} />
    </div>
  );
};

export default FooterNav;
