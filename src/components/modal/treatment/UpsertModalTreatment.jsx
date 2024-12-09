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
import useTreatments from "../../../hooks/treatment/useTreatmentForm";
import CImageInput from "../../input/CImageInput";
import CSelectInput from "../../select/CSelect";
import { MdSpa } from "react-icons/md";
import { RiDiscountPercentFill } from "react-icons/ri";

export default function UpsertModalTreatment({ isOpen, type, handler, id }) {
    const { register, handleSubmit, errors, watch, success } =
        useTreatments(type, id);
    const [loading, setLoading] = useState(false);
    const defaultImage = watch("image.url");
    const tipeOptions = ["Medical", "Non-Medical"];

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
                        {type === "create" ? "Form Create" : "Edit"} Treatment
                    </p>
                    <div className="grid grid-cols-2 w-full gap-5">
                        <div className="flex flex-col gap-2 w-full pt-4">
                            <CIconInput
                                label={"Nama Treatment"}
                                leftIcon={<MdSpa  className="w-4 h-4 cursor-pointer" />}
                                type="text"
                                placeholder="Enter name"
                                register={register("name")}
                                name="name"
                                errors={errors.name}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full pt-4">
                            <CIconInput
                                label={"Deskripsi"}
                                leftIcon={<FaList className="w-4 h-4 cursor-pointer" />}
                                type="text"
                                placeholder="Enter description"
                                register={register("description")}
                                name="description"
                                errors={errors.description}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full pt-4">
                            <CIconInput
                                label={"Harga"}
                                leftIcon={<FaDollarSign className="w-4 h-4 cursor-pointer" />}
                                type="number"
                                placeholder="Enter price"
                                register={register("price")}
                                name="price"
                                errors={errors.price}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full pt-4">
                            <CIconInput
                                label={"Poin Diskon"}
                                leftIcon={<RiDiscountPercentFill className="w-4 h-4 cursor-pointer" />}
                                type="number"
                                placeholder="Enter point discount"
                                register={register("point_discount")}
                                name="point_discount"
                                errors={errors.point_discount}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full pt-4">
                            <CImageInput
                                label={"Image Treatment"}
                                type="file"
                                placeholder="Enter Image"
                                register={register("image.file")}
                                errors={errors.image}
                                defaultImage={defaultImage}
                            />
                        </div>
                        <div className="flex flex-col  w-full pt-4">
                            <label htmlFor="">Tipe Treatment</label>
                            <select
                                {...register("type")}
                                className={`select select-bordered border-black w-full transition-all duration-300 
                                ${errors.type ? "border-red-500" : "border-black"} 
                                focus:ring-1 focus:ring-black focus:border-transparent rounded-md`}
                            >
                                <option value="">Pilih Tipe</option>
                                {tipeOptions.map((typeOption, index) => (
                                    <option key={index} value={typeOption}>
                                        {typeOption}
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
