import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/slices/authSlice";

const loginSchema = Yup.object({
  username: Yup.string().required("Username wajib diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password wajib diisi"),
});

const useLoginValidation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      localStorage.setItem("token", result.token);
      if (
        result.data.role_id === 1 ||
        result.data.role_id === 2 ||
        result.data.role_id === 3 ||
        result.data.role_id === 4 ||
        result.data.role_id === 5 ||
        result.data.role_id === 6
      ) {
        navigate("/dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return { register, handleSubmit, errors, onSubmit, loading, error };
};

export default useLoginValidation;
