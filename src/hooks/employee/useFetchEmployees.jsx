import { useState, useEffect } from "react";
import { getAllEmployee } from "../../api/admin/employee";

const useFetchEmployees = (page) => {
  const [employees, setEmployees] = useState([]);
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

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await getAllEmployee(page, searchParams);
      const { data, total, per_page, current_page, last_page } = response;
      setEmployees(data);
      setPagination({ total, per_page, current_page, last_page });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();
  }, [page, searchParams]);

  return { employees, loading, pagination, handleSearch, refetch };
};

export default useFetchEmployees;
