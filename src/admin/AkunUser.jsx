import { useState } from "react"
import "boxicons/css/boxicons.min.css"

/* ================= UTIL ================= */
const isSunday = (date) => date.getDay() === 0
const formatDate = (date) => date.toISOString().split("T")[0]

/* ================= DATA DUMMY ================= */
const dataByDate = {
  "2024-01-15": {
    users: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@mail.com`,
      password: "admin123",
      status: i % 2 === 0 ? "Aktif" : "Nonaktif",
    })),
  },
  "2024-01-16": {
    users: [
      { id: 1, name: "Ahmad", email: "ahmad@mail.com", password: "admin123", status: "Aktif" },
      { id: 2, name: "Siti", email: "siti@mail.com", password: "admin123", status: "Aktif" },
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
  return dates[dates.length - 1] // tanggal terakhir yg ada
}

/* ================= COMPONENT ================= */
const AkunUser = () => {
  const initialDate = getInitialDate()

  const [selectedDate, setSelectedDate] = useState(initialDate)
  const [users, setUsers] = useState(dataByDate[initialDate].users)

  const [selectedUser, setSelectedUser] = useState(null)
  const [editUser, setEditUser] = useState(null)
  const [addUser, setAddUser] = useState(null)

  /* ================= DATE CHANGE ================= */
  const handleDateChange = (e) => {
    const value = e.target.value
    const d = new Date(value)
    if (isSunday(d)) return

    const dates = Object.keys(dataByDate).sort()
    const safeUsers =
      dataByDate[value]?.users || dataByDate[dates[dates.length - 1]].users

    setSelectedDate(value)
    setUsers([...safeUsers])
  }

  /* ================= CRUD ================= */
  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      setUsers(users.filter((u) => u.id !== id))
    }
  }

  const handleEditSave = (e) => {
    e.preventDefault()
    setUsers(users.map((u) => (u.id === editUser.id ? { ...u, ...editUser } : u)))
    setEditUser(null)
  }

  const handleAddSave = (e) => {
    e.preventDefault()
    setUsers([
      ...users,
      {
        ...addUser,
        id: users.length + 1,
        status: "Aktif",
      },
    ])
    setAddUser(null)
  }

  return (
    <div className="flex flex-col gap-8 min-h-full">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#2E7D32] font-semibold">
            <i className="bx bx-group text-xl" />
            <span>| AKUN USER</span>
          </div>
          <h2 className="text-2xl font-bold">Akun User</h2>
          <p className="text-sm text-gray-500">Monitoring akun user</p>
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
              {users.map((u, i) => (
                <tr key={u.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{i + 1}</td>
                  <td className="font-medium">{u.name}</td>
                  <td className="hidden md:table-cell">{u.email}</td>
                  <td className="hidden md:table-cell">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        u.status === "Aktif"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="hidden md:table-cell">
                    <div className="flex items-center gap-3 text-lg">
                      <button
                        onClick={() => setEditUser({ ...u })}
                        className="text-blue-500"
                      >
                        <i className="bx bx-edit" />
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="text-red-500"
                      >
                        <i className="bx bx-trash" />
                      </button>
                    </div>
                  </td>
                  <td className="md:hidden">
                    <button
                      onClick={() => setSelectedUser(u)}
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
            onClick={() => setAddUser({ name: "", email: "", password: "" })}
            className="flex items-center gap-2 bg-[#2E7D32] text-white px-4 py-2 rounded-xl"
          >
            <i className="bx bx-plus" />
            Akun User
          </button>
        </div>
      </div>

      {/* ================= MODAL VIEW ================= */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-[90%] max-w-md p-6">
            <h3 className="text-lg font-bold mb-4">Detail Akun</h3>

            <p><b>Nama:</b> {selectedUser.name}</p>
            <p><b>Email:</b> {selectedUser.email}</p>
            <p><b>Status:</b> {selectedUser.status}</p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setSelectedUser(null)
                  setEditUser({ ...selectedUser })
                }}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(selectedUser.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg"
              >
                Hapus
              </button>
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="mt-4 text-sm text-gray-500 w-full"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL EDIT / TAMBAH ================= */}
      {(editUser || addUser) && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <form
            onSubmit={editUser ? handleEditSave : handleAddSave}
            className="bg-white rounded-2xl w-[90%] max-w-md p-6"
          >
            <h3 className="font-bold mb-4">
              {editUser ? "Edit Akun" : "Tambah Akun"}
            </h3>

            {editUser && (
              <input
                disabled
                value={editUser.id}
                className="w-full mb-2 px-3 py-2 bg-gray-100 rounded"
              />
            )}

            <input
              required
              placeholder="Nama"
              value={(editUser || addUser).name}
              onChange={(e) =>
                editUser
                  ? setEditUser({ ...editUser, name: e.target.value })
                  : setAddUser({ ...addUser, name: e.target.value })
              }
              className="w-full mb-2 px-3 py-2 border rounded"
            />

            <input
              required
              placeholder="Email"
              value={(editUser || addUser).email}
              onChange={(e) =>
                editUser
                  ? setEditUser({ ...editUser, email: e.target.value })
                  : setAddUser({ ...addUser, email: e.target.value })
              }
              className="w-full mb-2 px-3 py-2 border rounded"
            />

            <input
              required
              placeholder="Password"
              value={(editUser || addUser).password}
              onChange={(e) =>
                editUser
                  ? setEditUser({ ...editUser, password: e.target.value })
                  : setAddUser({ ...addUser, password: e.target.value })
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
                  setEditUser(null)
                  setAddUser(null)
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

export default AkunUser
