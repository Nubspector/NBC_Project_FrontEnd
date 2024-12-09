import { useState, useEffect } from "react";
import { getAllTreatment } from "../../api/admin/treatment";

const useFetchTreatments = (page) => {
    const [treatments, setTreatments] = useState([]);
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

    const fetchTreatments = async () => {
        setLoading(true);
        try {
            const response = await getAllTreatment(page, searchParams);
            const { data, total, per_page, current_page, last_page } = response;
            setTreatments(data);
            setPagination({ total, per_page, current_page, last_page });
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const refetch = () => {
        fetchTreatments();
    };

    useEffect(() => {
        fetchTreatments();
    }, [page, searchParams]);
    
    return { treatments, loading, pagination, handleSearch, refetch };
};

export default useFetchTreatments;
