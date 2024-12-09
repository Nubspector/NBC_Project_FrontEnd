import { useState, useEffect } from "react";
import { getAllCustomer } from "../../api/admin/customer";

const useFetchCustomers = (page) => {
  const [customer, setCustomer] = useState([]);
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

  const fetchCustomer = async () => {
    setLoading(true);
    try {
      const response = await getAllCustomer(page, searchParams);
      const { data, total, per_page, current_page, last_page } = response;
      console.log(data)
      setCustomer(data);
      setPagination({ total, per_page, current_page, last_page });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchCustomer();
  };

  useEffect(() => {
    fetchCustomer();
  }, [page, searchParams]);

  return { customer, loading, pagination, handleSearch, refetch };
};

export default useFetchCustomers;
