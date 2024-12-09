import {
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
} from "@material-tailwind/react";
import { MdDelete, MdVisibility } from "react-icons/md";
import { Button } from "react-daisyui";
import { format } from "date-fns";

export const HeaderPromo = (removeHandler, handleEdit) => [
    {
        fieldId: "index",
        label: "No",
    },
    { fieldId: "name", label: "Nama Perawatan" },
    { fieldId: "description", label: "Deskripsi" },
    { fieldId: "discount", label: "Diskon" },
    { fieldId: "start_date", 
        label: "Tanggal Mulai",
        render: (data) => data.start_date ? format(new Date(data.start_date), "dd/MM/yyyy") : "-",
    },
    { fieldId: "end_date", 
        label: "Tanggal Berakhir",
        render: (data) => data.end_date ? format(new Date(data.end_date), "dd/MM/yyyy") : "-",
    },
    { 
        fieldId: "is_active", 
        label: "Status",
        render: (data) => (
            <span className={`px-2 py-1 rounded-full text-xs ${data.is_active == 1 ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                {data.is_active == 1 ? "Active" : "Inactive"}
            </span>
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
