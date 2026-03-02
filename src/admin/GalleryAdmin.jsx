import { useState } from "react"
import "boxicons/css/boxicons.min.css"

/* ================= UTIL ================= */
const isSunday = (date) => date.getDay() === 0
const formatDate = (date) => date.toISOString().split("T")[0]

/* ================= DATA DUMMY ================= */
const dataByDate = {
  "2024-01-15": {
    galleries: [
      {
        id: 1,
        image: "https://source.unsplash.com/600x400/?charity",
        imageFile: null,
        instagram: "https://instagram.com/example1",
      },
      {
        id: 2,
        image: "https://source.unsplash.com/600x400/?donation",
        imageFile: null,
        instagram: "https://instagram.com/example2",
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

  return Object.keys(dataByDate)[0]
}

/* ================= COMPONENT ================= */
const GalleryAdmin = () => {
  const initialDate = getInitialDate()

  const [selectedDate, setSelectedDate] = useState(initialDate)
  const [galleries, setGalleries] = useState(
    dataByDate[initialDate].galleries
  )

  const [selectedItem, setSelectedItem] = useState(null)
  const [editItem, setEditItem] = useState(null)
  const [addItem, setAddItem] = useState(null)

  /* ================= DATE CHANGE ================= */
  const handleDateChange = (e) => {
    const value = e.target.value
    const d = new Date(value)
    if (isSunday(d)) return

    const safe =
      dataByDate[value]?.galleries ||
      dataByDate[Object.keys(dataByDate)[0]].galleries

    setSelectedDate(value)
    setGalleries([...safe])
  }

  /* ================= CRUD ================= */
  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus gallery ini?")) {
      setGalleries(galleries.filter((g) => g.id !== id))
      setSelectedItem(null)
    }
  }

  const handleEditSave = (e) => {
    e.preventDefault()
    setGalleries(
      galleries.map((g) => (g.id === editItem.id ? editItem : g))
    )
    setEditItem(null)
  }

  const handleAddSave = (e) => {
    e.preventDefault()
    setGalleries([
      ...galleries,
      {
        ...addItem,
        id: galleries.length + 1,
      },
    ])
    setAddItem(null)
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
            <i className="bx bx-image-alt text-xl" />
            <span>| GALLERY</span>
          </div>
          <h2 className="text-2xl font-bold">Gallery Kegiatan</h2>
          <p className="text-sm text-gray-500">
            Manajemen dokumentasi kegiatan
          </p>
        </div>

        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border rounded-lg px-4 py-2 text-sm"
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <div className="overflow-y-auto max-h-[420px]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white text-gray-500 border-b">
              <tr>
                <th className="py-3 text-left">No</th>
                <th className="text-left">Foto</th>
                <th className="hidden md:table-cell text-left">Instagram</th>
                <th className="hidden md:table-cell text-left">Aksi</th>
                <th className="md:hidden text-left">View</th>
              </tr>
            </thead>

            <tbody>
              {galleries.map((g, i) => (
                <tr key={g.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{i + 1}</td>
                  <td>
                    <img
                      src={g.image}
                      alt="gallery"
                      className="w-20 h-14 object-cover rounded-lg"
                    />
                  </td>
                  <td className="hidden md:table-cell truncate max-w-[200px]">
                    {g.instagram}
                  </td>
                  <td className="hidden md:table-cell">
                    <div className="flex items-center gap-3 text-lg">
                      <button
                        onClick={() => setEditItem({ ...g })}
                        className="text-blue-500"
                      >
                        <i className="bx bx-edit" />
                      </button>
                      <button
                        onClick={() => handleDelete(g.id)}
                        className="text-red-500"
                      >
                        <i className="bx bx-trash" />
                      </button>
                    </div>
                  </td>
                  <td className="md:hidden">
                    <button
                      onClick={() => setSelectedItem(g)}
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
              setAddItem({
                image: "",
                imageFile: null,
                instagram: "",
              })
            }
            className="flex items-center gap-2 bg-[#2E7D32] text-white px-4 py-2 rounded-xl"
          >
            <i className="bx bx-plus" />
            Gallery
          </button>
        </div>
      </div>

      {/* ================= MODAL TAMBAH / EDIT ================= */}
      {(addItem || editItem) && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <form
            onSubmit={addItem ? handleAddSave : handleEditSave}
            className="bg-white rounded-2xl w-[90%] max-w-md p-6"
          >
            <h3 className="font-bold mb-4">
              {addItem ? "Tambah Gallery" : "Edit Gallery"}
            </h3>

            {/* PREVIEW IMAGE */}
            {(addItem || editItem).image && (
              <img
                src={(addItem || editItem).image}
                alt="Preview"
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}

            {/* UPLOAD FILE (SAMA DENGAN PROGRAM ADMIN) */}
            <label className="block mb-3">
              <span className="text-sm text-gray-600 mb-1 block">
                Upload Foto Gallery
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageChange(
                    e.target.files[0],
                    addItem ? setAddItem : setEditItem,
                    addItem || editItem
                  )
                }
                className="
                  w-full text-sm
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
                  border border-gray-300
                  rounded-lg px-3 py-2
                "
              />
            </label>

            <input
              required
              placeholder="Link Instagram"
              value={(addItem || editItem).instagram}
              onChange={(e) =>
                addItem
                  ? setAddItem({ ...addItem, instagram: e.target.value })
                  : setEditItem({ ...editItem, instagram: e.target.value })
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
                  setAddItem(null)
                  setEditItem(null)
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
      {selectedItem && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-[90%] max-w-md p-6">
            <img
              src={selectedItem.image}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <p><b>Instagram:</b> {selectedItem.instagram}</p>

            <button
              onClick={() => setSelectedItem(null)}
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

export default GalleryAdmin
