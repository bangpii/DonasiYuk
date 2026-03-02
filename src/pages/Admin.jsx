import { useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import NavigasiAdmin from "../components/NavigasiAdmin";
import ContentAdmin from "../components/ContentAdmin";
import { Outlet } from "react-router-dom";
import "boxicons/css/boxicons.min.css";

const Admin = () => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <div className="h-screen bg-gray-50 overflow-hidden md:overflow-hidden overflow-y-auto">
      <HeaderAdmin />

      {/* SATU-SATUNYA GAP DARI HEADER */}
      <div className="pt-[96px] h-full px-4 md:px-6 pb-8">
        {/* CONTAINER PATOKAN TINGGI */}
        <div className="relative h-full flex gap-6">

          {/* NAVIGASI (TINGGI INI YANG JADI PATOKAN) */}
          <div className="hidden lg:block h-full">
            <NavigasiAdmin />
          </div>

          {/* CONTENT IKUT TINGGI NAV */}
          <div className="flex-1 h-full">
          <Outlet />
          </div>

          {/* HANDLE MOBILE */}
          <button
            onClick={() => setOpenNav(!openNav)}
            className="
              lg:hidden
              fixed right-0 top-1/2 -translate-y-1/2
              w-6 h-20
              rounded-l-2xl
              bg-[#2E7D32]/80
              hover:bg-[#2E7D32]
              text-white
              flex items-center justify-center
              z-50
              backdrop-blur-md
              transition
            "
          >
            <i
              className={`bx ${
                openNav ? "bx-chevron-right" : "bx-chevron-left"
              } text-2xl`}
            />
          </button>

          {/* NAV MOBILE */}
          <NavigasiAdmin
            mobile
            isOpen={openNav}
            onClose={() => setOpenNav(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
