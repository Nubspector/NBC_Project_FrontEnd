import React from "react";
import { lowerCase } from "lodash";
import { Button, Modal } from "react-daisyui";

const DeletePopUp = ({
    isOpen,
    data,
    onClose,
    onEdit,
    menu,
}) => {
    return (
        <Modal
            open={isOpen}
            backdrop={false}
            className="flex flex-col justify-center items-center bg-white p-10 rounded-3xl space-y-5"
        >
            <Modal.Header className="flex flex-col items-center">
                
            </Modal.Header>
            <Modal.Body className="text-center text-sm font-medium">
                <div className="font-bold text-base">
                    Are You Sure You Want to Delete {data} ?
                </div>
                This {lowerCase(menu)} will be deleted
            </Modal.Body>
            <Modal.Actions className="flex w-full flex-col justify-center items-center">
                <Button
                    className="w-full rounded-full py-2 hover:text-white mt-2 bg-red-700 text-white hover:bg-red-900 hover:border-red-700"
                    type="button"
                    onClick={onEdit}
                >
                    Yes
                </Button>
                <Button
                    type="button"
                    className="w-full rounded-full py-2 text-white mt-2 bg-blue-300 hover:text-white hover:bg-blue-600 border-blue-300 !ml-0"
                    onClick={onClose}
                >
                    No
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default DeletePopUp;
