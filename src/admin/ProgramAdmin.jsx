import { useState } from "react"
import "boxicons/css/boxicons.min.css"

/* ================= UTIL ================= */
const isSunday = (date) => date.getDay() === 0
const formatDate = (date) => date.toISOString().split("T")[0]

/* ================= DATA DUMMY PROGRAM ================= */
const dataByDate = {
  "2024-01-15": {
    programs: Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      title: `Program Donasi ${i + 1}`,
      type: i % 2 === 0 ? "Kemanusiaan" : "Pendidikan",
      image: "/program.jpg",
      imageFile: null, // khusus admin
      desc: "Program bantuan sosial untuk masyarakat",
      donatur: 10 + i,
    })),
  },
}

/* ================= AMBIL TANGGAL AMAN ================= */
const getInitialDate = () => {
  const today = new Date()
  if (isSunday(today)) today.setDate(today.getDate() - 1)

  const todayStr = formatDate(today)
  if (dataByDate[todayStr]) return todayStr

  return Object.keys(dataByDate)[0]
}

/* ================= COMPONENT ================= */
const ProgramAdmin = () => {
  const initialDate = getInitialDate()

  const [selectedDate, setSelectedDate] = useState(initialDate)
  const [programs, setPrograms] = useState(dataByDate[initialDate].programs)

  const [selectedProgram, setSelectedProgram] = useState(null)
  const [editProgram, setEditProgram] = useState(null)
  const [addProgram, setAddProgram] = useState(null)

  /* ================= DATE CHANGE ================= */
  const handleDateChange = (e) => {
    const value = e.target.value
    const d = new Date(value)
    if (isSunday(d)) return

    const safe =
      dataByDate[value]?.programs ||
      dataByDate[Object.keys(dataByDate)[0]].programs

    setSelectedDate(value)
    setPrograms([...safe])
  }

  /* ================= CRUD ================= */
  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus program ini?")) {
      setPrograms(programs.filter((p) => p.id !== id))
    }
  }

  const handleEditSave = (e) => {
    e.preventDefault()
    setPrograms(programs.map((p) => (p.id === editProgram.id ? editProgram : p)))
    setEditProgram(null)
  }

  const handleAddSave = (e) => {
    e.preventDefault()
    setPrograms([
      ...programs,
      {
        ...addProgram,
        id: programs.length + 1,
        donatur: 0,
      },
    ])
    setAddProgram(null)
  }

  /* ================= HANDLE IMAGE ================= */
  const handleImageChange = (file, setter, data) => {
    if (!file) return
    setter({
      ...data,
      imageFile: file,
      image: URL.createObjectURL(file),
    })
  }

  return (
    <div className="flex flex-col gap-8 min-h-full">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#2E7D32] font-semibold">
            <i className="bx bx-category text-xl" />
            <span>| PROGRAM</span>
          </div>
          <h2 className="text-2xl font-bold">Program Donasi</h2>
          <p className="text-sm text-gray-500">Manajemen program donasi</p>
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
                <th className="text-left">Gambar</th>
                <th className="text-left">Judul</th>
                <th className="hidden md:table-cell text-left">Kategori</th>
                <th className="hidden md:table-cell text-left">Donatur</th>
                <th className="hidden md:table-cell text-left">Aksi</th>
                <th className="md:hidden text-left">View</th>
              </tr>
            </thead>

            <tbody>
              {programs.map((p, i) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{i + 1}</td>
                  <td>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="font-medium">{p.title}</td>
                  <td className="hidden md:table-cell">{p.type}</td>
                  <td className="hidden md:table-cell">{p.donatur}</td>
                  <td className="hidden md:table-cell">
                    <div className="flex items-center gap-3 text-lg">
                      <button
                        onClick={() => setEditProgram({ ...p })}
                        className="text-blue-500"
                      >
                        <i className="bx bx-edit" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-red-500"
                      >
                        <i className="bx bx-trash" />
                      </button>
                    </div>
                  </td>
                  <td className="md:hidden">
                    <button
                      onClick={() => setSelectedProgram(p)}
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
              setAddProgram({
                title: "",
                type: "",
                image: "",
                imageFile: null,
                desc: "",
              })
            }
            className="flex items-center gap-2 bg-[#2E7D32] text-white px-4 py-2 rounded-xl"
          >
            <i className="bx bx-plus" />
            Program Donasi
          </button>
        </div>
      </div>

      {/* ================= MODAL TAMBAH / EDIT ================= */}
      {(addProgram || editProgram) && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <form
            onSubmit={addProgram ? handleAddSave : handleEditSave}
            className="bg-white rounded-2xl w-[90%] max-w-md p-6"
          >
            <h3 className="font-bold mb-4">
              {addProgram ? "Tambah Program" : "Edit Program"}
            </h3>

            {/* PREVIEW IMAGE */}
            {(addProgram || editProgram).image && (
              <img
                src={(addProgram || editProgram).image}
                alt="Preview"
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}

            {/* UPLOAD FILE */}
            <label className="block mb-3">
            <span className="text-sm text-gray-600 mb-1 block">
              Upload Gambar Program
            </span>

            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageChange(
                    e.target.files[0],
                    addProgram ? setAddProgram : setEditProgram,
                    addProgram || editProgram
                  )
                }
                className="
                  w-full
                  text-sm
                  file:mr-4
                  file:py-2
                  file:px-4
                  file:rounded-lg
                  file:border-0
                  file:bg-[#2E7D32]
                  file:text-white
                  file:font-semibold
                  hover:file:bg-green-700
                  cursor-pointer
                  border
                  border-gray-300
                  rounded-lg
                  px-3
                  py-2
                  bg-white
                "
              />
            </div>
          </label>


            <input
              required
              placeholder="Judul Program"
              value={(addProgram || editProgram).title}
              onChange={(e) =>
                addProgram
                  ? setAddProgram({ ...addProgram, title: e.target.value })
                  : setEditProgram({ ...editProgram, title: e.target.value })
              }
              className="w-full mb-2 px-3 py-2 border rounded"
            />

            <input
              required
              placeholder="Kategori Program"
              value={(addProgram || editProgram).type}
              onChange={(e) =>
                addProgram
                  ? setAddProgram({ ...addProgram, type: e.target.value })
                  : setEditProgram({ ...editProgram, type: e.target.value })
              }
              className="w-full mb-2 px-3 py-2 border rounded"
            />

            <textarea
              required
              placeholder="Deskripsi Program"
              value={(addProgram || editProgram).desc}
              onChange={(e) =>
                addProgram
                  ? setAddProgram({ ...addProgram, desc: e.target.value })
                  : setEditProgram({ ...editProgram, desc: e.target.value })
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
                  setAddProgram(null)
                  setEditProgram(null)
                }}
                className="flex-1 bg-gray-200 py-2 rounded"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= MODAL VIEW ================= */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-[90%] max-w-md p-6">
            <img
              src={selectedProgram.image}
              alt={selectedProgram.title}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <p><b>Judul:</b> {selectedProgram.title}</p>
            <p><b>Kategori:</b> {selectedProgram.type}</p>
            <p><b>Deskripsi:</b> {selectedProgram.desc}</p>

            <button
              onClick={() => setSelectedProgram(null)}
              className="mt-4 text-sm text-gray-500 w-full"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgramAdmin
