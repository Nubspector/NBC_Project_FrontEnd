import React, { useState } from "react";
import TableLayout from "../../../layout/table";
import { HeaderClass } from "../../../data/table/employee";
import UpsertModal from "../../../components/modal/employee/UpsertModalEmployee";
import useEmployees from "../../../hooks/employee/useEmployeeForm";
import DeletePopUp from "../../../components/modal/Delete";
import useFetchEmployees from "../../../hooks/employee/useFetchEmployees";

const EmployeePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const { fetchEmployeeById, selectedEmployee, handleDeleteEmployee, success } =
    useEmployees();

  const { employees, handleSearch, loading, pagination, refetch } =
    useFetchEmployees(currentPage);

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
    await fetchEmployeeById(id);
  };

  const handleDeleteEmployeeModal = (id) => {
    handleDeleteEmployee(id);
    setIsDeletePopupOpen(false);
    refetch();
  }

  const params = {
    page: currentPage,
    limit: pagination.per_page,
    total: pagination.total,
    setPage: setCurrentPage,
  };

  return (
    <div>
      <TableLayout
        data={employees}
        headerTable={HeaderClass}
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
        data="Employee"
        onClose={() => setIsDeletePopupOpen(false)}
        onEdit={() => handleDeleteEmployeeModal(selectedId)}
        menu="Employee"
      />
    </div>
  );
};

export default EmployeePage;
