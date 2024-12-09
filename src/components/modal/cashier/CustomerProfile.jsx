import {
  FaCheckCircle,
  FaDollarSign,
  FaPercentage,
  FaUser,
} from "react-icons/fa";
import { getImage } from "../../../api";

const formatToRupiah = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
};

const CustomerProfile = ({
  customer,
  status,
  total_amount,
  finalAmount,
  pointsInput,
  promo_discount,
  points_earned,
}) => (
  <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow-lg p-6 space-y-4 flex-shrink-0 md:w-1/3">
    <div className="flex flex-col items-center space-x-4 mb-4">
      <div className="bg-gray-100 rounded-full p-3">
        {customer?.image ? (
          <img
            src={getImage(customer?.image)}
            alt="Customer"
            className="h-40 w-h-40 object-cover rounded-full"
          />
        ) : (
          <FaUser className="text-gray-500 text-3xl" />
        )}
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          {customer?.name || "Customer Name"}
        </h2>
        <p className="text-sm text-gray-500">
          Status: {status || "Status not available"}
        </p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 text-gray-700">
      <div className="flex items-center space-x-2">
        <FaCheckCircle className="text-blue-500" />
        <div>
          <p className="text-sm font-medium text-gray-900">Points Customer</p>
          <p>{customer?.points || 0}</p>
        </div>
      </div>
    </div>
  </div>
);

export default CustomerProfile;
