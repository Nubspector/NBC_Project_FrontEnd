import {
    FaAddressCard,
    FaDollarSign,
    FaEnvelope,
    FaList,
    FaLock,
    FaPhone,
    FaUserCircle,
    FaUserCog,
} from "react-icons/fa";
import CIconInput from "../../input/CIconInput";
import { Button, Modal } from "react-daisyui";
import { FaClipboardUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import useRooms from "../../../hooks/room/useRoomForm";
import CImageInput from "../../input/CImageInput";
import CSelectInput from "../../select/CSelect";
import { MdSpa } from "react-icons/md";
import { RiDiscountPercentFill } from "react-icons/ri";

export default function UpsertModalRoom({ isOpen, type, handler, id }) {
    const { register, handleSubmit, errors, watch, success } =
        useRooms(type, id);
    const [loading, setLoading] = useState(false);
    const statusOptions = ["Available", "Occupied"];

    useEffect(() => {
        if (success) {
            handler(true);
        }
    }, [success]);

    return (
        <Modal
            open={isOpen}
            backdrop={false}
            className="flex flex-col bg-white lg:min-w-[900px] h-[650px] p-5 rounded-lg overflow-scroll"
        >
            <form onSubmit={handleSubmit}>
                <Modal.Body className="flex flex-col justify-start items-start">
                    <p className="text-xl font-semibold text-start">
                        {type === "create" ? "Form Create" : "Edit"} Room
                    </p>
                    <div className="grid grid-cols-2 w-full gap-5">
                        <div className="flex flex-col gap-2 w-full pt-4">
                            <CIconInput
                                label={"Nama Ruangan"}
                                leftIcon={<MdSpa  className="w-4 h-4 cursor-pointer" />}
                                type="text"
                                placeholder="Enter name"
                                register={register("name")}
                                name="name"
                                errors={errors.name}
                            />
                        </div>
                        <div className="flex flex-col  w-full pt-4">
                            <label htmlFor="">Status Ruangan</label>
                            <select
                                {...register("status")}
                                className={`select select-bordered border-black w-full transition-all duration-300 
                                ${errors.status ? "border-red-500" : "border-black"} 
                                focus:ring-1 focus:ring-black focus:border-transparent rounded-md`}
                            >
                                <option value="">Pilih Status</option>
                                {statusOptions.map((statusOption, index) => (
                                    <option key={index} value={statusOption}>
                                        {statusOption}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Actions className="flex w-full justify-end items-center mt-16 space-x-3">
                    <Button
                        className="w-[30%] lg:w-[10%] p-2 rounded-xl bg-gray-500 text-white hover:bg-gray-800 hover:border-[#3A3B3C] hover:text-white"
                        type="button"
                        onClick={() => handler(false)}
                    >
                        Keluar
                    </Button>
                    <Button
                        type="submit"
                        className={`w-[30%] lg:w-[10%] p-2 rounded-xl bg-[#f30b6a] hover:bg-[#c20250] text-white`}
                        loading={loading}
                    >
                        Simpan
                    </Button>
                </Modal.Actions>
            </form>
        </Modal>
    );
}
