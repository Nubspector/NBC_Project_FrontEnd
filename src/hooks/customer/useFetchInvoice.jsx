import { useState, useEffect } from "react";
import { getInvoice } from "../../api/admin/transaction";
import { toast } from "react-toastify";

const useFetchInvoice = (id) => {
  console.log("id", id);  
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      if (!id) return;
      setLoading(true);
      try {
        console.log("id", id);
        const data = await getInvoice(id);
        setInvoice(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  return { invoice, loading };
};

export default useFetchInvoice;
