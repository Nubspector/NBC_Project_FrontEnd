import React from "react";
import { Modal, Button } from "react-daisyui";
import useFinishConsultation from "../../../hooks/transaction/doctor/useSuccessConsultation";

const SuccessModal = ({ isOpen, onClose, consultationId }) => {
  const { completeConsultation, loading } = useFinishConsultation();

  const handleConfirm = async () => {
    await completeConsultation(consultationId);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className="bg-white rounded-lg shadow-lg p-8"
    >
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Is this data correct?</h2>
        <p>Please confirm if the details entered are correct.</p>
        <div className="flex justify-center space-x-4 mt-6">
          <Button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {loading ? "Processing..." : "Confirm"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
