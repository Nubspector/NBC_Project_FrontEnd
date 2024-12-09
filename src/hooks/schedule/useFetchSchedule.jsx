import { useState, useEffect } from "react";
import { getAllSchedule } from "../../api/admin/schedule";

const useFetchSchedules = (page) => {
    const [schedules, setSchedules] = useState([]);
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

    const fetchSchedules = async () => {
        setLoading(true);
        try {
            const response = await getAllSchedule(page, searchParams);
            const { data, total, per_page, current_page, last_page } = response;
            setSchedules(data);
            setPagination({ total, per_page, current_page, last_page });
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const refetch = () => {
        fetchSchedules();
    };

    useEffect(() => {
        fetchSchedules();
    }, [page, searchParams]);
    
    return { schedules, loading, pagination, handleSearch, refetch };
};

export default useFetchSchedules;
