import { useState, useEffect } from "react";
import { getAllSelectTreatment } from "../../api/admin/select";

const useFetchTreatment = () => {
  const [treatment, setTreatment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllTreatment = async () => {
    try {
      const treatmentData = await getAllSelectTreatment();
      setTreatment(treatmentData.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTreatment();
  }, []);

  return { treatment, loading, error };
};

export default useFetchTreatment;
