import { useState, useEffect } from "react";
import { getAllSelectDoctor } from "../../api/admin/select";

const useFetchDoctor = () => {
  const [doctor, setDoctor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllDoctor = async () => {
    try {
      const doctorData = await getAllSelectDoctor();
      console.log("ini doctor data", doctorData);
      setDoctor(doctorData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDoctor();
  }, []);

  return { doctor, loading, error };
};

export default useFetchDoctor;
