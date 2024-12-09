import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";
import { NBC } from "../../../../public/img"; // Sesuaikan path logo
import { reportPendapatan } from "../../../api/admin/report"; // Ganti endpoint dengan yang sesuai

const PendapatanReportPage = () => {
    const [tahun, setTahun] = useState("");
    const [laporan, setLaporan] = useState([]);
    const [tahunLaporan, setTahunLaporan] = useState(0);
    const [totalPendapatan, setTotalPendapatan] = useState(0);
    const [tanggalCetak, setTanggalCetak] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const reportRef = useRef();

    // Fetch Report Data
    const fetchLaporan = async () => {
        try {
            const response = await reportPendapatan(tahun); // Ganti fungsi dengan endpoint pendapatan
            setLaporan(response.laporan || []);
            setTahunLaporan(response.tahun || 0);
            setTotalPendapatan(response.total || 0);
            setTanggalCetak(response.tanggal_cetak || "");
        } catch (error) {
            console.error("Error fetching report:", error.response);
            toast.error(error.response?.data?.error || "Gagal mengambil laporan!");
        }
    };

    const bulanNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember",
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Laporan Pendapatan</h1>
            <div className="mb-6 flex items-center justify-center gap-4">
                <label className="font-medium">Tahun:</label>
                <input
                    type="number"
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || parseInt(value) >= 2000) {
                            setTahun(value);
                        }
                    }}
                    className="p-2 border border-gray-300 rounded-md w-[200px] pl-4 text-start focus:outline-none focus:ring-2 focus:ring-[#f30b6a]"
                    placeholder="Masukkan Tahun"
                />
                <button
                    onClick={fetchLaporan}
                    className={`p-2 rounded-md text-white shadow-md ${
                        tahun && parseInt(tahun) >= 2000
                            ? "bg-[#f30b6a] hover:bg-[#c20250]"
                            : "bg-gray-300 cursor-not-allowed"
                    }`}
                    disabled={!tahun || parseInt(tahun) < 2000}
                >
                    Tampilkan Laporan
                </button>
            </div>

            {laporan.length > 0 && (
                <>
                    {/* Preview Laporan */}
                    <div
                        ref={reportRef}
                        className="p-8 border border-gray-300 rounded-md bg-white mb-4 shadow-md"
                        style={{
                            width: "190mm",
                            minHeight: "277mm",
                            margin: "auto",
                            padding: "10mm",
                            boxSizing: "border-box",
                        }}
                    >
                        {/* Header Section */}
                        <div className="text-center mb-4">
                            <img src={NBC} alt="Logo NBC" className="w-20 h-auto mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-pink-600">Natural Beauty Center</h2>
                            <p className="text-sm">Jl. Babarsari No. 43 Yogyakarta 55281</p>
                            <p className="text-sm">Telp. (0274) 487711</p>
                        </div>

                        <h3 className="text-lg font-bold text-center my-4">
                            LAPORAN PENDAPATAN
                        </h3>
                        <p className="text-start mb-2">Tahun: {tahunLaporan}</p>

                        {/* Table Section */}
                        <table className="w-full border-collapse border border-gray-400 text-sm mb-4">
                            <thead>
                                <tr>
                                    <th className="border border-gray-400 p-2">No</th>
                                    <th className="border border-gray-400 p-2">Bulan</th>
                                    <th className="border border-gray-400 p-2">Perawatan</th>
                                    <th className="border border-gray-400 p-2">Produk</th>
                                    <th className="border border-gray-400 p-2">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {laporan.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-400 p-2 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="border border-gray-400 p-2">
                                            {bulanNames[item.bulan - 1]}
                                        </td>
                                        <td className="border border-gray-400 p-2 text-right">
                                            Rp {parseInt(item.treatment).toLocaleString("id-ID")}
                                        </td>
                                        <td className="border border-gray-400 p-2 text-right">
                                            Rp {parseInt(item.produk).toLocaleString("id-ID")}
                                        </td>
                                        <td className="border border-gray-400 p-2 text-right">
                                            Rp {parseInt(item.total).toLocaleString("id-ID")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="border border-gray-400 p-2 text-right font-bold"
                                    >
                                        Total Pendapatan
                                    </td>
                                    <td className="border border-gray-400 p-2 text-right font-bold">
                                        Rp {parseInt(totalPendapatan).toLocaleString("id-ID")}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>

                        <p className="text-right mt-4">Dicetak tanggal: {tanggalCetak}</p>
                        <div className="flex justify-end mt-8">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="p-2 bg-[#f30b6a] text-white rounded-md hover:bg-[#c20250]"
                        >
                            Export PDF
                        </button>
                    </div>
                    </div>

                    {/* Tombol Modal */}
                   

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white rounded-md p-8 px-8">
                                <div ref={reportRef}>
                                    <div
                                        ref={reportRef}
                                        className="p-8 border border-gray-300 rounded-md bg-white mb-4 shadow-md"
                                        style={{
                                            width: "190mm",
                                            minHeight: "240mm",
                                            margin: "auto",
                                            padding: "10mm",
                                            boxSizing: "border-box",
                                        }}
                                    >
                                        {/* Header Section */}
                                        <div className="text-center mb-4">
                                            <img src={NBC} alt="Logo NBC" className="w-20 h-auto mx-auto mb-4" />
                                            <h2 className="text-2xl font-bold text-pink-600">Natural Beauty Center</h2>
                                            <p className="text-sm">Jl. Babarsari No. 43 Yogyakarta 55281</p>
                                            <p className="text-sm">Telp. (0274) 487711</p>
                                        </div>

                                        <h3 className="text-lg font-bold text-center my-4">
                                            LAPORAN PENDAPATAN
                                        </h3>
                                        <p className="text-start mb-2">Tahun: {tahunLaporan}</p>

                                        {/* Table Section */}
                                        <table className="w-full border-collapse border border-gray-400 text-sm mb-4">
                                            <thead>
                                                <tr>
                                                    <th className="border border-gray-400 p-2">No</th>
                                                    <th className="border border-gray-400 p-2">Bulan</th>
                                                    <th className="border border-gray-400 p-2">Perawatan</th>
                                                    <th className="border border-gray-400 p-2">Produk</th>
                                                    <th className="border border-gray-400 p-2">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {laporan.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="border border-gray-400 p-2 text-center">
                                                            {index + 1}
                                                        </td>
                                                        <td className="border border-gray-400 p-2">
                                                            {bulanNames[item.bulan - 1]}
                                                        </td>
                                                        <td className="border border-gray-400 p-2 text-right">
                                                            Rp {parseInt(item.treatment).toLocaleString("id-ID")}
                                                        </td>
                                                        <td className="border border-gray-400 p-2 text-right">
                                                            Rp {parseInt(item.produk).toLocaleString("id-ID")}
                                                        </td>
                                                        <td className="border border-gray-400 p-2 text-right">
                                                            Rp {parseInt(item.total).toLocaleString("id-ID")}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td
                                                        colSpan="4"
                                                        className="border border-gray-400 p-2 text-right font-bold"
                                                    >
                                                        Total Pendapatan
                                                    </td>
                                                    <td className="border border-gray-400 p-2 text-right font-bold">
                                                        Rp {parseInt(totalPendapatan).toLocaleString("id-ID")}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>

                                        <p className="text-right mt-4">Dicetak tanggal: {tanggalCetak}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="p-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={() => window.print()}
                                        className="p-2 bg-[#f30b6a] text-white rounded-md hover:bg-[#c20250]"
                                    >
                                        Download PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PendapatanReportPage;
