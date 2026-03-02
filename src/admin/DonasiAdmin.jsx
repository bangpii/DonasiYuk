import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "boxicons/css/boxicons.min.css"

/* ================= UTIL ================= */
const isSunday = (date) => date.getDay() === 0
const formatDate = (date) => date.toISOString().split("T")[0]

/* ================= DATA DUMMY ================= */
const dataByDate = {
  "2024-01-15": {
    donasis: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Donatur ${i + 1}`,
      email: `donatur${i + 1}@mail.com`,
      phone: "08123456789",
      proof: "https://via.placeholder.com/120x80.png?text=Bukti",
      message: "Semoga bermanfaat",
      date: "2024-01-15",
    })),
  },
  "2024-01-16": {
    donasis: [
      {
        id: 1,
        name: "Ahmad",
        email: "ahmad@mail.com",
        phone: "08129876543",
        proof: "https://via.placeholder.com/120x80.png?text=Bukti",
        message: "Semoga membantu",
        date: "2024-01-16",
      },
    ],
  },
}

/* ================= AMBIL TANGGAL AMAN (SAMA AkunUser) ================= */
const getInitialDate = () => {
  const today = new Date()
  if (isSunday(today)) today.setDate(today.getDate() - 1)

  const todayStr = formatDate(today)
  if (dataByDate[todayStr]) return todayStr

  const dates = Object.keys(dataByDate).sort()
  return dates[dates.length - 1]
}

/* ================= COMPONENT ================= */
const DonasiAdmin = () => {
  const navigate = useNavigate()
  const initialDate = getInitialDate()

  const [selectedDate, setSelectedDate] = useState(initialDate)
  const [donasis, setDonasis] = useState(dataByDate[initialDate].donasis)

  const [selectedData, setSelectedData] = useState(null)
  const [editData, setEditData] = useState(null)
  const [addData, setAddData] = useState(null)
  const [accData, setAccData] = useState(null)

  /* ================= DATE CHANGE (SAMA AkunUser) ================= */
  const handleDateChange = (e) => {
    const value = e.target.value
    const d = new Date(value)
    if (isSunday(d)) return

    const dates = Object.keys(dataByDate).sort()
    const safeData =
      dataByDate[value]?.donasis ||
      dataByDate[dates[dates.length - 1]].donasis

    setSelectedDate(value)
    setDonasis([...safeData])
  }

  /* ================= CRUD ================= */
  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      setDonasis(donasis.filter((d) => d.id !== id))
      setSelectedData(null)
    }
  }

  const handleEditSave = (e) => {
    e.preventDefault()
    setDonasis(donasis.map((d) => (d.id === editData.id ? editData : d)))
    setEditData(null)
  }

  const handleAddSave = (e) => {
    e.preventDefault()
    setDonasis([
      ...donasis,
      {
        ...addData,
        id: donasis.length + 1,
        date: selectedDate,
      },
    ])
    setAddData(null)
  }

  const handleAccSave = (e) => {
    e.preventDefault()
    navigate("/admin/laporan", {
      state: {
        laporan: {
          name: accData.name,
          email: accData.email,
          amount: accData.amount,
          date: accData.date,
        },
      },
    })
    setAccData(null)
  }

  return (
    <div className="flex flex-col gap-8 min-h-full">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#2E7D32] font-semibold">
            <i className="bx bx-donate-heart text-xl" />
            <span>| DONASI</span>
          </div>
          <h2 className="text-2xl font-bold">Donasi Masuk</h2>
          <p className="text-sm text-gray-500">Monitoring donasi</p>
        </div>

        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
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
                <th className="hidden md:table-cell text-left">Bukti</th>
                <th className="hidden md:table-cell text-left">Aksi</th>
                <th className="md:hidden text-left">View</th>
              </tr>
            </thead>

            <tbody>
              {donasis.map((d, i) => (
                <tr key={d.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{i + 1}</td>
                  <td className="font-medium">{d.name}</td>
                  <td className="hidden md:table-cell">{d.email}</td>
                  <td className="hidden md:table-cell">
                    <img src={d.proof} alt="Bukti" className="w-20 rounded" />
                  </td>
                  <td className="hidden md:table-cell">
                    <div className="flex items-center gap-3 text-lg">
                      <button
                        onClick={() => setEditData({ ...d })}
                        className="text-blue-500"
                      >
                        <i className="bx bx-edit" />
                      </button>
                      <button
                        onClick={() => setAccData({ ...d })}
                        className="text-green-600"
                      >
                        <i className="bx bx-check-circle" />
                      </button>
                      <button
                        onClick={() => handleDelete(d.id)}
                        className="text-red-500"
                      >
                        <i className="bx bx-trash" />
                      </button>
                    </div>
                  </td>
                  <td className="md:hidden">
                    <button
                      onClick={() => setSelectedData(d)}
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

        {/* ================= BUTTON TAMBAH (POSISI SAMA) ================= */}
        <div className="pt-4">
          <button
            onClick={() => setAddData({ name: "", email: "", amount: "" })}
            className="flex items-center gap-2 bg-[#2E7D32] text-white px-4 py-2 rounded-xl"
          >
            <i className="bx bx-plus" />
            Tambah Donasi
          </button>
        </div>
      </div>

      {/* ================= MODAL VIEW ================= */}
      {selectedData && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-[90%] max-w-md p-6">
            <h3 className="text-lg font-bold mb-4">Detail Donasi</h3>

            <p><b>Nama:</b> {selectedData.name}</p>
            <p><b>Email:</b> {selectedData.email}</p>
            <p><b>Pesan:</b> {selectedData.message}</p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setSelectedData(null)
                  setEditData({ ...selectedData })
                }}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(selectedData.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg"
              >
                Hapus
              </button>
            </div>

            <button
              onClick={() => setSelectedData(null)}
              className="mt-4 text-sm text-gray-500 w-full"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL TAMBAH / EDIT / ACC ================= */}
      {(addData || editData || accData) && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <form
            onSubmit={addData ? handleAddSave : editData ? handleEditSave : handleAccSave}
            className="bg-white rounded-2xl w-[90%] max-w-md p-6"
          >
            <h3 className="font-bold mb-4">
              {addData && "Tambah Donasi"}
              {editData && "Edit Donasi"}
              {accData && "ACC Donasi"}
            </h3>

            {(addData || editData) && (
              <>
                <input
                  required
                  placeholder="Nama"
                  value={(addData || editData).name}
                  onChange={(e) =>
                    addData
                      ? setAddData({ ...addData, name: e.target.value })
                      : setEditData({ ...editData, name: e.target.value })
                  }
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <input
                  required
                  placeholder="Email"
                  value={(addData || editData).email}
                  onChange={(e) =>
                    addData
                      ? setAddData({ ...addData, email: e.target.value })
                      : setEditData({ ...editData, email: e.target.value })
                  }
                  className="w-full mb-4 px-3 py-2 border rounded"
                />
              </>
            )}

            {accData && (
              <input
                required
                type="number"
                placeholder="Jumlah Dana"
                onChange={(e) =>
                  setAccData({ ...accData, amount: e.target.value })
                }
                className="w-full mb-4 px-3 py-2 border rounded"
              />
            )}

            <div className="flex gap-3">
              <button className="flex-1 bg-[#2E7D32] text-white py-2 rounded">
                Simpan
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddData(null)
                  setEditData(null)
                  setAccData(null)
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

export default DonasiAdmin
