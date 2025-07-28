import { Table } from '@tanstack/react-table'
import ClearButton from '../buttons/ClearButton'

interface PaginationControlsProps<T> {
  table: Table<T>
  currentPage: number
  totalPages: number
  onPageChange: (pageIndex: number) => void
}

const PaginationControls = <T,>({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps<T>) => {
  const canPreviousPage = currentPage > 1; 
  const canNextPage = currentPage < totalPages;

  return (
    <div 
      data-testid="pagination"
      className="flex items-center justify-between border-t border-gray-200 text-sm bg-gray-50 px-4 h-[36.5px]"
    >
      <div className="text-gray-600">
        Page {currentPage} of {totalPages}
      </div>

      <div className="flex gap-2">
        <ClearButton
          onClick={() => {
            if (canPreviousPage) {
              onPageChange(currentPage - 1);
            }
          }}
          disabled={!canPreviousPage} 
          className="disabled:text-gray-400 disabled:cursor-default disabled:hover:text-gray-400"
          data-testid="pagination-prev"
        >
          Prev
        </ClearButton>
        <ClearButton
          onClick={() => {
            if (canNextPage) {
              onPageChange(currentPage + 1);
            }
          }}
          disabled={!canNextPage}
          className="disabled:text-gray-400 disabled:cursor-default disabled:hover:text-gray-400"
          data-testid="pagination-next"
        >
          Next
        </ClearButton>
      </div>
    </div>
  );
}

export default PaginationControls;
