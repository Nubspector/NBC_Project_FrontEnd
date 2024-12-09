import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    createTreatment,
    deleteTreatment,
    getTreatmentById,
    updateTreatment,
} from "../../api/admin/treatment";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../api";

const useTreatments = (type, id, refetch) => {
    const navigate = useNavigate();
    const [selectedTreatment, setSelectedTreatment] = useState(null);
    const [success, setSuccess] = useState(false);

    const createTreatmentSchema = yup.object().shape({
        name: yup.string().required("Nama treatment wajib diisi"),
        type: yup.string().required("Tipe wajib diisi"),
        description: yup.string().required("Deskripsi wajib diisi"),
        price: yup.string().required("Harga wajib diisi"),
        point_discount: yup.string().required("Poin wajib diisi"),
        image: yup
            .object()
            .shape({ file: yup.mixed().required("Image wajib diisi") }),
    });

    const updateTreatmentSchema = yup.object().shape({
        name: yup.string().notRequired(),
        type: yup.string().notRequired(),
        description: yup.string().notRequired(),
        price: yup.string().notRequired(),
        point_discount: yup.string().notRequired(),
        image: yup.object().shape({ file: yup.mixed().notRequired() }),
    });

    const treatmentSchema =
        type === "create" ? createTreatmentSchema : updateTreatmentSchema;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        watch,
    } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(treatmentSchema),
    });

    useEffect(() => {
        if (type === "edit" && id) {
            fetchTreatmentById(id);
        } else {
            reset({
                name: "",
                type: "",
                description: "",
                price: "",
                point_discount: "",
                image: "",
            });
        }
    }, [type, id, reset]);

    const handleCreateTreatment = async (data) => {
        try {
            const file = data.image.file[0];
            const formData = new FormData();
            formData.append("image", file);
            formData.append("name", data.name);
            formData.append("type", data.type);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("point_discount", data.point_discount);

            await createTreatment(formData);
            setSuccess(true);
            reset();
        } catch (error) {
            throw new Error(error);
        }
    };

    const handleEditTreatment = async (data, id) => {
        try {
            const formData = new FormData();
            if (data.image.file[0]) {
                formData.append("image", data.image.file[0]);
            }
            formData.append("name", data.name);
            formData.append("type", data.type);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("point_discount", data.point_discount);
            await updateTreatment(formData, id);
            setSuccess(true);
            reset();
        } catch (error) {
            throw new Error(error);
        }
    };

    const fetchTreatmentById = async (id) => {
        try {
            const response = await getTreatmentById(id);
            const image = await getImage(response.image);
            setSelectedTreatment({ ...response, image: { url: image } });
            reset({ ...response, image: { url: image } });
        } catch (error) {
            throw new Error(error);
        }
    };

    const handleTreatmentsForm = handleSubmit(async (data) => {
        if (type === "create") {
            await handleCreateTreatment(data);
        }
        else if (type === "edit" && id) {
            await handleEditTreatment(data, id);
        }
    });

    const handleDeleteTreatment = async (id) => {
        try {
            await deleteTreatment(id);
            setSuccess(true);
        } catch (error) { }
    };

    return {
        control,
        register,
        handleSubmit: handleTreatmentsForm,
        errors,
        selectedTreatment,
        fetchTreatmentById,
        handleDeleteTreatment,
        reset,
        watch,
        success,
    };
};

export default useTreatments;
