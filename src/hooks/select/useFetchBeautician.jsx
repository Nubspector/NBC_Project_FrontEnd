import { useState, useEffect } from "react";
import { getAllSelectBeautician } from "../../api/admin/select";

const useFetchBeautician = () => {
  const [beautician, setBeautician] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllBeautician = async () => {
    try {
      const beauticianData = await getAllSelectBeautician();
      setBeautician(beauticianData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBeautician();
  }, []);

  return { beautician, loading, error };
};

export default useFetchBeautician;
