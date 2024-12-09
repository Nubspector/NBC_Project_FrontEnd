import { useState, useEffect } from "react";
import { getAllShift, getAllShiftEmployee } from "../../api/admin/shift";

const useShift = () => {
  const [shift, setShift] = useState([]);
  const [shiftEmployee, setShiftEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [id, setId] = useState();

  const fetchShift = async () => {
    setLoading(true);
    getAllShift()
      .then((res) => {
        setShift(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchShiftEmployee = async (id) => {
    console.log(id);
    setLoading(true);
    getAllShiftEmployee(id)
      .then((res) => {
        setShiftEmployee(Array.isArray(res.original) ? res.original : []);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchShiftEmployee(id);
  }, []);

  return {
    shift,
    loading,
    error,
    setId,
    shiftEmployee,
    fetchShiftEmployee,
    setShiftEmployee,
  };
};

export default useShift;
