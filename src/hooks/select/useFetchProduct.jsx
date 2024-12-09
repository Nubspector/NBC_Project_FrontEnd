import { useState, useEffect } from "react";
import { getAllSelectProduct } from "../../api/admin/select";

const useFetchProduct = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllTreatment = async () => {
    try {
      const productData = await getAllSelectProduct();
      setProduct(productData.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTreatment();
  }, []);

  return { product, loading, error };
};

export default useFetchProduct;
