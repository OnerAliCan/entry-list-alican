// Component to render individual page buttons in the pagination

export default function SelectPage({ currentPage, onClick, pagesToShow }) {
  return (
    <>
      {pagesToShow.map((page, index) =>
        page === '...' ? (
          <span key={`ellipse-${index}`} style={{ margin: '0 4px' }}>
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onClick(page)}
            style={{
              backgroundColor: page === currentPage ? '#1976d2' : 'white',
              color: page === currentPage ? 'white' : '#1976d2',
            }}
          >
            {page}
          </button>
        ),
      )}
    </>
  )
}
