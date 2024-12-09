import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { createTransaction } from "../../api/admin/transaction";

const useTransaction = (type, customerId) => {
  const [success, setSuccess] = useState(false);

  const consultationSchema = yup.object().shape({
    doctor_id: yup.string().required("Doctor is required"),
    room_id: yup.string().required("Room is required"),
    consultation_date: yup
      .date()
      .typeError("Consultation date must be a valid date")
      .required("Consultation date is required"),
  });

  const nonConsultationSchema = yup.object().shape({
    treatment_ids: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.string().required("Treatment ID is required"),
        })
      )
      .min(1, "At least one treatment is required"),
    beautician_id: yup.string().required("Beautician is required"),
    room_id: yup.string().required("Room is required"),
    treatment_date: yup
      .date()
      .typeError("Treatment date must be a valid date")
      .required("Treatment date is required"),
  });

  const transactionSchema =
    type === "consultation" ? consultationSchema : nonConsultationSchema;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(transactionSchema),
  });

  const {
    fields: treatmentFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "treatment_ids",
  });


  const handleCreateTransaction = async (data) => {
    try {
      const formattedConsultationDate = data.consultation_date
        ? new Date(data.consultation_date)
            .toLocaleDateString("id-ID", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .split("/")
            .reverse()
            .join("-")
        : null;

      const formattedTreatmentDate = data.treatment_date
        ? new Date(data.treatment_date)
            .toLocaleDateString("id-ID", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .split("/")
            .reverse()
            .join("-")
        : null;

      const transactionData = {
        ...data,
        customer_id: customerId,
        ...(type === "consultation"
          ? { consultation_date: formattedConsultationDate }
          : {
              treatment_ids: data.treatment_ids.map(
                (treatment) => treatment.id
              ),
              beautician_id: data.beautician_id,
              room_id: data.room_id,
              treatment_date: formattedTreatmentDate,
            }),
      };

      await createTransaction(transactionData);
      setSuccess(true);
      reset();
    } catch (error) {
      console.error("Failed to create transaction:", error);
    }
  };


  const handleTransactionForm = handleSubmit((data) =>
    handleCreateTransaction(data)
  );

  return {
    register,
    handleSubmit: handleTransactionForm,
    errors,
    setValue,
    reset,
    success,
    setSuccess,
    getValues,
    control,
    treatmentFields,
    append,
    remove,
  };
};

export default useTransaction;
