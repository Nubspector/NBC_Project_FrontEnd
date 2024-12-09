import { useState, useEffect } from "react";
import { getAllPromo } from "../../api/admin/promo";

const useFetchPromos = (page) => {
    const [promos, setPromos] = useState([]);
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

    const fetchPromos = async () => {
        setLoading(true);
        try {
            const response = await getAllPromo(page, searchParams);
            const { data, total, per_page, current_page, last_page } = response;
            setPromos(data);
            setPagination({ total, per_page, current_page, last_page });
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const refetch = () => {
        fetchPromos();
    };

    useEffect(() => {
        fetchPromos();
    }, [page, searchParams]);
    
    return { promos, loading, pagination, handleSearch, refetch };
};

export default useFetchPromos;
