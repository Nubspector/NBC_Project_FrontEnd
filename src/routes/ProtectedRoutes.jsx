import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!token && !storedToken) {
      toast.error("Anda tidak mempunyai akses ke halaman ini");
      navigate("/login");
    }
  }, [navigate, token]);


  useEffect(() => {
    if (allowedRoles && role && !allowedRoles.includes(role)) {
      toast.error("Anda tidak mempunyai akses ke halaman ini");
      navigate("/login");
    }
  }, [navigate, role, allowedRoles]);

  return token ? (children ? children : <Outlet />) : null;
};

export default ProtectedRoutes;
