import { useState, useEffect } from "react";
import { getAllSelectRoom } from "../../api/admin/select";

const useFetchRoom = () => {
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllRoom = async () => {
    try {
      const roomData = await getAllSelectRoom();
      setRoom(roomData.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRoom();
  }, []);

  return { room, loading, error };
};

export default useFetchRoom;
