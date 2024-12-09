import { useState } from "react";
import { HeaderRoom } from "../../../data/table/room";
import useFetchRooms from "../../../hooks/room/useFetchRoom";
import TableLayout from "../../../layout/table";
import useRooms from "../../../hooks/room/useRoomForm";
import DeletePopUp from "../../../components/modal/Delete";
import UpsertModalRoom from "../../../components/modal/room/UpsertModalRoom";

const RoomPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { rooms, handleSearch, loading, pagination, refetch } = useFetchRooms(currentPage);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const { handleDeleteRoom, success } = useRooms();

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

    const handleDeleteRoomModal = (id) => {
        handleDeleteRoom(id);
        setIsDeletePopupOpen(false);
        refetch();
    };

    const handleEdit = async (id) => {
        setIsEditMode(true);
        setSelectedId(id);
        setIsModalOpen(true);
        await fetchEmployeeById(id);
    };

    return (
        <div>
            <TableLayout
                headerTable={HeaderRoom}
                handleCreate={handleCreate}
                handleEdit={handleEdit}
                data={rooms}
                params={params}
                loading={loading}
                onSearch={handleSearch}
                remove={{
                    isOpen: isDeletePopupOpen,
                    handler: handleDeletePopUp,
                }}
                modal={
                    <UpsertModalRoom
                        isOpen={isModalOpen}
                        type={isEditMode ? "edit" : "create"}
                        handler={closeModal}
                        id={selectedId}

                    />
                }
            />

            <DeletePopUp
                isOpen={isDeletePopupOpen}
                data="Room"
                onClose={() => setIsDeletePopupOpen(false)}
                onEdit={() => handleDeleteRoomModal(selectedId)}
                menu="Room"

            />
        </div>
    );
}

export default RoomPage;
