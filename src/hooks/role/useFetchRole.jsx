import { useState, useEffect } from "react";
import { getAllRole } from "../../api/admin/role";

const useRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const rolesData = await getAllRole();
      setRoles(rolesData.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return { roles, loading, error };
};

export default useRoles;
