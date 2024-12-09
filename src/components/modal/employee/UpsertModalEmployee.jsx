import {
  FaAddressCard,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUserCircle,
  FaUserCog,
} from "react-icons/fa";
import CIconInput from "../../input/CIconInput";
import { Button, Modal } from "react-daisyui";
import { FaClipboardUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import useEmployees from "../../../hooks/employee/useEmployeeForm";
import CImageInput from "../../input/CImageInput";
import useRoles from "../../../hooks/role/useFetchRole";
import CSelectInput from "../../select/CSelect";

export default function UpsertModal({ isOpen, type, handler, id }) {
  const { register, handleSubmit, errors, selectedEmployee, watch, success } =
    useEmployees(type, id);
  const { roles } = useRoles();
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
            {type === "create" ? "Form Create" : "Edit"} Employee
          </p>
          <div className="grid grid-cols-2 w-full gap-5">
            <div className="flex flex-col gap-2 w-full pt-4">
              <CIconInput
                label={"Nama Employee"}
                leftIcon={<FaUserCircle className="w-4 h-4 cursor-pointer" />}
                type="text"
                placeholder="Enter name"
                register={register("name")}
                name="name"
                errors={errors.name}
              />
            </div>
            <div className="flex flex-col gap-2 w-full pt-4">
              <CIconInput
                label={"Nama Pengguna Employee"}
                leftIcon={
                  <FaClipboardUser className="w-4 h-4 cursor-pointer" />
                }
                type="text"
                placeholder="Enter Username"
                register={register("username")}
                name="username"
                errors={errors.username}
              />
            </div>
            <div className="flex flex-col gap-2 w-full pt-4">
              <CIconInput
                label={"Email Employee"}
                leftIcon={<FaEnvelope className="w-4 h-4 cursor-pointer" />}
                type="text"
                placeholder="Enter email"
                register={register("email")}
                errors={errors.email}
                name="email"
              />
            </div>
            <div className="flex flex-col gap-2 w-full pt-4">
              <CImageInput
                label={"Image Employee"}
                type="file"
                placeholder="Enter Image"
                register={register("image.file")}
                errors={errors.image}
                defaultImage={defaultImage}
              />
            </div>
            <div className="flex flex-col gap-2 w-full pt-4">
              <CSelectInput
                label="Role"
                name="role_id"
                register={register}
                options={roles}
                errors={errors.role_id}
                placeholder="Pilih Role"
              />
            </div>
            <div className="flex flex-col gap-2 w-full pt-4">
              <CIconInput
                label={"Alamat Employee"}
                leftIcon={<FaAddressCard className="w-4 h-4 cursor-pointer" />}
                type="text"
                placeholder="Enter address"
                register={register("address")}
                errors={errors.address}
                name="address"
              />
            </div>
            <div className="flex flex-col gap-2 w-full pt-4">
              <CIconInput
                label={"Nomor Telepon Employee"}
                leftIcon={<FaPhone className="w-4 h-4 cursor-pointer" />}
                type="text"
                placeholder="Enter phone number"
                register={register("phone_number")}
                errors={errors.phone_number}
                name="phone_number"
              />
            </div>
            {type === "create" && (
              <>
                <div className="flex flex-col gap-2 w-full pt-4">
                  <CIconInput
                    label={"Password"}
                    leftIcon={<FaLock className="w-4 h-4 cursor-pointer" />}
                    type="password"
                    placeholder="Enter Password"
                    register={register("password")}
                    errors={errors.password}
                    name="password"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full pt-4">
                  <CIconInput
                    label={"Password Confirmation"}
                    leftIcon={<FaLock className="w-4 h-4 cursor-pointer" />}
                    type="password"
                    placeholder="Enter Password Confirmation"
                    register={register("password_confirmation")}
                    errors={errors.password_confirmation}
                    name="password_confirmation"
                  />
                </div>
              </>
            )}
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
