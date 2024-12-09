import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { MdDelete, MdVisibility } from "react-icons/md";
import { Button } from "react-daisyui";
import { FaCheck, FaPlus, FaRegEye } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

export const HeaderListTransaction = (
  handleView,
  handleInput,
  handleEdit,
  handleSuccess
) => [
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
        className={`px-2 py-1 rounded-full text-white text-sm ${
          data.status === "Consultation"
            ? "bg-yellow-500 text-yellow-900"
            : data.status === "Completed"
            ? "bg-green-500"
            : "bg-gray-400"
        }`}
      >
        {data.status}
      </span>
    ),
  },
  {
    fieldId: "payment_date",
    label: "Payment Date",
    render: (data) => data.payment_date || "Pending",
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
              <p>Room: {consult.room_id}</p>
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
              onClick={() => handleView(data.customer_id)}
            >
              <label
                htmlFor="item-1"
                className="flex cursor-pointer items-center gap-2 p-2 text-gray-800 hover:bg-gray-100"
              >
                <FaRegEye className="mt-1 me-3 h-4 w-4" />
                Riwayat
              </label>
            </MenuItem>
            <MenuItem
              placeholder={""}
              className="p-0"
              onClick={() => handleInput(data.consultation[0]?.id)}
            >
              <label
                htmlFor="item-1"
                className="flex cursor-pointer items-center gap-2 p-2 text-green-600 hover:bg-gray-100"
              >
                <FaPlus className="mt-1 me-3 h-4 w-4" />
                Input
              </label>
            </MenuItem>
            <MenuItem
              placeholder={""}
              className="p-0"
              onClick={() => handleEdit(data.consultation[0]?.id)}
            >
              <label
                htmlFor="item-1"
                className="flex cursor-pointer items-center gap-2 p-2 text-yellow-900 hover:bg-gray-100"
              >
                <FaPenToSquare className="mt-1 me-3 h-4 w-4" />
                Edit
              </label>
            </MenuItem>
            <MenuItem
              placeholder={""}
              className="p-0"
              onClick={() => handleSuccess(data.consultation[0]?.id)}
            >
              <label
                htmlFor="item-1"
                className="flex cursor-pointer items-center gap-2 p-2 text-blue-700 hover:bg-gray-100"
              >
                <FaCheck className="mt-1 me-3 h-4 w-4" />
                Success
              </label>
            </MenuItem>
          </MenuList>
        </Menu>
      </>
    ),
  },
];
