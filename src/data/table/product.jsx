import {
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
} from "@material-tailwind/react";
import { MdDelete, MdVisibility } from "react-icons/md";
import { Button } from "react-daisyui";
import { getImage } from "../../api";

export const HeaderProduct = (removeHandler, handleEdit) => [
    {
        fieldId: "index",

        label: "No",
    },
    { fieldId: "name", label: "Nama Produk" },
    {
        fieldId: "image",
        label: "Image",
        render: (data) => (
            <img
                src={getImage(data.image)}
                alt="employee"
                className="w-10 h-10 rounded-full"
            />
        ),
    },
    { fieldId: "category", label: "Kategori" },
    { fieldId: "description", label: "Deskripsi" },
    { fieldId: "price", label: "Harga" },
    { fieldId: "weight", label: "Berat" },
    { fieldId: "unit", label: "Unit" },
    { fieldId: "stock", label: "Stok" },
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
                            onClick={() => { }}
                        >
                            ...
                        </Button>
                    </MenuHandler>
                    <MenuList placeholder={""}>
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
                        <MenuItem
                            placeholder={""}
                            className="p-0"
                            onClick={() => removeHandler(data.id)}
                        >
                            <label
                                htmlFor="item-1"
                                className="flex cursor-pointer items-center gap-2 p-2 text-red-800 hover:bg-gray-100"
                            >
                                <MdDelete className="mt-1 me-3 h-4 w-4" />
                                Delete
                            </label>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </>
        ),
    },
];
