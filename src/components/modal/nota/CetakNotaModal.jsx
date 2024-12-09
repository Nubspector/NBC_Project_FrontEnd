import React, { useRef } from "react";
import { Modal, Button } from "react-daisyui";
import formatToRupiah from "../cashier/helper/formatToRupiah";
import { NBC } from "../../../../public/img";
import html2pdf from "html2pdf.js";

const InvoiceModal = ({ isOpen, onClose, data }) => {
  const invoiceRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    if (!invoiceRef.current) return; // Ensure ref is defined
    const element = invoiceRef.current;
    const options = {
      filename: `${data?.invoice_number || "invoice"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save().catch(console.error);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className="bg-white rounded-lg p-8 w-full max-w-2xl border border-gray-300"
    >
      <div ref={invoiceRef} className="p-4">
        {/* Invoice Content */}
        <div className="text-center flex items-center justify-center">
          <div>
            <img src={NBC} alt="" className="w-24 h-3w-24" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-pink-600">
              Natural Beauty Center
            </h1>
            <p className="text-sm">Jl. Babarsari No. 43 Yogyakarta 55281</p>
            <p className="text-sm">Telp. (0274) 487711</p>
          </div>
        </div>

        <div className="flex w-full justify-between mt-4 items-end">
          <p className="font-semibold text-lg">{data?.invoice_number}</p>
          <div className="text-right">
            <p className="">{data?.date}</p>
            <p>{data?.time}</p>
          </div>
        </div>

        <div className="flex justify-between items-end border-b py-2 text-sm">
          <div className="flex flex-col w-2/5">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <p>Cust</p>
                <p>DR</p>
                <p>BC</p>
              </div>
              <div className="flex flex-col">
                <p className="uppercase">{data?.cust}</p>
                <p>{data?.dr}</p>
                <p>{data?.bc}</p>
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <p>CS</p>
                <p>PRO</p>
              </div>
              <div className="flex flex-col">
                <p className="uppercase">{data?.cs}</p>
                <p>{data?.pro}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nota Perawatan */}
        <h2 className="mt-4 mb-2 text-center font-bold border-b pb-1">
          NOTA PERAWATAN NBC
        </h2>
        <table className="w-full mb-4 text-left text-sm">
          <thead>
            <tr className="border-b">
              <th>Item</th>
              <th className="text-center">Satuan</th>
              <th className="text-center">Jumlah</th>
              <th className="text-center">Poin</th>
              <th className="text-right">Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {data?.nota_perawatan_nbc.map((item, index) => (
              <tr key={index} className="border-t">
                <td>{item.item}</td>
                <td className="text-center">{formatToRupiah(item.satuan)}</td>
                <td className="text-center">{item.jumlah}</td>
                <td className="text-center">{item.poin}</td>
                <td className="text-right">{formatToRupiah(item.sub_total)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t mt-2">
            <tr>
              <td colSpan="4" className="text-right font-bold">
                Total Perawatan
              </td>
              <td className="text-right font-bold">
                {formatToRupiah(data?.total_perawatan)}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* Nota Produk */}
        <h2 className="mt-4 mb-2 text-center font-bold border-b pb-1">
          NOTA PRODUK NBC
        </h2>
        <table className="w-full mb-4 text-left text-sm">
          <thead>
            <tr className="border-b">
              <th>Item</th>
              <th className="text-center">Satuan</th>
              <th className="text-center">Jumlah</th>
              <th className="text-right">Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {data?.nota_produk_nbc.map((item, index) => (
              <tr key={index} className="border-t">
                <td>{item.item}</td>
                <td className="text-center">{formatToRupiah(item.satuan)}</td>
                <td className="text-center">{item.jumlah}</td>
                <td className="text-right">{formatToRupiah(item.sub_total)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t mt-2 border-b">
            <tr>
              <td colSpan="3" className="text-right font-bold">
                Total Produk
              </td>
              <td className="text-right font-bold">
                {formatToRupiah(data?.total_produk)}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* Summary Section */}
        <div className="flex justify-between items-start border rounded-md mt-4 text-sm p-4">
          <div className="flex flex-col justify-between h-20">
            <p>Cust</p>
            <p>
              <strong>({data?.cust_name})</strong>
            </p>
          </div>
          <div className="flex flex-col justify-between h-20">
            <p>Kasir</p>
            <p>
              <strong>({data?.kasir_name})</strong>
            </p>
          </div>

          <div className="flex flex-col w-2/5">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col space-y-2">
                <p>Disc</p>
                <p>TOTAL</p>
                <p>Tambah Poin</p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <p>{formatToRupiah(data?.disc)}</p>
                <p className="font-bold">{formatToRupiah(data?.total)}</p>
                <p>{data?.tambah_poin}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <Button
          className="bg-gray-500 text-white p-4 rounded-md"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          className="bg-blue-500 text-white p-4 rounded-md"
          onClick={handlePrint}
        >
          Print
        </Button>
      </div>
    </Modal>
  );
};

export default InvoiceModal;
