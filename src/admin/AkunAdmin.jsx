import { useState } from "react"
import "boxicons/css/boxicons.min.css"

/* ================= UTIL ================= */
const isSunday = (date) => date.getDay() === 0
const formatDate = (date) => date.toISOString().split("T")[0]

/* ================= DATA DUMMY ================= */
const dataByDate = {
  "2024-01-15": {
    admins: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Admin ${i + 1}`,
      email: `admin${i + 1}@mail.com`,
      password: "admin123",
      status: i % 2 === 0 ? "Aktif" : "Nonaktif",
    })),
  },
  "2024-01-16": {
    admins: [
      {
        id: 1,
        name: "Admin Utama",
        email: "admin@mail.com",
        password: "admin123",
        status: "Aktif",
      },
      {
        id: 2,
        name: "Admin Keuangan",
        email: "finance@mail.com",
        password: "admin123",
        status: "Aktif",
      },
    ],
  },
}

/* ================= AMBIL TANGGAL AMAN ================= */
const getInitialDate = () => {
  const today = new Date()
  if (isSunday(today)) today.setDate(today.getDate() - 1)

  const todayStr = formatDate(today)
  if (dataByDate[todayStr]) return todayStr

  const dates = Object.keys(dataByDate).sort()
  return dates[dates.length - 1]
}

/* ================= COMPONENT ================= */
const AkunAdmin = () => {
  const initialDate = getInitialDate()

  const [selectedDate, setSelectedDate] = useState(initialDate)
  const [admins, setAdmins] = useState(dataByDate[initialDate].admins)

  const [selectedAdmin, setSelectedAdmin] = useState(null)
  const [editAdmin, setEditAdmin] = useState(null)
  const [addAdmin, setAddAdmin] = useState(null)

  /* ================= DATE CHANGE ================= */
  const handleDateChange = (e) => {
    const value = e.target.value
    const d = new Date(value)
    if (isSunday(d)) return

    const dates = Object.keys(dataByDate).sort()
    const safeAdmins =
      dataByDate[value]?.admins ||
      dataByDate[dates[dates.length - 1]].admins

    setSelectedDate(value)
    setAdmins([...safeAdmins])
  }

  /* ================= CRUD ================= */
  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      setAdmins(admins.filter((a) => a.id !== id))
      setSelectedAdmin(null)
    }
  }

  const handleEditSave = (e) => {
    e.preventDefault()
    setAdmins(
      admins.map((a) =>
        a.id === editAdmin.id ? { ...a, ...editAdmin } : a
      )
    )
    setEditAdmin(null)
  }

  const handleAddSave = (e) => {
    e.preventDefault()
    setAdmins([
      ...admins,
      {
        ...addAdmin,
        id: admins.length + 1,
        status: "Aktif",
      },
    ])
    setAddAdmin(null)
  }

  return (
    <div className="flex flex-col gap-8 min-h-full">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#2E7D32] font-semibold">
            <i className="bx bx-user-circle text-xl" />
            <span>| AKUN ADMIN</span>
          </div>
          <h2 className="text-2xl font-bold">Akun Admin</h2>
          <p className="text-sm text-gray-500">Monitoring akun admin</p>
        </div>

        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          min="2024-01-15"
          max="2024-01-16"
          className="border rounded-lg px-4 py-2 text-sm"
        />
      </div>

      {/* ================= TABLE CARD ================= */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <div className="overflow-y-auto max-h-[420px]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white text-gray-500 border-b">
              <tr>
                <th className="py-3 text-left">No</th>
                <th className="text-left">Nama</th>
                <th className="hidden md:table-cell text-left">Email</th>
                <th className="hidden md:table-cell text-left">Status</th>
                <th className="hidden md:table-cell text-left">Aksi</th>
                <th className="md:hidden text-left">View</th>
              </tr>
            </thead>

            <tbody>
              {admins.map((a, i) => (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{i + 1}</td>
                  <td className="font-medium">{a.name}</td>
                  <td className="hidden md:table-cell">{a.email}</td>
                  <td className="hidden md:table-cell">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        a.status === "Aktif"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="hidden md:table-cell">
                    <div className="flex items-center gap-3 text-lg">
                      <button
                        onClick={() => setEditAdmin({ ...a })}
                        className="text-blue-500"
                      >
                        <i className="bx bx-edit" />
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="text-red-500"
                      >
                        <i className="bx bx-trash" />
                      </button>
                    </div>
                  </td>
                  <td className="md:hidden">
                    <button
                      onClick={() => setSelectedAdmin(a)}
                      className="text-[#2E7D32] font-semibold"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BUTTON TAMBAH */}
        <div className="pt-4">
          <button
            onClick={() =>
              setAddAdmin({
                name: "",
                email: "",
                password: "",
              })
            }
            className="flex items-center gap-2 bg-[#2E7D32] text-white px-4 py-2 rounded-xl"
          >
            <i className="bx bx-plus" />
            Akun Admin
          </button>
        </div>
      </div>

      {/* ================= MODAL VIEW ================= */}
      {selectedAdmin && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-[90%] max-w-md p-6">
            <h3 className="text-lg font-bold mb-4">Detail Akun Admin</h3>

            <p><b>Nama:</b> {selectedAdmin.name}</p>
            <p><b>Email:</b> {selectedAdmin.email}</p>
            <p><b>Status:</b> {selectedAdmin.status}</p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setSelectedAdmin(null)
                  setEditAdmin({ ...selectedAdmin })
                }}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(selectedAdmin.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg"
              >
                Hapus
              </button>
            </div>

            <button
              onClick={() => setSelectedAdmin(null)}
              className="mt-4 text-sm text-gray-500 w-full"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL EDIT / TAMBAH ================= */}
      {(editAdmin || addAdmin) && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <form
            onSubmit={editAdmin ? handleEditSave : handleAddSave}
            className="bg-white rounded-2xl w-[90%] max-w-md p-6"
          >
            <h3 className="font-bold mb-4">
              {editAdmin ? "Edit Akun Admin" : "Tambah Akun Admin"}
            </h3>

            {editAdmin && (
              <input
                disabled
                value={editAdmin.id}
                className="w-full mb-2 px-3 py-2 bg-gray-100 rounded"
              />
            )}

            <input
              required
              placeholder="Nama"
              value={(editAdmin || addAdmin).name}
              onChange={(e) =>
                editAdmin
                  ? setEditAdmin({ ...editAdmin, name: e.target.value })
                  : setAddAdmin({ ...addAdmin, name: e.target.value })
              }
              className="w-full mb-2 px-3 py-2 border rounded"
            />

            <input
              required
              placeholder="Email"
              value={(editAdmin || addAdmin).email}
              onChange={(e) =>
                editAdmin
                  ? setEditAdmin({ ...editAdmin, email: e.target.value })
                  : setAddAdmin({ ...addAdmin, email: e.target.value })
              }
              className="w-full mb-2 px-3 py-2 border rounded"
            />

            <input
              required
              placeholder="Password"
              value={(editAdmin || addAdmin).password}
              onChange={(e) =>
                editAdmin
                  ? setEditAdmin({ ...editAdmin, password: e.target.value })
                  : setAddAdmin({ ...addAdmin, password: e.target.value })
              }
              className="w-full mb-4 px-3 py-2 border rounded"
            />

            <div className="flex gap-3">
              <button className="flex-1 bg-[#2E7D32] text-white py-2 rounded">
                Simpan
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditAdmin(null)
                  setAddAdmin(null)
                }}
                className="flex-1 bg-gray-200 py-2 rounded"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default AkunAdmin
