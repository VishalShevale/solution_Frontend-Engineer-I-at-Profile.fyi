export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center mt-8 space-x-4">
      
      {/* Previous button: Decrease page number, disabled if on the first page */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}  // Disable if on the first page
        className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 disabled:opacity-50"
      >
        Previous
      </button>
      
      {/* Display current page and total number of pages */}
      <span>Page {currentPage} of {totalPages}</span>
  
      {/* Next button: Increase page number, disabled if on the last page */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}  // Disable if on the last page
        className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 disabled:opacity-50"
      >
        Next
      </button>
      
    </div>
  );
}
