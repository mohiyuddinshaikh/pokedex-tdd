export default function Pagination({ visiblePages, setPage, page, maxPage }) {
  return (
    <div className="pagination">
      <button onClick={() => setPage(1)}>First</button>

      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
        Prev
      </button>

      {visiblePages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={p === page ? "active" : ""}
        >
          {p}
        </button>
      ))}

      <button onClick={() => setPage((prev) => Math.min(prev + 1, maxPage))}>
        Next
      </button>

      <button onClick={() => setPage(maxPage)}>Last</button>
    </div>
  );
}
