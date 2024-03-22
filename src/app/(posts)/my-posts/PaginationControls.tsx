import { FC, useState } from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const PaginationControls: FC<PaginationControlsProps> = ({ currentPage, totalPages, paginate }) => {
  const [hoveredPage, setHoveredPage] = useState(0);

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      paginate(pageNumber);
    }
  };

  // Calculate starting and ending page numbers for displayed buttons (max 5)
  const maxButtons = 4;
  const buttonStart = Math.max(Math.min(currentPage - Math.floor(maxButtons / 2) + 1, totalPages - maxButtons + 1), 1);
  const buttonEnd = Math.min(buttonStart + maxButtons - 1, totalPages);

  const handleHover = (pageNumber: number) => {
    setHoveredPage(pageNumber);
  };

  const buttonStyle = (pageNumber: number): string => {
    const isActive = currentPage === pageNumber;
    const isHovered = hoveredPage === pageNumber;
    const baseStyle = 'px-2 py-1 rounded-md';
    const activeStyle = `${baseStyle} bg-gray-200`;
    const hoverStyle = `${baseStyle} text-gray-700 hover:bg-gray-100 transition-all duration-200 ease-in-out`;

    return isActive ? activeStyle : (isHovered ? hoverStyle : baseStyle);
  };

  return (
    <div className="flex justify-center gap-2">
      <PaginationPrevious onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
      {Array.from({ length: buttonEnd - buttonStart + 1 }, (_, i) => (
        <PaginationItem key={i + buttonStart}>
          <PaginationLink
            className={buttonStyle(i + buttonStart)} // Apply dynamic styles
            onMouseEnter={() => handleHover(i + buttonStart)}
            onMouseLeave={() => setHoveredPage(0)}
            onClick={() => handlePageClick(i + buttonStart)}
          >
            {i + buttonStart}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationNext onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
    </div>
  );
};

export default PaginationControls;
