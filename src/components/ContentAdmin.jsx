import { Outlet } from "react-router-dom";

const ContentAdmin = () => {
  return (
<main
  className="
    h-auto md:h-[calc(100vh-140px)]
    bg-white
    rounded-2xl
    shadow-[0_25px_80px_rgba(0,0,0,0.1)]
    p-6 md:p-8
    relative
    overflow-y-auto md:overflow-hidden
  "
>

      {/* dekorasi */}
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#2E7D32]/10 blur-3xl pointer-events-none" />

      {/* 🔥 INI PENGGANTI <Routes> */}
      <Outlet />
    </main>
  );
};

export default ContentAdmin;
