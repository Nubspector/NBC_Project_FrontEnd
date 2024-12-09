import { useState, useEffect } from "react";
import { getAllProduct } from "../../api/admin/product";

const useFetchProducts = (page) => {
    const [products, setProducts] = useState([]);
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

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await getAllProduct(page, searchParams);
            const { data, total, per_page, current_page, last_page } = response;
            setProducts(data);
            setPagination({ total, per_page, current_page, last_page });
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const refetch = () => {
        fetchProducts();
    };

    useEffect(() => {
        fetchProducts();
    }, [page, searchParams]);
    
    return { products, loading, pagination, handleSearch, refetch };
};

export default useFetchProducts;
