import React, { useState } from "react";
import TableLayout from "../../../layout/table";
import { HeaderCustomer } from "../../../data/table/customer";
import UpsertModal from "../../../components/modal/customer/UpsertModalCustomer";
import useCustomer from "../../../hooks/customer/useCustomerForm";
import DeletePopUp from "../../../components/modal/Delete";
import useFetchCustomer from "../../../hooks/customer/useFetchCustomer";
import CardModal from "../../../components/modal/Card";
import CSTransactionModal from "../../../components/modal/transaction/CS.transaction";

const CustomerPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [cardData, setCardData] = useState(null);
  const { fetchCustomerById, selectedCustomer, handleDeleteCustomer, success } =
    useCustomer();

  const { customer, handleSearch, loading, pagination, refetch } =
    useFetchCustomer(currentPage);

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

  const handleEdit = async (id) => {
    setIsEditMode(true);
    setSelectedId(id);
    setIsModalOpen(true);
    await fetchCustomerById(id);
  };

  const handleDeleteCustomerModal = (id) => {
    handleDeleteCustomer(id);
    setIsDeletePopupOpen(false);
    refetch();
  };

  const handleCard = (id) => {
    console.log("id", id);
    setSelectedId(id);
    setIsCardModalOpen(true);
  };

  const closeCardModal = () => {
    setIsCardModalOpen(false);
    setCardData(null);
  };

  const handleTransaction = (id) => {
    console.log("id", id);
    setSelectedId(id);
    setIsTransactionModalOpen(true);
  };

  const closeTransactionModal = () => {
    setIsTransactionModalOpen(false);
    setCardData(null);
  };

  return (
    <div>
      <TableLayout
        data={customer}
        headerTable={(removeHandler, handleEdit) =>
          HeaderCustomer(removeHandler, handleEdit, handleCard, handleTransaction)
        }
        handleCreate={handleCreate}
        params={params}
        loading={loading}
        handleEdit={handleEdit}
        remove={{
          isOpen: isDeletePopupOpen,
          handler: handleDeletePopUp,
        }}
        onSearch={handleSearch}
        modal={
          <UpsertModal
            isOpen={isModalOpen}
            type={isEditMode ? "edit" : "create"}
            handler={closeModal}
            id={selectedId}
          />
        }
      />
      <DeletePopUp
        isOpen={isDeletePopupOpen}
        data="Customer"
        onClose={() => setIsDeletePopupOpen(false)}
        onEdit={() => handleDeleteCustomerModal(selectedId)}
        menu="Customer"
      />
      <CardModal
        isOpen={isCardModalOpen}
        onClose={closeCardModal}
        id={selectedId}
      />
      <CSTransactionModal
        isOpen={isTransactionModalOpen}
        onClose={closeTransactionModal}
        id={selectedId}
      />
    </div>
  );
};

export default CustomerPage;
