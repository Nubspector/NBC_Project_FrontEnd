import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { MdDelete, MdVisibility } from "react-icons/md";
import { Button } from "react-daisyui";
import { FaCheck, FaDollarSign, FaPlus, FaRegEye } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import formatToRupiah from "../../components/modal/cashier/helper/formatToRupiah";

export const HeaderListPayment = (handlePayment) => [
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
    fieldId: "status",
    label: "Status",
    render: (data) => (
      <span
        className={`px-2 py-1 rounded-full  text-sm ${
          data.status === "Waiting for Payment"
            ? "bg-yellow-500 text-orange-900"
            : data.status === "Completed"
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
    render: (data) => data.payment_date || "Pending",
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
        <div className="text-start flex justify-start flex-col">
          {data.consultation.map((consult, index) => (
            <div key={consult.id} className="mb-2">
              <p>Consultation {index + 1}:</p>
              <p>Doctor ID: {consult.doctor_id}</p>
              <p>Room ID: {consult.room_id}</p>
              <p>Status: {consult.status || "N/A"}</p>
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
              onClick={() => handlePayment(data.id)}
            >
              <label
                htmlFor="item-1"
                className="flex cursor-pointer items-center gap-2 p-2 text-green-800 hover:bg-gray-100"
              >
                <FaDollarSign className="mt-1 me-3 h-4 w-4" />
                Payment
              </label>
            </MenuItem>
          </MenuList>
        </Menu>
      </>
    ),
  },
];
