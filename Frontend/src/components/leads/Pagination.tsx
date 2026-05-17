interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, totalRecords, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const baseBtn =
    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200";
  const activeBtn =
    "bg-indigo-600 text-white shadow-md shadow-indigo-500/25 hover:bg-indigo-700";
  const normalBtn =
    "bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10";
  const disabledBtn =
    "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-600 cursor-not-allowed";

  const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const pagesToShow = allPages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  const pageList: (number | "...")[] = [];
  for (let i = 0; i < pagesToShow.length; i++) {
    if (i > 0 && (pagesToShow[i - 1] as number) < pagesToShow[i] - 1) {
      pageList.push("...");
    }
    pageList.push(pagesToShow[i]);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Page{" "}
        <span className="font-semibold text-gray-700 dark:text-gray-300">{currentPage}</span>
        {" "}of{" "}
        <span className="font-semibold text-gray-700 dark:text-gray-300">{totalPages}</span>
        {" · "}
        <span className="font-semibold text-gray-700 dark:text-gray-300">{totalRecords}</span>
        {" "}total leads
      </p>

      <div className="flex items-center gap-2">
        <button
          id="pagination-prev"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`${baseBtn} ${currentPage === 1 ? disabledBtn : normalBtn}`}
        >
          ← Prev
        </button>

        {pageList.map((item, index) =>
          item === "..." ? (
            <span key={`dot-${index}`} className="px-2 text-gray-400">…</span>
          ) : (
            <button
              key={item}
              id={`page-${item}`}
              onClick={() => onPageChange(item as number)}
              className={`${baseBtn} w-10 justify-center ${currentPage === item ? activeBtn : normalBtn}`}
            >
              {item}
            </button>
          )
        )}

        <button
          id="pagination-next"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`${baseBtn} ${currentPage === totalPages ? disabledBtn : normalBtn}`}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Pagination;
