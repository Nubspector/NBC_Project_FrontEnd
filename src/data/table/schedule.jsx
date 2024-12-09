import {
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
} from "@material-tailwind/react";
import { MdDelete, MdVisibility } from "react-icons/md";
import { Button } from "react-daisyui";

export const HeaderSchedule = (removeHandler, handleEdit) => [
    {
        fieldId: "index",
        label: "No",
    },
    { fieldId: "name", label: "Nama" },
    {
        fieldId: "schedule",
        label: "Status",
        render: (data) => (
            <div className="flex flex-col gap-1">
                {data.schedule.map((schedule, index) => {
                    // Array warna yang bisa diambil secara dinamis
                    const colors = [
                        "bg-blue-500",
                        "bg-green-500",
                        "bg-purple-500",
                        "bg-orange-500",
                        "bg-teal-500",
                        "bg-red-500",
                        "bg-yellow-500"
                    ];
                    const badgeColor = colors[index % colors.length];

                    return (
                        <div
                            key={index}
                            className={`badge ${badgeColor} text-white m-1`}
                        >
                            <strong>{schedule.shift.day}</strong> - {schedule.shift.time_slot}
                            ({schedule.shift.start_time} - {schedule.shift.end_time})
                        </div>
                    );
                })}
            </div>
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
