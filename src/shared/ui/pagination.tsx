'use client';

import { useMemo } from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function buildPages(totalPages: number, currentPage: number) {
  const pages = new Set<number>([1, totalPages, currentPage]);

  if (currentPage > 1) pages.add(currentPage - 1);
  if (currentPage < totalPages) pages.add(currentPage + 1);

  while (pages.size < Math.min(totalPages, 5)) {
    const candidate = pages.size + 1;
    pages.add(candidate);
  }

  const sorted = Array.from(pages).filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b);

  return sorted.reduce<(number | string)[]>((acc, page, index) => {
    if (index > 0 && page - (sorted[index - 1] as number) > 1) {
      acc.push('...');
    }
    acc.push(page);
    return acc;
  }, []);
}

export function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const pages = useMemo(() => buildPages(totalPages, currentPage), [currentPage, totalPages]);

  return (
    <div className="ds-pagination" aria-label="Пагінація">
      <button
        type="button"
        className="ds-page-button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        Назад
      </button>

      {pages.map((page, index) =>
        page === '...'
          ? (
              <span key={`ellipsis-${index}`} className="px-2 text-muted">
                ...
              </span>
            )
          : (
              <button
                key={page}
                type="button"
                className={`ds-page-button ${currentPage === page ? 'active' : ''}`}
                onClick={() => onPageChange(page as number)}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )
      )}

      <button
        type="button"
        className="ds-page-button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Вперед
      </button>
    </div>
  );
}
