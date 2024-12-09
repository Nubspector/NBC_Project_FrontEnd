import React, { useState } from "react";
import TableLayout from "../../../layout/table";
import { HeaderListTransaction } from "../../../data/table/listPatient";
import useFetchAntrianDoctor from "../../../hooks/transaction/doctor/useFetchAntrianDoctor";
import useFetchConsultationById from "../../../hooks/transaction/doctor/useFetchConsultationDetial";
import ConsultationDetailsModal from "../../../components/modal/consultation/consultation-detail";
import UpsertConsultation from "../../../components/modal/consultation/UpsertConsultation";
import SuccessModal from "../../../components/modal/consultation/SuccessModal";
import useConsultationForm from "../../../hooks/transaction/doctor/useConsultationForm";

const ListPasienPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { consultationDetails, loading: detailsLoading } =
    useFetchConsultationById(selectedId);
  const { antrianDoctor, error, loading, pagination, handleSearch, refetch } =
    useFetchAntrianDoctor(currentPage);


  const handleInput = (consultationId) => {
    setIsEditMode(false);
    setSelectedId(consultationId);
    setIsModalOpen(true);
  };

  const closeModal = (isRefecth) => {
    setIsModalOpen(false);
    setSelectedId(null);
    if (isRefecth) {
      refetch();
    }
  };

  const handleSuccess = (id) => {
    setSelectedId(id);
    setIsSuccessModalOpen(true);
  };

  const confirmSuccess = () => {
    setIsSuccessModalOpen(false);
  };

  const handleEdit = (id) => {
    setIsEditMode(true);
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleView = (id) => {
    setSelectedId(id);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedId(null);
  };

  const params = {
    page: currentPage,
    limit: pagination.per_page,
    total: pagination.total,
    setPage: setCurrentPage,
  };

  return (
    <div>
      <TableLayout
        headerTable={() =>
          HeaderListTransaction(
            handleView,
            handleInput,
            handleEdit,
            handleSuccess
          )
        }
        handleEdit={handleEdit}
        data={antrianDoctor}
        loading={loading}
        params={params}
        onSearch={handleSearch}
        modal={
          <UpsertConsultation
            isOpen={isModalOpen}
            type={isEditMode ? "edit" : "create"}
            handler={closeModal}
            id={selectedId}
          />
        }
      />
      <ConsultationDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        data={consultationDetails}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onConfirm={() => confirmSuccess(selectedId)}
        consultationId={selectedId}
      />
    </div>
  );
};

export default ListPasienPage;
