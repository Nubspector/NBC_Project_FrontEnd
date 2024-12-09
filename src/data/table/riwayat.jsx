import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { MdDelete, MdVisibility } from "react-icons/md";
import { Button } from "react-daisyui";
import {
  FaCheck,
  FaDollarSign,
  FaFileInvoiceDollar,
  FaPlus,
  FaRegEye,
} from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { render } from "@react-pdf/renderer";
import formatToRupiah from "../../components/modal/cashier/helper/formatToRupiah";
import formatToIndonesianDate from "../../components/modal/cashier/helper/formatIndonesianDate";

export const HeaderRiwayatTransaksiRiwayat = (handleCetakNota) => [
  {
    fieldId: "index",
    label: "No",
  },
  {
    fieldId: "customer_id",
    label: "Customer ID",
    render: (data) => data.customer.name || "N/A",
  },
  {
    fieldId: "cs_id",
    label: "CS ID",
    render: (data) => data.cs.name || "N/A",
  },
  {
    fieldId: "kasir_id",
    label: "Kasir ID",
    render: (data) => data.kasir?.name || "N/A",
  },

  {
    fieldId: "status",
    label: "Status",
    render: (data) => (
      <span
        className={`px-2 py-1 rounded-full  text-sm ${
          data.status === "Done"
            ? "bg-pink-500 text-white"
            : data.status === "Payment Success"
            ? "bg-green-900 text-white"
            : "bg-gray-400"
        }`}
      >
        {data.status}
      </span>
    ),
  },
  {
    fieldId: "total_amount",
    label: "Total Amount",
    render: (data) => formatToRupiah(data.total_amount),
  },
  {
    fieldId: "total_amount_final",
    label: "Final Amount",
    render: (data) => (
      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
        {formatToRupiah(data.total_amount_final)}
      </span>
    ),
  },
  {
    fieldId: "payment_date",
    label: "Payment Date",
    render: (data) => formatToIndonesianDate(data.payment_date),
  },
  {
    fieldId: "points_earned",
    label: "Points Earned",
    render: (data) => (
      <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
        {data.points_earned}
      </span>
    ),
  },
  {
    fieldId: "promo_id",
    label: "Promo ID",
    render: (data) => data.promo_id || "None",
  },
  {
    fieldId: "consultation",
    label: "Consultation Details",
    render: (data) =>
      data.consultation?.length ? (
        <div>
          {data.consultation.map((consult, index) => (
            <div key={consult.id} className="mb-2">
              <p>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    consult.status === "Selesai"
                      ? "bg-green-100 text-green-800"
                      : consult.status === "Menunggu"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {consult.status || "N/A"}
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        "No Consultation"
      ),
  },
  {
    fieldId: "transaction_treatment",
    label: "Treatment Names",
    render: (data) =>
      data.transaction_treatment?.length ? (
        <div className="text-start flex justify-start flex-col">
          {data.transaction_treatment.map((treatment, index) => (
            <p key={treatment.id}>
              {index + 1}. {treatment.treatment?.name || "N/A"}
            </p>
          ))}
        </div>
      ) : (
        "No Treatment"
      ),
  },
  {
    fieldId: "transaction_product",
    label: "Product Names",
    render: (data) =>
      data.transaction_product?.length ? (
        <ul className="text-start flex justify-start flex-col">
          {data.transaction_product.map((productItem) => (
            <li key={productItem.id}>
              {productItem.product?.name || "Unnamed Product"} - (
              {productItem.quantity})
            </li>
          ))}
        </ul>
      ) : (
        "No Products"
      ),
  },

  {
    fieldId: "id",
    label: "Action",
    render: (data) => (
      <>
        <Menu>
          <MenuHandler>
            <Button
              size="sm"
              className="rounded text-center text-lg bg-white hover:bg-transparent text-san-juan border-none"
            >
              ...
            </Button>
          </MenuHandler>
          <MenuList placeholder={""}>
            <MenuItem
              placeholder={""}
              className="p-0"
              onClick={() => handleCetakNota(data.id)}
            >
              <label
                htmlFor="item-1"
                className="flex cursor-pointer items-center gap-2 p-2 text-green-800 hover:bg-gray-100"
              >
                <FaFileInvoiceDollar className="mt-1 me-3 h-4 w-4" />
                Cetak Nota
              </label>
            </MenuItem>
          </MenuList>
        </Menu>
      </>
    ),
  },
];
