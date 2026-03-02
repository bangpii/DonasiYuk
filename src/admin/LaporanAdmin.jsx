import { useLocation } from "react-router-dom"
import "boxicons/css/boxicons.min.css"

const LaporanAdmin = () => {
  const { state } = useLocation()
  const laporan = state?.laporan ? [state.laporan] : []

  const handlePrint = () => window.print()

  return (
    <div className="flex flex-col gap-8 min-h-full">

      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2 text-[#2E7D32] font-semibold">
          <i className="bx bx-line-chart text-xl" />
          <span>| LAPORAN</span>
        </div>
        <h2 className="text-2xl font-bold">Laporan Donasi</h2>
        <p className="text-sm text-gray-500">Rekap donasi disetujui</p>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl p-6 shadow-md print-area">
        <div className="overflow-y-auto max-h-[420px]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white text-gray-500 border-b">
              <tr>
                <th className="py-3 text-left">No</th>
                <th className="text-left">Nama</th>
                <th className="hidden md:table-cell text-left">Email</th>
                <th className="hidden md:table-cell text-left">Jumlah</th>
                <th className="hidden md:table-cell text-left">Tanggal</th>
              </tr>
            </thead>

            <tbody>
              {laporan.map((l, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-3">{i + 1}</td>
                  <td className="font-medium">{l.name}</td>
                  <td className="hidden md:table-cell">{l.email}</td>
                  <td className="hidden md:table-cell">Rp {l.amount}</td>
                  <td className="hidden md:table-cell">{l.date || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BUTTON PRINT (POSISI SAMA TOMBOL TAMBAH) */}
        <div className="pt-4">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-[#2E7D32] text-white px-4 py-2 rounded-xl"
          >
            <i className="bx bx-printer" />
            Print Laporan
          </button>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; inset: 0; }
          @page { size: A4; margin: 20mm; }
        }
      `}</style>
    </div>
  )
}

export default LaporanAdmin
