import React from "react";

export default function PromoSelector({ promos, selectedPromo, onChange }) {
  return (
    <div className="mt-8 bg-white border p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Promo Discount
      </h3>
      <select
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
      >
        <option value="">Select Promo</option>
        {promos.map((promo, index) => (
          <option
            key={`${promo.promo_id}-${promo.treatment?.id || "none"}-${index}`}
            value={`${promo.promo_id}-${promo.treatment?.id || ""}`}
          >
            {promo.name} - {promo.discount}%
          </option>
        ))}
      </select>
    </div>
  );
}
