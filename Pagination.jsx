// Component to handle pagination controls in EntryList

import SelectPage from './SelectPage'

export default function Pagination({
  page,
  handlePrevious,
  handleNext,
  maxPage,
  setPage,
  pagesToShow,
}) {
  return (
    <div className="pagination-container">
      <button onClick={handlePrevious} disabled={page <= 1}>
        Previous
      </button>
      <SelectPage
        currentPage={page}
        onClick={setPage}
        pagesToShow={pagesToShow}
      />

      <button onClick={handleNext} disabled={page >= maxPage}>
        Next
      </button>
    </div>
  )
}
