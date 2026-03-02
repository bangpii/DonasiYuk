import { useState, useMemo } from "react"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts"

/* ================== UTIL ================== */
const isSunday = (date) => date.getDay() === 0
const formatDate = (date) => date.toISOString().split("T")[0]

/* ================== DATA BERDASARKAN TANGGAL ================== */
const dataByDate = {
  "2024-01-15": {
    // Data untuk tanggal 15 Januari
    totalDana: 72000000,
    totalDonasi: 320,
    totalAdmin: 12,
    pieData: [
      { name: "Donasi", value: 250 },
      { name: "Program", value: 180 },
      { name: "Operasional", value: 120 },
    ],
    users: [
      { id: 1, name: "Ahmad", phone: "08123456789", email: "ahmad@mail.com" },
      { id: 2, name: "Siti", phone: "08234567890", email: "siti@mail.com" },
      { id: 3, name: "Budi", phone: "08345678901", email: "budi@mail.com" },
      { id: 4, name: "Rina", phone: "08456789012", email: "rina@mail.com" },
      { id: 5, name: "Doni", phone: "08567890123", email: "doni@mail.com" },
      { id: 6, name: "Lina", phone: "08678901234", email: "lina@mail.com" },
    ]
  },
  "2024-01-16": {
    // Data untuk tanggal 16 Januari
    totalDana: 85000000,
    totalDonasi: 400,
    totalAdmin: 14,
    pieData: [
      { name: "Donasi", value: 400 },
      { name: "Program", value: 300 },
      { name: "Operasional", value: 200 },
    ],
    users: [
      { id: 1, name: "Ahmad", phone: "08123456789", email: "ahmad@mail.com" },
      { id: 2, name: "Siti", phone: "08234567890", email: "siti@mail.com" },
      { id: 3, name: "Budi", phone: "08345678901", email: "budi@mail.com" },
      { id: 4, name: "Rina", phone: "08456789012", email: "rina@mail.com" },
      { id: 5, name: "Doni", phone: "08567890123", email: "doni@mail.com" },
      { id: 6, name: "Lina", phone: "08678901234", email: "lina@mail.com" },
      { id: 7, name: "Rafi", phone: "08789012345", email: "rafi@mail.com" },
    ]
  },
  // Tambahkan tanggal lainnya jika perlu
}

const COLORS = ["#2E7D32", "#66BB6A", "#A5D6A7"]
const CARD_COLORS = [
  "from-[#2E7D32] to-[#1B5E20]",
  "from-[#2E7D32] to-[#1B5E20]",
  "from-[#2E7D32] to-[#1B5E20]",
  "from-[#2E7D32] to-[#1B5E20]",
]


/* ================== COMPONENT ================== */
const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date()
    if (isSunday(d)) d.setDate(d.getDate() - 1)
    return formatDate(d)
  })

  const handleDateChange = (e) => {
    const d = new Date(e.target.value)
    if (!isSunday(d)) setSelectedDate(e.target.value)
  }

  // Ambil data berdasarkan tanggal yang dipilih
  const todayData = useMemo(() => {
    // Cari tanggal yang tersedia, jika tidak ada ambil tanggal terdekat
    const dates = Object.keys(dataByDate).sort()
    const selected = new Date(selectedDate)
    
    // Cari data untuk tanggal yang dipilih
    if (dataByDate[selectedDate]) {
      return dataByDate[selectedDate]
    }
    
    // Jika tidak ada, cari tanggal terdekat sebelumnya
    for (let i = dates.length - 1; i >= 0; i--) {
      const date = new Date(dates[i])
      if (date <= selected) {
        return dataByDate[dates[i]]
      }
    }
    
    // Default ke tanggal pertama jika tidak ada yang cocok
    return dataByDate[dates[0]] || dataByDate["2024-01-15"]
  }, [selectedDate])

  // Hitung tanggal kemarin dan ambil datanya
  const yesterdayDate = useMemo(() => {
    const date = new Date(selectedDate)
    date.setDate(date.getDate() - 1)
    return formatDate(date)
  }, [selectedDate])

  const yesterdayData = useMemo(() => {
    // Cari data untuk kemarin, jika tidak ada cari tanggal terdekat
    const dates = Object.keys(dataByDate).sort()
    
    if (dataByDate[yesterdayDate]) {
      return dataByDate[yesterdayDate]
    }
    
    // Cari tanggal terdekat sebelum kemarin
    for (let i = dates.length - 1; i >= 0; i--) {
      const date = new Date(dates[i])
      const yestDate = new Date(yesterdayDate)
      if (date <= yestDate) {
        return dataByDate[dates[i]]
      }
    }
    
    // Default ke data pertama
    return dataByDate[dates[0]] || dataByDate["2024-01-15"]
  }, [yesterdayDate])

  const progressPercent = Math.min(
    Math.round((todayData.totalDana / yesterdayData.totalDana) * 100),
    150
  )

  const diffDana = todayData.totalDana - yesterdayData.totalDana
  const totalUsers = todayData.users?.length || 0

  return (
    <div className="flex flex-col gap-8 h-full min-h-0">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#2E7D32] font-semibold">
            <i className="bx bx-bar-chart-alt-2 text-xl" />
            <span>| DASHBOARD</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-500 text-sm">
            Monitoring data admin secara real-time
          </p>
        </div>

        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#2E7D32]"
          min="2024-01-15"
          max="2024-01-16"
        />
      </div>

      {/* ================= STAT CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
  {[
    { label: "Total User", value: totalUsers, icon: "bx-group" },
    { label: "Admin", value: todayData.totalAdmin, icon: "bx-user-circle" },
    { label: "Donasi", value: todayData.totalDonasi, icon: "bx-donate-heart" },
    {
      label: "Dana Terkumpul",
      value: `Rp ${(todayData.totalDana / 1e6).toFixed(0)} JT`,
      icon: "bx-wallet",
    },
  ].map((item, i) => (
    <div
      key={i}
      className={`
        relative overflow-hidden
        rounded-2xl p-5
        text-white
        bg-gradient-to-br ${CARD_COLORS[i]}
        shadow-lg hover:shadow-2xl
        transition duration-300
      `}
    >
      {/* dekorasi blur */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

      <div className="relative flex justify-between items-center">
        <div>
          <p className="text-sm text-white/80">{item.label}</p>
          <h3 className="text-2xl font-bold">{item.value}</h3>
        </div>

        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
          <i className={`bx ${item.icon} text-2xl text-white`} />
        </div>
      </div>
    </div>
  ))}
</div>


      {/* ================= TABLE + PIE ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 min-h-[360px]">

        {/* TABLE */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-md flex flex-col">
          <h4 className="font-semibold mb-4">User Terbaru</h4>

          <div className="flex-1 overflow-y-auto max-h-[260px] scrollbar-hide">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white text-gray-500">
                <tr>
                  <th className="py-2 text-left">No</th>
                  <th className="text-left">Nama</th>
                  <th className="text-left">Telepon</th>
                  <th className="text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {todayData.users?.map((u, i) => (
                  <tr key={u.id} className="border-t">
                    <td className="py-2">{i + 1}</td>
                    <td>{u.name}</td>
                    <td>{u.phone}</td>
                    <td>{u.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col">
          <h4 className="font-semibold mb-4">Distribusi Dana</h4>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={todayData.pieData}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {todayData.pieData?.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ================= MODERN GAME BAR ================= */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h4 className="font-semibold mb-1">
          Perbandingan Dana (Hari Ini vs Kemarin)
        </h4>

        <p className="text-sm text-gray-500 mb-6">
          {formatDate(new Date(selectedDate))}: Rp {(todayData.totalDana / 1e6).toFixed(1)} JT | 
          {yesterdayDate}: Rp {(yesterdayData.totalDana / 1e6).toFixed(1)} JT | 
          Selisih:{" "}
          <span className={`font-semibold ${diffDana >= 0 ? 'text-[#2E7D32]' : 'text-red-500'}`}>
            Rp {(diffDana / 1e6).toFixed(1)} JT
          </span>
        </p>

        {/* BAR */}
        <div className="relative w-full h-4 bg-gray-200 rounded-full">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#66BB6A] to-[#2E7D32]"
            style={{ width: `${progressPercent}%` }}
          />

          {/* INDICATOR PANAH */}
          <div
            className="absolute -top-6"
            style={{ left: `calc(${progressPercent}% - 8px)` }}
          >
            <i className="bx bxs-up-arrow text-[#2E7D32] text-lg" />
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{yesterdayDate}</span>
          <span>{progressPercent}%</span>
          <span>{formatDate(new Date(selectedDate))}</span>
        </div>
      </div>

    </div>
  )
}

export default Dashboard