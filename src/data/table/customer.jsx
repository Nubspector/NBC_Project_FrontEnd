import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { MdDelete, MdTrolley, MdVisibility } from "react-icons/md";
import { Button } from "react-daisyui";
import { getImage } from "../../api";
import { FaAddressCard } from "react-icons/fa";

export const HeaderCustomer = (removeHandler, handleEdit, handleCard, handleTransaction) => [
  {
    fieldId: "index",
    label: "No",
  },
  {
    fieldId: "image",
    label: "Image",
    render: (data) => (
      <img
        src={getImage(data.image)}
        alt="customer"
        className="w-10 h-10 rounded-full"
      />
    ),
  },
  { fieldId: "name", label: "Nama" },
  { fieldId: "gender", label: "Jenis Kelamin" },
  { fieldId: "address", label: "Alamat" },
  { fieldId: "phone_number", label: "Nomor Telepon" },
  { fieldId: "email", label: "Email" },
  { fieldId: "username", label: "Username" },
  { fieldId: "allergy", label: "Alergi" },
  { fieldId: "points", label: "Poin" },
  {
    fieldId: "id",
    label: "Action",
    render: (data) => (
      <>
        <Menu>
          <MenuHandler>
            <Button
              size="sm"
              className="rounded text-center text-lg hover:bg-transparent text-san-juan border-none"
              onClick={() => {}}
            >
              ...
            </Button>
          </MenuHandler>
          <MenuList placeholder={""}>
            <MenuItem
              placeholder={""}
              className="p-0"
              onClick={() => handleCard(data.id)}
            >
              <label
                htmlFor="item-1"
                className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
              >
                <FaAddressCard  className="mt-1 me-3 h-4 w-4" />
                ID Card
              </label>
            </MenuItem>
            <MenuItem
              placeholder={""}
              className="p-0"
              onClick={() => handleTransaction(data.id)}
            >
              <label
                htmlFor="item-1"
                className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
              >
                <MdTrolley  className="mt-1 me-3 h-4 w-4" />
                Transaction
              </label>
            </MenuItem>
            <MenuItem
              placeholder={""}
              className="p-0"
              onClick={() => handleEdit(data.id)}
            >
              <label
                htmlFor="item-1"
                className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
              >
                <MdVisibility className="mt-1 me-3 h-4 w-4" />
                Edit
              </label>
            </MenuItem>
          </MenuList>
        </Menu>
      </>
    ),
  },
];
