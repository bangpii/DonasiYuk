import { NavLink } from "react-router-dom";
import "boxicons/css/boxicons.min.css";

const menus = [
  { name: "Dashboard", path: "/admin", icon: "bx bx-bar-chart-alt-2 text-xl" },
  { name: "Akun Admin", path: "/admin/akun-admin", icon: "bx-user-circle" },
  { name: "Akun User", path: "/admin/akun-user", icon: "bx-group" },
  { name: "Donasi", path: "/admin/donasi", icon: "bx-donate-heart" },
  { name: "Laporan", path: "/admin/laporan", icon: "bx bx-line-chart" },
  { name: "Program", path: "/admin/program", icon: "bx-category" },
  { name: "Gallery", path: "/admin/gallery", icon: "bx-image" },
];

const NavigasiAdmin = ({ mobile = false, isOpen = false, onClose }) => {
  return (
    <>
      {mobile && (
        <div
          onClick={onClose}
          className={`
            fixed inset-0 z-40
            backdrop-blur-md bg-white/40
            transition-opacity
            ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        />
      )}

      <aside
        className={`
          ${mobile ? "fixed top-[96px] left-4 z-50" : ""}
          w-64
          h-[calc(100vh-140px)]   /* ⬅️ INI JAWABANNYA */
          bg-white
          rounded-2xl
          shadow-[0_25px_80px_rgba(0,0,0,0.12)]
          p-4
          flex flex-col
          transition-transform duration-300
          ${mobile && !isOpen ? "-translate-x-[120%]" : "translate-x-0"}
        `}
      >
        {/* MENU */}
        <div className="space-y-1 flex-1 overflow-y-auto pr-1">
          {menus.map((m) => (
            <NavLink
              key={m.name}
              to={m.path}
              end
              onClick={onClose}
              className={({ isActive }) =>
                `
                flex items-center gap-3 px-4 py-3 rounded-xl
                font-semibold text-sm
                transition-all
                ${
                  isActive
                    ? "bg-[#2E7D32] text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100"
                }
                `
              }
            >
              <i className={`bx ${m.icon} text-lg`} />
              {m.name}
            </NavLink>
          ))}
        </div>

        {/* LOGOUT */}
        <button
          className="
            mt-4
            flex items-center justify-center gap-2
            py-3 rounded-xl
            border border-red-500
            text-red-500
            font-semibold
            hover:bg-red-500 hover:text-white
            transition
          "
        >
          <i className="bx bx-log-out" />
          Logout
        </button>
      </aside>
    </>
  );
};

export default NavigasiAdmin;
