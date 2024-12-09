import React, { useState } from "react";
import { HeaderPromo } from "../../../data/table/promo";
import useFetchPromo from "../../../hooks/promo/useFetchPromo";
import TableLayout from "../../../layout/table";
import usePromos from "../../../hooks/promo/usePromoForm";
import DeletePopUp from "../../../components/modal/Delete";
import UpsertModalPromo from "../../../components/modal/promo/UpsertModalPromo";

const TransactionPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { promos, handleSearch, loading, pagination, refetch } =
    useFetchPromo(currentPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const { handleDeletePromo, success } = usePromos();

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

  const handleDeletePromoModal = (id) => {
    handleDeletePromo(id);
    setIsDeletePopupOpen(false);
    refetch();
  };

  const handleEdit = async (id) => {
    setIsEditMode(true);
    setSelectedId(id);
    setIsModalOpen(true);
    await fetchPromoById(id);
  };

  return (
    <div>
      <TableLayout
        headerTable={HeaderPromo}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        data={promos}
        params={params}
        loading={loading}
        onSearch={handleSearch}
        remove={{
          isOpen: isDeletePopupOpen,
          handler: handleDeletePopUp,
        }}
        modal={
          <UpsertModalPromo
            isOpen={isModalOpen}
            type={isEditMode ? "edit" : "create"}
            handler={closeModal}
            id={selectedId}
          />
        }
      />

      <DeletePopUp
        isOpen={isDeletePopupOpen}
        data="Promo"
        onClose={() => setIsDeletePopupOpen(false)}
        onEdit={() => handleDeletePromoModal(selectedId)}
        menu="Promo"
      />
    </div>
  );
};

export default TransactionPage;
