import 'boxicons/css/boxicons.min.css'

const HeaderAdmin = () => {
  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50
        h-[72px]
        bg-white/80 backdrop-blur-xl
        border-b border-gray-200
        shadow-[0_10px_30px_rgba(0,0,0,0.08)]
      "
    >
      {/* decorative glow */}
      <div className="absolute -bottom-10 left-1/3 w-40 h-40 bg-[#2E7D32]/10 blur-3xl pointer-events-none"></div>

      <nav className="relative h-full flex items-center justify-between px-6 md:px-10">

        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-4">

          {/* Logo */}
          <img
            src="/logoNav.png"
            alt="Logo"
            className="w-9 h-9 object-contain"
          />

          {/* Divider */}
          <span className="w-[1px] h-8 bg-gray-300"></span>

          {/* Title + icon */}
          <div className="flex items-center gap-2">
            

            <div className="leading-tight">
              <h2 className="text-lg font-extrabold text-black">
                Donasi<span className="text-[#2E7D32]">Yuk</span>
              </h2>
              <span className="text-xs font-semibold text-[#2E7D32]">
                Admin Panel
              </span>
            </div>
          </div>
        </div>

        {/* ================= CENTER (SEARCH) ================= */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="relative w-full max-w-md group">
            <input
              type="text"
              placeholder="Cari data, user, donasi..."
              className="
                w-full h-11 pl-11 pr-4
                rounded-xl
                bg-gray-100
                border border-gray-200
                text-sm text-black
                outline-none
                focus:border-[#2E7D32]
                focus:ring-2 focus:ring-[#2E7D32]/30
                transition
              "
            />
            <i
              className="
                bx bx-search
                absolute left-4 top-1/2 -translate-y-1/2
                text-lg text-gray-500
                group-focus-within:text-[#2E7D32]
                transition
              "
            ></i>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex items-center gap-4">

          {/* Quick stat icon (biar gak sepi) */}
          <div
  className="
    hidden lg:flex items-center gap-2
    h-10 px-3
    rounded-xl
    bg-gray-100
    text-gray-700
    hover:bg-[#2E7D32]
    hover:text-white
    transition
    shadow-sm hover:shadow-lg
  "
>
  <i className="bx bx-bar-chart-alt-2 text-lg"></i>
  <span className="text-xs font-semibold">
    Dashboard
  </span>
</div>


          {/* Notification */}
          <button
            className="
              relative w-10 h-10
              flex items-center justify-center
              rounded-xl
              bg-gray-100
              text-gray-700
              hover:bg-[#2E7D32]
              hover:text-white
              transition
              shadow-sm hover:shadow-lg
            "
          >
            <i className="bx bx-bell text-xl"></i>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full">
              3
            </span>
          </button>

          {/* Profile */}
          <button
            className="
              flex items-center gap-2
              px-3 py-2
              rounded-xl
              bg-gray-100
              hover:bg-gray-200
              transition
            "
          >
            <div className="w-8 h-8 rounded-full bg-[#2E7D32] flex items-center justify-center text-white font-bold">
              A
            </div>

            <span className="hidden sm:block text-sm font-semibold text-black">
              Admin
            </span>

            <i className="bx bx-chevron-down text-lg text-gray-600"></i>
          </button>

        </div>
      </nav>
    </header>
  )
}

export default HeaderAdmin
