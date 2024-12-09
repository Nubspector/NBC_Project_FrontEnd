import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";
import { NBC } from "../../../../public/img"; // Sesuaikan path logo
import { reportCustomerBaru } from "../../../api/admin/report";

const CustomerReportPage = () => {
    const [tahun, setTahun] = useState("");
    const [laporan, setLaporan] = useState([]);
    const [tahunLaporan, setTahunLaporan] = useState(0);
    const [totalCustomer, setTotalCustomer] = useState(0);
    const [tanggalCetak, setTanggalCetak] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const reportRef = useRef();

    // Fetch Report Data
    const fetchLaporan = async () => {
        try {
            const response = await reportCustomerBaru(tahun);
            setLaporan(response.laporan || []);
            setTahunLaporan(response.tahun || 0);
            setTotalCustomer(response.total_customer || 0);
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
            <h1 className="text-2xl font-bold text-center mb-4">Laporan Customer Baru</h1>
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
                            width: "190mm", // Kurangi margin dari total A4 (210mm)
                            minHeight: "277mm", // Kurangi margin dari total A4 (297mm)
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
                            LAPORAN CUSTOMER BARU
                        </h3>
                        <p className="text-start mb-2">Tahun: {tahunLaporan}</p>

                        {/* Table Section */}
                        <table className="w-full border-collapse border border-gray-400 text-sm mb-4">
                            <thead>
                                <tr>
                                    <th className="border border-gray-400 p-2">No</th>
                                    <th className="border border-gray-400 p-2">Bulan</th>
                                    <th className="border border-gray-400 p-2">Pria</th>
                                    <th className="border border-gray-400 p-2">Wanita</th>
                                    <th className="border border-gray-400 p-2">Jumlah</th>
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
                                        <td className="border border-gray-400 p-2 text-center">
                                            {item.pria}
                                        </td>
                                        <td className="border border-gray-400 p-2 text-center">
                                            {item.wanita}
                                        </td>
                                        <td className="border border-gray-400 p-2 text-center">
                                            {item.jumlah}
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
                                        Total
                                    </td>
                                    <td className="border border-gray-400 p-2 text-center font-bold">
                                        {totalCustomer}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>

                        <p className="text-right mt-4">Dicetak tanggal: {tanggalCetak}</p>
                        <button
                        onClick={() => setIsModalOpen(true)}
                        className="ml-2 p-2 bg-[#f30b6a] text-white rounded-md hover:bg-[#c20250] mt-8"
                    >
                        Export PDF
                    </button>
                    </div>

                    {/* Tombol Modal */}
                 

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="flex flex-col p-8 border border-gray-300 rounded-md bg-white mb-4 shadow-md">

                        <div
                                    ref={reportRef}
                                    className="p-8 border border-gray-300 rounded-md bg-white mb-4 shadow-md"
                                    style={{
                                        width: "190mm", // Kurangi margin dari total A4 (210mm)
                                        minHeight: "255mm", // Kurangi margin dari total A4 (297mm)
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
                                        LAPORAN CUSTOMER BARU
                                    </h3>
                                    <p className="text-start mb-2">Tahun: {tahun}</p>

                                    {/* Table Section */}
                                    <table className="w-full border-collapse border border-gray-400 text-sm mb-4">
                                        <thead>
                                            <tr>
                                                <th className="border border-gray-400 p-2">No</th>
                                                <th className="border border-gray-400 p-2">Bulan</th>
                                                <th className="border border-gray-400 p-2">Pria</th>
                                                <th className="border border-gray-400 p-2">Wanita</th>
                                                <th className="border border-gray-400 p-2">Jumlah</th>
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
                                                    <td className="border border-gray-400 p-2 text-center">
                                                        {item.pria}
                                                    </td>
                                                    <td className="border border-gray-400 p-2 text-center">
                                                        {item.wanita}
                                                    </td>
                                                    <td className="border border-gray-400 p-2 text-center">
                                                        {item.jumlah}
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
                                                    Total
                                                </td>
                                                <td className="border border-gray-400 p-2 text-center font-bold">
                                                    {totalCustomer}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>

                                    <p className="text-right mt-4">Dicetak tanggal: {tanggalCetak}</p>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="mr-2 p-2 bg-gray-300 rounded-md hover:bg-gray-400"
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

export default CustomerReportPage;
