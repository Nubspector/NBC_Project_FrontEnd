import { useState, useEffect } from "react";
import { getAllRoom } from "../../api/admin/room";


const useFetchRooms = (page) => {
    const [rooms, setRooms] = useState([]);
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

    const fetchRooms = async () => {
        setLoading(true);
        try {
            const response = await getAllRoom(page, searchParams);
            const { data, total, per_page, current_page, last_page } = response;
            setRooms(data);
            setPagination({ total, per_page, current_page, last_page });
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const refetch = () => {
        fetchRooms();
    };

    useEffect(() => {
        fetchRooms();
    }, [page, searchParams]);
    
    return { rooms, loading, pagination, handleSearch, refetch };
};

export default useFetchRooms;
