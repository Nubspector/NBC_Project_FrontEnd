import React, { useState } from "react";
import TableLayout from "../../../layout/table";
import useFetchAntrianBelumBayar from "../../../hooks/transaction/payment/useFetchPayment";
import useFetchAntrianBelumBayarCustomerById from "../../../hooks/transaction/payment/UseFetchCustomerBelumBayar";
import CustomerDetailsModal from "../../../components/modal/cashier/PaymentModal";
import { HeaderListPayment } from "../../../data/table/payment";

const CahsierPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { belumBayar, error, loading, pagination, handleSearch, refetch } =
    useFetchAntrianBelumBayar(currentPage);

  const { belumBayarCustomerById, loading: customerLoading } =
    useFetchAntrianBelumBayarCustomerById(selectedId);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };

  const handleView = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
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
        headerTable={() => HeaderListPayment(handleView)}
        data={belumBayar}
        loading={loading}
        params={params}
        onSearch={handleSearch}
        modal={
          <CustomerDetailsModal
            isOpen={isModalOpen}
            onClose={closeModal}
            data={belumBayarCustomerById}
            loading={customerLoading}
          />
        }
      />
    </div>
  );
};

export default CahsierPage;
