import Pagination from "../../components/table/pagination";
import { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import Table from "../../components/table/table";

const TableLayout = ({
  remove,
  params,
  handleCreate,
  setSelectedId,
  data = [],
  headerTable,
  title,
  modal,
  handleEdit,
  loading,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColumn, setSelectedColumn] = useState([]);

  useEffect(() => {
    if (setSelectedId) {
      setSelectedId(selectedColumn);
    }
  }, [selectedColumn, setSelectedId]);

  const handlePageChange = (newPage) => {
    params.setPage(newPage);
  };

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    onSearch({ search: searchQuery });
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <form
                onSubmit={onSearchSubmit}
                className="flex items-center mb-4"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={onSearchChange}
                  className="border border-gray-300 rounded-md p-2 flex-grow"
                />
                <button
                  type="submit"
                  className="ml-2 p-2 bg-[#f30b6a] text-white rounded-md hover:bg-[#c20250]"
                >
                  Search
                </button>
              </form>
            </div>
            {handleCreate && (
              <div className="flex items-center justify-between gap-4 ml-4">
                <Button
                  onClick={handleCreate}
                  className="inline-block bg-white rounded-full border border-current px-8 py-3 text-sm font-medium text-[#c20250] transition hover:scale-110 hover:shadow-md focus:outline-none focus:ring active:text-[#c20250]"
                >
                  Create {title}
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden shadow-2xl rounded-s-lg bg-white border border-[#E9ECFF]">
                  <Table
                    columns={headerTable(
                      remove?.handler ? remove.handler : () => {},
                      handleEdit
                    )}
                    data={data}
                    loading={loading}
                    id={selectedColumn}
                    setIsChecked={setSelectedColumn}
                  />
                  <div className="flex flex-col border-t border-[#BDBDBD]">
                    <Pagination
                      currentPage={params.page}
                      totalPages={Math.ceil(params.total / params.limit)}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal && modal}
    </>
  );
};

export default TableLayout;
