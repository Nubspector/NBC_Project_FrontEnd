import { useState, useEffect } from "react";
import { getAllTransactionCustomerById } from "../../../api/admin/transaction";

const useFetchAntrianBelumBayarCustomerById = (id) => {
  const [belumBayarCustomerById, setAntrianBelumBayarCustomerById] = useState(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllAntrianBelumBayarCustomerById = async () => {
    setLoading(true);
    try {
      const antrianBelumBayar = await getAllTransactionCustomerById(id);
      console.log("ini antrian", antrianBelumBayar);
      setAntrianBelumBayarCustomerById(antrianBelumBayar);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchAllAntrianBelumBayarCustomerById();
  }, [id]);

  return { belumBayarCustomerById, loading, error };
};

export default useFetchAntrianBelumBayarCustomerById;
