import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import { SVGIcon } from "../icon/SVGIcon";
import { ChevronLeftSvg, ChevronRightSvg } from "../../assets";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [inputPage, setInputPage] = useState(currentPage);

  useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handlePageChange = () => {
    if (inputPage >= 1 && inputPage <= totalPages) {
      onPageChange(inputPage);
    } else {
      setInputPage(currentPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageButtonClick = (page) => {
    onPageChange(page);
  };

  const generatePageButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    const halfMaxButtons = Math.floor(maxButtons / 2);
    let start = Math.max(1, currentPage - halfMaxButtons);
    const end = Math.min(start + maxButtons - 1, totalPages);

    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i < end; i++) {
      buttons.push(
        <a
          key={i}
          href="#"
          className={`${i === currentPage ? "text-white bg-[#c20250]" : "text-[#262626]"
            } rounded-xl p-5 w-6 h-6 inline-flex justify-center items-center text-xs`}
          onClick={() => {
            handlePageButtonClick(i);
          }}
        >
          {i}
        </a>
      );
    }

    if (totalPages !== end) {
      buttons.push(
        <a
          key="dots"
          href="#"
          className={`text-[#262626] w-6 h-6 inline-flex justify-center items-center text-xs`}
        >
          ...
        </a>
      );
    }

    buttons.push(
      <a
        key={"lastPage"}
        href="#"
        className={`${totalPages === currentPage
          ? "text-white bg-[#c20250]"
          : "text-[#262626]"
          } rounded-xl p-5 w-6 h-6 inline-flex justify-center items-center text-xs`}
        onClick={() => {
          handlePageButtonClick(totalPages);
        }}
      >
        {totalPages}
      </a>
    );

    return buttons;
  };

  return (
    <div className="flex justify-between mt-10 w-full p-4 pb-10 pl-16">
      <div className="flex justify-center items-center gap-4">
        <div className="flex-none">
          <div className="block">
            <p className="text-base leading-[23px] text-black">
              Showing <span className="font-semibold">{currentPage}</span> from{" "}
              <span className="font-semibold">{totalPages}</span> data
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <Button
          variant="outline"
          size="md"
          className="flex items-center hover:border-[#c20250] bg-transparent hover:bg-transparent border-[#c20250] rounded-xl text-[#f30b6a] space-x-2"
          onClick={handlePreviousPage}
        >
          <FaChevronLeft />
          <p className="text-blue-ribbon">Previous</p>
        </Button>
        <div className="rounded-xl px-2 py-1 bg-[#F4F4F4]">
          {generatePageButtons()}
        </div>
        <Button
          variant="outline"
          size="md"
          className="flex items-center hover:border-[#c20250] bg-transparent hover:bg-transparent  border-[#c20250] rounded-xl text-[#f30b6a] space-x-2"
          onClick={handleNextPage}
        >
          <p className="text-blue-ribbon">Next</p>
          <FaChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
