import { useState, useEffect } from "react";
import { getAllRiwayatTransaksi } from "../../api/admin/transaction";

const useFetchTransaction = (page) => {
  const [riwayatTransaksi, setRiwayatTransaksi] = useState([]);
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

  const fetchRiwayatTransaction = async () => {
    setLoading(true);
    try {
      const response = await getAllRiwayatTransaksi(page, searchParams);
      const { data, total, per_page, current_page, last_page } = response;
      console.log(data);
      setRiwayatTransaksi(data);
      setPagination({ total, per_page, current_page, last_page });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchRiwayatTransaction();
  };

  useEffect(() => {
    fetchRiwayatTransaction();
  }, [page, searchParams]);

  return { riwayatTransaksi, loading, pagination, handleSearch, refetch };
};

export default useFetchTransaction;
