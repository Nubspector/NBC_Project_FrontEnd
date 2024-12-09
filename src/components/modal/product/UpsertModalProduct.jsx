import {
    FaAddressCard,
    FaBox,
    FaEnvelope,
    FaLock,
    FaPhone,
    FaProductHunt,
    FaUserCircle,
    FaUserCog,
} from "react-icons/fa";
import CIconInput from "../../input/CIconInput";
import { Button, Modal } from "react-daisyui";
import { FaClipboardUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import useProducts from "../../../hooks/product/useProductForm";
import CImageInput from "../../input/CImageInput";
import CSelectInput from "../../select/CSelect";
import { MdCategory, MdOutlineDescription, MdPriceCheck } from "react-icons/md";
import { GiWeight } from "react-icons/gi";
import { AiOutlineDeploymentUnit } from "react-icons/ai";

export default function UpsertModalProduct({ isOpen, type, handler, id }) {
    const { register, handleSubmit, errors, watch, success } =
        useProducts(type, id);
    const [loading, setLoading] = useState(false);
    const defaultImage = watch("image.url");

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
                        {type === "create" ? "Form Create" : "Edit"} Product
                    </p>
                    <div className="grid grid-cols-2 w-full gap-5">
                        <div className="flex flex-col gap-2 w-full pt-4">
                            <CIconInput
                                label={"Nama Produk"}
                                leftIcon={<FaProductHunt className="w-4 h-4 cursor-pointer" />}
                                type="text"
                                placeholder="Enter name"
                                register={register("name")}
                                name="name"
                                errors={errors.name}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full pt-4">
                            <CIconInput
                                label={"Kategori"}
                                leftIcon={<MdCategory className="w-4 h-4 cursor-pointer" />}
                                type="text"
                                placeholder="Enter kategori"
                                register={register("category")}
                                name="category"
                                errors={errors.category}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full pt-4">
                            <CIconInput
                                label={"Harga"}
                                leftIcon={<MdPriceCheck className="w-4 h-4 cursor-pointer" />}
                                type="number"
                                placeholder="Enter price"
                                register={register("price")}
                                name="price"
                                errors={errors.price}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full pt-4">
                            <CIconInput
                                label={"Deskripsi"}
                                leftIcon={<MdOutlineDescription className="w-4 h-4 cursor-pointer" />}
                                type="text"
                                placeholder="Enter deskripsi"
                                register={register("description")}
                                name="description"
                                errors={errors.description}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full pt-4">
                            <CImageInput
                                label={"Image Product"}
                                type="file"
                                placeholder="Enter Image"
                                register={register("image.file")}
                                errors={errors.image}
                                defaultImage={defaultImage}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full pt-4">
                            <CIconInput
                                label={"Berat"}
                                leftIcon={<GiWeight className="w-4 h-4 cursor-pointer" />}
                                type="number"
                                placeholder="Enter berat"
                                register={register("weight")}
                                name="weight"
                                errors={errors.weight}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full pt-4">
                            <CIconInput
                                label={"Unit"}
                                leftIcon={<AiOutlineDeploymentUnit className="w-4 h-4 cursor-pointer" />}
                                type="text"
                                placeholder="Enter unit"
                                register={register("unit")}
                                name="unit"
                                errors={errors.unit}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full pt-4">
                            <CIconInput
                                label={"Stok"}
                                leftIcon={<FaBox className="w-4 h-4 cursor-pointer" />}
                                type="number"
                                placeholder="Enter stok"
                                register={register("stock")}
                                name="stock"
                                errors={errors.stock}
                            />
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
