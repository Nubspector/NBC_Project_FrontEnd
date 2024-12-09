import React, { useState } from 'react'
import { HeaderProduct } from '../../../data/table/product';
import useFetchProducts from '../../../hooks/product/useFetchProduct';
import TableLayout from '../../../layout/table';
import useProducts from '../../../hooks/product/useProductForm';
import DeletePopUp from '../../../components/modal/Delete';
import UpsertModalProduct from '../../../components/modal/product/UpsertModalProduct';

const ProductPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { products, handleSearch, loading, pagination, refetch } = useFetchProducts(currentPage);
  const [selectedId, setSelectedId] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const {handleDeleteProduct, success, fetchProductById } = useProducts();


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

  const handleDeleteProductModal = (id) => {
    handleDeleteProduct(id);
    setIsDeletePopupOpen(false);
    refetch();
  }

  const handleEdit = async (id) => {
    setIsEditMode(true);
    setSelectedId(id);
    setIsModalOpen(true);
    await fetchProductById(id);
  };

  return (
    <div>
      <TableLayout
        headerTable={HeaderProduct}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        data={products}
        params={params}
        loading={loading}
        onSearch={handleSearch}
        remove={{
          isOpen: isDeletePopupOpen,
          handler: handleDeletePopUp,
        }}
        modal={
          <UpsertModalProduct
            isOpen={isModalOpen}
            type={isEditMode ? "edit" : "create"}
            handler={closeModal}
            id={selectedId}

          />
        }
      />

      <DeletePopUp
        isOpen={isDeletePopupOpen}
        data="Product"
        onClose={() => setIsDeletePopupOpen(false)}
        onEdit={() => handleDeleteProductModal(selectedId)}
        menu="Product"
      />
    </div>
  );
}

export default ProductPage