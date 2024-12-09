import { useState } from "react";
import { finishConsultation } from "../../../api/admin/transaction";

const useFinishConsultation = () => {
  const [loading, setLoading] = useState(false);

  const completeConsultation = async (id) => {
    setLoading(true);
    try {
      await finishConsultation(id);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return { completeConsultation, loading };
};

export default useFinishConsultation;
