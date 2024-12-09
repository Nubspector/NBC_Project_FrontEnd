import React, { useState } from "react";
import TableLayout from "../../../layout/table";
import useFetchTransactions from "../../../hooks/customer/useFetchRiwayatTransaksi";
import useFetchInvoice from "../../../hooks/customer/useFetchInvoice"; 
import InvoiceModal from "../../../components/modal/nota/CetakNotaModal";
import { HeaderRiwayatTransaksiRiwayat } from "../../../data/table/riwayat";

const RiwayatTransaksiPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, pagination, refetch, riwayatTransaksi, handleSearch } =
    useFetchTransactions(currentPage);

  const { invoice, loading: invoiceLoading } = useFetchInvoice(selectedId);

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
        headerTable={() => HeaderRiwayatTransaksiRiwayat(handleView)}
        data={riwayatTransaksi}
        loading={loading}
        params={params}
        onSearch={handleSearch}
        modal={
          <InvoiceModal
            isOpen={isModalOpen}
            onClose={closeModal}
            data={invoice}
            loading={invoiceLoading}
          />
        }
      />
    </div>
  );
};

export default RiwayatTransaksiPage;
