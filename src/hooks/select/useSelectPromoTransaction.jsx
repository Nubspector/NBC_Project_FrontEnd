import { useState, useEffect } from "react";
import { getAllSelectPromoTransaction } from "../../api/admin/select";

const useFetchPromoTransaction = (transactionId) => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPromoTransaction = async () => {
    try {
      const promoData = await getAllSelectPromoTransaction(transactionId);
      console.log("Fetched promo data", promoData);
      setPromos(promoData.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (transactionId) {
      fetchPromoTransaction();
    }
  }, [transactionId]);

  return { promos, loading, error };
};

export default useFetchPromoTransaction;
