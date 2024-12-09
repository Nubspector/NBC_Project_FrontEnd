import React from "react";
import { getImage } from "../../../api";

const formatToRupiah = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
};

export default function TreatmentDetails({
  transaction_treatment = [],
  selectedPromo,
}) {
  return (
    <div className="space-y-4 border-t pt-4 mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Treatment Details
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {transaction_treatment.map((treatmentData) => {
          const originalPrice = parseFloat(treatmentData.treatment?.price || 0);
          const isDiscounted =
            selectedPromo &&
            selectedPromo.treatment_id === treatmentData.treatment?.id;
          const discountAmount = isDiscounted
            ? (originalPrice * selectedPromo.discount) / 100
            : 0;
          const finalPrice = originalPrice - discountAmount;

          return (
            <div
              key={treatmentData.id}
              className="relative flex bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              {isDiscounted && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded">
                  Discount Applied
                </span>
              )}
              <div className="w-1/3">
                <img
                  src={getImage(treatmentData.treatment?.image)}
                  alt={treatmentData.treatment?.name || "Treatment Image"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="w-2/3 p-3 space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-base font-semibold text-gray-900">
                    {treatmentData.treatment?.name || "Treatment Name"}
                  </h4>
                  <span className="bg-blue-500 text-white text-xs font-semibold py-0.5 px-1 rounded">
                    {treatmentData.treatment?.type || "Type not specified"}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  {treatmentData.treatment?.description ||
                    "No description available."}
                </p>
                <div className="flex justify-between text-sm text-gray-600">
                  <p className="font-semibold">Original Price:</p>
                  <p>{formatToRupiah(originalPrice)}</p>
                </div>
                {isDiscounted && (
                  <div className="flex justify-between text-sm text-red-500">
                    <p className="font-semibold">Discount:</p>
                    <p>-{formatToRupiah(discountAmount)}</p>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-600">
                  <p className="font-semibold">Final Price:</p>
                  <p className="text-blue-600 font-bold">
                    {formatToRupiah(finalPrice)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <img
                    src={getImage(treatmentData.employee?.image)}
                    alt={treatmentData.employee?.name || "Beautician Image"}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="text-xs">
                    <p className="font-medium text-gray-700">
                      Beautician: {treatmentData.employee?.name || "N/A"}
                    </p>
                    <p className="text-gray-500">
                      Room: {treatmentData.room_id || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
