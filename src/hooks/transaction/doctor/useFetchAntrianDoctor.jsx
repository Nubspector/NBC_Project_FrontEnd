import { useState, useEffect } from "react";
import { getAllListAntrianDoctor } from "../../../api/admin/transaction";

const useFetchAntrianDoctor = (page) => {
  const [antrianDoctor, setAntrianDoctor] = useState([]);
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

  const fetchAllAntrianDoctor = async () => {
    setLoading(true);
    try {
      const response = await getAllListAntrianDoctor(page, searchParams);
      const { data, total, per_page, current_page, last_page } = response;
      setAntrianDoctor(data);
      setPagination({ total, per_page, current_page, last_page });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchAllAntrianDoctor();
  };

  useEffect(() => {
    fetchAllAntrianDoctor();
  }, [page, searchParams]);

  return { antrianDoctor, loading, pagination, handleSearch, refetch, error };
};

export default useFetchAntrianDoctor;
