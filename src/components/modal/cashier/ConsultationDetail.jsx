import { getImage } from "../../../api";

const ConsultationDetails = ({ consultation }) => (
  <div className="flex-grow bg-white border border-gray-200 rounded-lg shadow-lg p-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">
      Consultation Details
    </h3>
    {consultation.length > 0 ? (
      <div className="grid grid-cols-1 gap-4">
        {consultation.map((consult) => (
          <div
            key={consult.id}
            className="flex items-center bg-white border border-gray-100 rounded-lg shadow-md p-4"
          >
            <div className="w-1/4 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={getImage(consult.employee?.image)}
                alt="Doctor"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="w-3/4 pl-4">
              <h4 className="text-md font-bold text-gray-900">
                {consult.employee?.name || "Doctor Name"}
              </h4>
              <p className="text-xs font-medium text-gray-600 mb-2">
                Room ID: {consult.room_id || "Not specified"}
              </p>
              <p className="text-xs text-gray-600 mb-2">
                {consult.treatment_recommendation ||
                  "No treatment recommendation"}
              </p>
              <p className="text-xs text-gray-600 mb-4">
                {consult.product_recommendation || "No product recommendation"}
              </p>
              <div className="flex justify-between text-xs text-gray-500">
                <div>
                  <p className="font-medium">Status:</p>
                  <p>{consult.status || "Status not available"}</p>
                </div>
                <div>
                  <p className="font-medium">Consultation Date:</p>
                  <p>{consult.consultation_date || "Date not specified"}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-600">No consultation details available.</p>
    )}
  </div>
);

export default ConsultationDetails;
