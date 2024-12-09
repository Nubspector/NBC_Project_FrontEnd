import React, { useState } from "react";
import TableLayout from "../../../layout/table";
import useFetchSchedules from "../../../hooks/schedule/useFetchSchedule";
import { HeaderSchedule } from "../../../data/table/schedule";
import UpsertModalSchedule from "../../../components/modal/shcedule/UpsertModalSchedule";
import useSchedules from "../../../hooks/schedule/useScheduleForm";
import DeletePopUp from "../../../components/modal/Delete";

const SchedulePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { schedules, handleSearch, loading, pagination, refetch } =
    useFetchSchedules(currentPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const { fetchScheduleById, handleDeleteSchedule } = useSchedules();

  const params = {
    page: currentPage,
    limit: pagination.per_page,
    total: pagination.total,
    setPage: setCurrentPage,
  };

  const handleCreate = (isRefecth) => {
    setIsEditMode(false);
    setIsModalOpen(true);
    setSelectedId(null);
    if (isRefecth) {
      refetch();
    }
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

  const handleDeleteScheduleModal = (id) => {
    handleDeleteSchedule(id);
    setIsDeletePopupOpen(false);
    refetch();
  };

  const handleEdit = async (id, isRefecth) => {
    setIsEditMode(true);
    setSelectedId(id);
    setIsModalOpen(true);
    await fetchScheduleById(id);
    if (isRefecth) {
      refetch();
    }
  };

  return (
    <div>
      <TableLayout
        headerTable={HeaderSchedule}
        handleEdit={handleEdit}
        data={schedules}
        params={params}
        loading={loading}
        onSearch={handleSearch}
        handleCreate={handleCreate}
        remove={{
          isOpen: isDeletePopupOpen,
          handler: handleDeletePopUp,
        }}
        modal={
          <UpsertModalSchedule
            isOpen={isModalOpen}
            type={isEditMode ? "edit" : "create"}
            handler={closeModal}
            id={selectedId}
          />
        }
      />
      <DeletePopUp
        isOpen={isDeletePopupOpen}
        data="Schedule"
        onClose={() => setIsDeletePopupOpen(false)}
        onEdit={() => handleDeleteScheduleModal(selectedId)}
        menu="Schedule"
      />
    </div>
  );
};

export default SchedulePage;
