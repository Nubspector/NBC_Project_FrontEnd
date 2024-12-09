import { useState, useEffect } from "react";
import { getRiwayatKonsultasiCustomerById } from "../../../api/admin/transaction";

const useFetchConsultationById = (id) => {
  const [consultationDetails, setConsultationDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchConsultation = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getRiwayatKonsultasiCustomerById(id);
      console.log(data);
      setConsultationDetails(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultation();
  }, [id]);

  return { consultationDetails, loading, error };
};

export default useFetchConsultationById;
