import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  fetchTransactionDoctorById,
  createTransactionByDoctor,
} from "../../../api/admin/transaction";
import { toast } from "react-toastify";

const useConsultationForm = (id, type, onSuccess) => {
  console.log("id", id);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({ control, name: "products" });

  const {
    fields: treatmentFields,
    append: appendTreatment,
    remove: removeTreatment,
  } = useFieldArray({ control, name: "treatments" });

  useEffect(() => {
    if (type === "edit" && id) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const result = await fetchTransactionDoctorById(id);
          setData(result);
          reset({
            description: result.description || "",
            products: result.transaction.transaction_product?.map((p) => ({
              id: p.product_id,
              quantity: p.quantity,
            })) || [{ id: "", quantity: 1 }],
            treatments: result.transaction.transaction_treatment?.map((t) => ({
              treatment_id: t.treatment_id,
            })) || [{ treatment_id: "" }],
            room_id:
              result.transaction.transaction_treatment?.[0]?.room_id ||
              result.room?.id ||
              "",
            beautician_id:
              result.transaction.transaction_treatment?.[0]?.beautician_id ||
              "",
          });
        } catch (error) {
          toast.error("Failed to fetch consultation data.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else if (type === "create") {
      reset({
        description: "",
        products: [{ id: "", quantity: 1 }],
        treatments: [{ treatment_id: "" }],
        room_id: "",
        beautician_id: "",
      });
    }
  }, [id, type, reset]);

  const onSubmit = async (formData) => {
    console.log("form data", formData);
    const formattedData = {
      description: formData.description,
      ...(formData.products?.length &&
        formData.products[0].id && {
          products: formData.products
            .filter((p) => p.id && p.quantity)
            .map((p) => ({ id: p.id, jumlah: p.quantity })),
        }),
      ...(formData.treatments?.length &&
        formData.treatments[0].treatment_id && {
          treatment_ids: formData.treatments
            .filter((t) => t.treatment_id)
            .map((t) => t.treatment_id),
        }),
      ...(formData.room_id && { room_id: formData.room_id }),
      ...(formData.beautician_id && { beautician_id: formData.beautician_id }),
    };

    console.log("formatted data", formattedData);

    setLoading(true);
    try {
      await createTransactionByDoctor(formattedData, id);
      if (onSuccess) onSuccess();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    productFields,
    appendProduct,
    removeProduct,
    treatmentFields,
    appendTreatment,
    removeTreatment,
  };
};

export default useConsultationForm;
