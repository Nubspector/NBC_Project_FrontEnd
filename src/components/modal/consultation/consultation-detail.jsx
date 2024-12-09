import React from "react";
import { Modal } from "react-daisyui";

export default function ConsultationDetailsModal({ isOpen, onClose, data }) {
  if (!data || data.length === 0) return null;

  const getStatusChipStyle = (status) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Menunggu Konfirmasi":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className="bg-white rounded-lg shadow-xl w-full mx-auto p-8 overflow-y-auto max-h-[80vh] max-w-[1000px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
    >
      <Modal.Header>
        <div className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">
          Consultation Details
        </div>
      </Modal.Header>

      <div className="space-y-6 text-gray-700">
        {data.map((consultation, index) => (
          <div key={consultation.id} className="space-y-2 border-b pb-4">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-gray-900">
                Consultation {index + 1}
              </strong>
              <span className="text-sm text-gray-500">
                ID: {consultation.id}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <p>
                <strong className="text-gray-900">Doctor ID:</strong>{" "}
                {consultation.doctor_id}
              </p>
              <p>
                <strong className="text-gray-900">Room ID:</strong>{" "}
                {consultation.room_id}
              </p>
              <p>
                <strong className="text-gray-900">Consultation Date:</strong>{" "}
                {consultation.consultation_date}
              </p>
              <p className="flex items-center gap-2">
                <strong className="text-gray-900">Status:</strong>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusChipStyle(
                    consultation.status
                  )}`}
                >
                  {consultation.status}
                </span>
              </p>
              <p>
                <strong className="text-gray-900">Description:</strong>{" "}
                {consultation.description || "tidak ada catatan"}
              </p>
            </div>

            {/* Transaction Treatments */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Transaction Treatments
              </h3>
              {consultation.transaction.transaction_treatment.length > 0 ? (
                <div className="space-y-2">
                  {consultation.transaction.transaction_treatment.map(
                    (treatment) => (
                      <div key={treatment.id} className="border p-2 rounded-md">
                        <p>
                          <strong className="text-gray-900">Treatment ID:</strong>{" "}
                          {treatment.treatment_id}
                        </p>
                        <p>
                          <strong className="text-gray-900">Treatment Date:</strong>{" "}
                          {treatment.treatment_date}
                        </p>
                        <p>
                          <strong className="text-gray-900">Price:</strong> Rp{" "}
                          {treatment.price}
                        </p>
                        <p>
                          <strong className="text-gray-900">Room ID:</strong>{" "}
                          {treatment.room_id}
                        </p>
                        <p>
                          <strong className="text-gray-900">Beautician ID:</strong>{" "}
                          {treatment.beautician_id}
                        </p>
                        <p>
                          <strong className="text-gray-900">Treatment Name:</strong>{" "}
                          {treatment.treatment?.name || "N/A"}
                        </p>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="text-gray-500">No treatments available</p>
              )}
            </div>

            {/* Transaction Products */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Transaction Products
              </h3>
              {consultation.transaction.transaction_product.length > 0 ? (
                <div className="space-y-2">
                  {consultation.transaction.transaction_product.map((product) => (
                    <div key={product.id} className="border p-2 rounded-md">
                      <p>
                        <strong className="text-gray-900">Product ID:</strong>{" "}
                        {product.product_id}
                      </p>
                      <p>
                        <strong className="text-gray-900">Quantity:</strong>{" "}
                        {product.quantity}
                      </p>
                      <p>
                        <strong className="text-gray-900">Total Price:</strong> Rp{" "}
                        {product.total}
                      </p>
                      <p>
                        <strong className="text-gray-900">Product Name:</strong>{" "}
                        {product.product?.name || "N/A"}
                      </p>
                      <p>
                        <strong className="text-gray-900">Description:</strong>{" "}
                        {product.product?.description || "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No products available</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-pink-500 text-white font-semibold rounded-md shadow hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
