import React, { useEffect } from "react";
import { Button, Modal } from "react-daisyui";
import { FaDownload } from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import useCustomer from "../../hooks/customer/useCustomerForm";
import CustomerCardPDF from "../pdf/IDCard";
import { NBC } from "../../../public/img";

const CardModal = ({ isOpen, onClose, id }) => {
  const { selectedCustomer } = useCustomer("view", id, "view");


  return (
    <Modal
      open={isOpen}
      backdrop={false}
      className="flex flex-col justify-center items-center bg-white p-10 rounded-3xl space-y-5"
    >
      <Modal.Body className="text-center text-sm font-medium">
        <div>
          <p className="text-start mb-5 text-2xl font-bold">Customer ID Card</p>
          <div className="mx-16 border p-6 rounded-xl border-gray-500">
            <div className="flex flex-col items-center mb-4">
              <div className="flex items-center space-x-5">
                <img src={NBC} alt="Logo NBC" className="w-20" />
                <div className="flex flex-col">
                  <div className="text-pink-600 text-4xl font-bold mb-2">
                    Natural Beauty Center
                  </div>
                  <p className="text-sm text-center text-gray-500">
                    Jl. Babarsari No. 43 Yogyakarta 55281
                  </p>
                  <p className="text-sm text-center text-gray-500">
                    Telp. (0274) 487711
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center text-3xl font-black tracking-widest mb-4">
              {selectedCustomer?.card_id}
            </div>

            <div className="flex justify-between text-start text-sm text-gray-500 mb-4">
              <div>
                <p className="font-medium text-black">Card Holder Since</p>
                <p className="font-normal text-black text-xs">Month / Year</p>
                <p className="font-medium text-black">
                  {selectedCustomer?.month_register} /{" "}
                  {selectedCustomer?.year_register}
                </p>
              </div>
            </div>

            <div className="font-black text-start text-3xl uppercase mb-4">
              {selectedCustomer?.name}
            </div>
            <p className="text-xs text-end text-black">
              Your NBC Card has no expiration date
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Actions className="flex w-full flex-row justify-center items-center">
        <PDFDownloadLink
          document={<CustomerCardPDF customer={selectedCustomer} />}
          fileName="Customer_ID_Card.pdf"
          className="bg-pink-500 flex items-center text-white hover:bg-pink-900 hover:border-pink-700 mr-2 rounded-full px-4 py-2"
        >
          {({ loading }) => (
            <>
              <FaDownload className="mr-3" />
              {loading ? "Loading PDF..." : "Download"}
            </>
          )}
        </PDFDownloadLink>
        <Button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 rounded-full px-4 py-2"
        >
          Back
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CardModal;
