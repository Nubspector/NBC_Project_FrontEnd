import { useState, useEffect } from "react";
import { getAllSelectEmployee } from "../../api/admin/employee";

const useEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState({
    total: 0,
    per_page: 100,
    current_page: 1,
    last_page: 1,
  });

  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const params = {
        page: page.total,
        limit: page.per_page,
        total: page.current_page,
        set_page: page.last_page,
      };

      const response = await getAllSelectEmployee(params);
      const { data, total, per_page, current_page, last_page } = response;

      setEmployees(data);
      setPage({ total, per_page, current_page, last_page });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  return { employees, loading, error, page, setPage };
};

export default useEmployee;
