import { useState } from "react";
import { HeaderTreatment } from "../../../data/table/treatment";
import useFetchTreatments from "../../../hooks/treatment/useFetchTreatment";
import TableLayout from "../../../layout/table";
import useTreatments from "../../../hooks/treatment/useTreatmentForm";
import DeletePopUp from "../../../components/modal/Delete";
import UpsertModalTreatment from "../../../components/modal/treatment/UpsertModalTreatment";

const TreatmentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { treatments, handleSearch, loading, pagination, refetch } = useFetchTreatments(currentPage);
  const [selectedId, setSelectedId] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const {handleDeleteTreatment, success, fetchTreatmentById } = useTreatments();

  const params = {
    page: currentPage,
    limit: pagination.per_page,
    total: pagination.total,
    setPage: setCurrentPage,
  };
  

  const handleCreate = () => {
    setIsEditMode(false);
    setIsModalOpen(true);
    setSelectedId(null);
  };

  const closeModal = (isRefecth) => {
    setIsModalOpen(false);
    setSelectedId(null);
    if (isRefecth) {
      refetch();
    }
  };
  
  const handleDeletePopUp = (id) => {
    setSelectedId(id);
    setIsDeletePopupOpen(!isDeletePopupOpen);
  };

  const handleDeleteTreatmentModal = (id) => {
    handleDeleteTreatment(id);
    setIsDeletePopupOpen(false);
    refetch();
  };

  const handleEdit = async (id) => {
    setIsEditMode(true);
    setSelectedId(id);
    setIsModalOpen(true);
    await fetchTreatmentById(id);
  };

  return (
    <div>
      <TableLayout
        headerTable={HeaderTreatment}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        data={treatments}
        params={params}
        loading={loading}
        onSearch={handleSearch}
        remove={{
          isOpen: isDeletePopupOpen,
          handler: handleDeletePopUp,
        }}
        modal={
          <UpsertModalTreatment
            isOpen={isModalOpen}
            type={isEditMode ? "edit" : "create"}
            handler={closeModal}
            id={selectedId}
          />
        }
      />

      <DeletePopUp
        isOpen={isDeletePopupOpen}
        data="Treatment"
        onClose={() => setIsDeletePopupOpen(false)}
        onEdit={() => handleDeleteTreatmentModal(selectedId)}
        menu="Treatment"
      />
    </div>
  );
}

export default TreatmentPage;
