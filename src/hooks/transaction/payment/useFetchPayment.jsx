import { useState, useEffect } from "react";
import { getAllBelumBayar } from "../../../api/admin/transaction";

const useFetchAntrianBelumBayar = (page) => {
  const [belumBayar, setBelumBayar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  const [pagination, setPagination] = useState({
    total: 0,
    per_page: 10,
    current_page: 1,
    last_page: 1,
  });

  const handleSearch = (newSearchParams) => {
    setSearchParams(newSearchParams);
  };

  const fetchAntrianBelumBayar = async () => {
    setLoading(true);
    try {
      const response = await getAllBelumBayar(page, searchParams);
      const { data, total, per_page, current_page, last_page } = response;
      setBelumBayar(data);
      setPagination({ total, per_page, current_page, last_page });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchAntrianBelumBayar();
  };

  useEffect(() => {
    fetchAntrianBelumBayar();
  }, [page, searchParams]);

  return { belumBayar, loading, pagination, handleSearch, refetch, error };
};

export default useFetchAntrianBelumBayar;
