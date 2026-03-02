import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { testBackendConnection } from "./api/All";

import User from "./pages/User";
import Admin from "./pages/Admin";

import Dashboard from "./admin/Dashboard";
import AkunAdmin from "./admin/AkunAdmin";
import AkunUser from "./admin/AkunUser";
import DonasiAdmin from "./admin/DonasiAdmin";
import ProgramAdmin from "./admin/ProgramAdmin";
import GalleryAdmin from "./admin/GalleryAdmin";
import LaporanAdmin from "./admin/LaporanAdmin";

function App() {

  // 🔥 Test koneksi backend sekali saat app load
  useEffect(() => {
    testBackendConnection();
  }, []);

  const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.role === "admin";
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/user" replace />} />
      <Route path="/user" element={<User />} />

      <Route path="/admin" element={isAdmin() ? <Admin /> : <Navigate to="/user" />}>
            <Route index element={<Dashboard />} />
            <Route path="akun-admin" element={<AkunAdmin />} />
            <Route path="akun-user" element={<AkunUser />} />
            <Route path="donasi" element={<DonasiAdmin />} />
            <Route path="laporan" element={<LaporanAdmin />} />
            <Route path="program" element={<ProgramAdmin />} />
            <Route path="gallery" element={<GalleryAdmin />} />
          </Route>
    </Routes>
  );
}

export default App;