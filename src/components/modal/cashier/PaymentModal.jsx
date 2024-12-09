import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-daisyui";
import { useForm, FormProvider } from "react-hook-form";
import CustomerProfile from "./CustomerProfile";
import ConsultationDetails from "./ConsultationDetail";
import TransactionProducts from "./TransactionDetail";
import TreatmentDetails from "./TreatmentsDetail";
import useFetchPromoTransaction from "../../../hooks/select/useSelectPromoTransaction";
import { transactionPayment } from "../../../api/admin/transaction";
import useDeepCompareEffect from "./helper/useDeepCompareEffect";
import formatToRupiah from "./helper/formatToRupiah";
import {
  calculateFinalAmount,
  calculateProductTotal,
  calculatePromoDiscount,
  calculateTreatmentTotal,
} from "./calculations";
import PromoSelector from "./PromoSelector";
import { toast } from "react-toastify";

export default function CustomerDetailsModal({ isOpen, onClose, data }) {
  if (!data) return null;

  const {
    customer,
    status,
    total_amount = 0,
    points_earned = 0,
    consultation = [],
    transaction_product = [],
    transaction_treatment = [],
    points_used = 0,
  } = data;

  const methods = useForm({
    defaultValues: { products: transaction_product },
  });
  const { handleSubmit } = methods;

  const [pointsInput, setPointsInput] = useState(points_used || 0);
  const { promos } = useFetchPromoTransaction(data.id);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useDeepCompareEffect(() => {
    setDisplayProducts(transaction_product);
  }, [transaction_product]);

  const handlePromoChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setSelectedPromo(null);
      return;
    }

    const [promoId, treatmentId] = value
      .split("-")
      .map((id) => parseInt(id, 10));
    const selectedPromoObj = promos.find(
      (promo) =>
        promo.promo_id === promoId &&
        (promo.treatment?.id === treatmentId || !treatmentId)
    );

    if (selectedPromoObj) {
      setSelectedPromo({
        promo_id: selectedPromoObj.promo_id,
        discount: selectedPromoObj.discount,
        treatment_id: selectedPromoObj.treatment?.id || null,
      });
    }
  };

  const handleProductChange = (updatedProducts) => {
    setDisplayProducts(updatedProducts);
    
    methods.setValue("products", updatedProducts);
  };

  const productTotal = calculateProductTotal(displayProducts);
  const treatmentTotal = calculateTreatmentTotal(transaction_treatment);
  const promoDiscount = calculatePromoDiscount(
    selectedPromo,
    transaction_treatment,
    productTotal,
    treatmentTotal
  );
  const finalAmount = calculateFinalAmount(
    productTotal,
    treatmentTotal,
    pointsInput,
    promoDiscount
  );

  const handleTransactionPayment = async (submissionData) => {
    setLoading(true);
    try {
      const result = await transactionPayment(submissionData, data.id);
      onClose();
    } catch (error) {
      throw new Error("Failed to process transaction payment");
      
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = () => {
    const submissionData = {
      promo: {
        promo_id: selectedPromo?.promo_id || "",
        treatment_id: selectedPromo?.treatment_id || "",
      },
      products: displayProducts.map((product) => ({
        id: product.product.id,
        jumlah: product.quantity || 1,
      })),
      total_amount_final: finalAmount,
    };
    handleTransactionPayment(submissionData);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className="bg-white w-3/4 rounded-lg shadow-2xl p-8 overflow-y-auto max-h-[80vh]"
    >
      <div className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">
        Customer Consultation & Payment Details
      </div>

      <div className="space-y-4 text-gray-700">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-gray-700">
              <CustomerProfile
                customer={customer}
                status={status}
                total_amount={total_amount}
                finalAmount={finalAmount}
                pointsInput={pointsInput}
                points_earned={points_earned}
              />
              <ConsultationDetails consultation={consultation} />
            </div>

            <TransactionProducts
              transaction_product={displayProducts}
              onProductChange={handleProductChange}
            />
            <TreatmentDetails
              transaction_treatment={transaction_treatment}
              selectedPromo={selectedPromo}
            />

            <PromoSelector
              promos={promos}
              selectedPromo={selectedPromo}
              onChange={handlePromoChange}
            />

            <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm text-right space-y-1">
              <p className="text-gray-800">
                <span className="font-semibold w-32 inline-block text-left">
                  Product Total:
                </span>{" "}
                {formatToRupiah(productTotal)}
              </p>
              <p className="text-gray-800">
                <span className="font-semibold w-32 inline-block text-left">
                  Treatment Total:
                </span>{" "}
                {formatToRupiah(treatmentTotal)}
              </p>
              <p className="text-gray-800">
                <span className="font-semibold w-32 inline-block text-left">
                  Subtotal:
                </span>{" "}
                {formatToRupiah(productTotal + treatmentTotal)}
              </p>
              {promoDiscount > 0 && (
                <p className="text-gray-800">
                  <span className="font-semibold w-32 inline-block text-left">
                    Promo Discount:
                  </span>{" "}
                  -{formatToRupiah(promoDiscount)}
                </p>
              )}
              <p className="text-lg font-semibold text-gray-900">
                <span className="font-semibold w-32 inline-block text-left">
                  Final Total:
                </span>{" "}
                {formatToRupiah(finalAmount)}
              </p>
            </div>

            <div className="flex justify-end gap-5 pt-6">
              <Button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-pink-500 text-white font-semibold rounded-md shadow hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              >
                {loading ? "Processing..." : "Submit"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
}
