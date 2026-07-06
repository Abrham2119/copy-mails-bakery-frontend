"use client";

/**
 * components/table — BasicDataGridTable (composite).
 *
 * Generic, presentational data grid for large datasets. Receives columns + rows
 * + pagination via props and stays "dumb" about where data comes from.
 */

import type { ReactNode } from "react";
import { Pagination } from "./Pagination";

export interface Column<T> {
  key: string;
  header: string;
  /** Custom cell renderer; falls back to `row[key]` when omitted. */
  render?: (row: T) => ReactNode;
}

interface BasicDataGridTableProps<T> {
  title?: string;
  columns: Column<T>[];
  data: T[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  getRowId?: (row: T) => string;
}

export function BasicDataGridTable<T>({
  title,
  columns,
  data,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  getRowId,
}: BasicDataGridTableProps<T>) {
  return (
    <div className="w-full">
      {title && <h2 className="mb-3 text-lg font-semibold">{title}</h2>}
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-line/40 text-ink/70">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="whitespace-nowrap px-4 py-3 font-medium">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={getRowId?.(row) ?? i} className="border-t border-line hover:bg-accent/20">
                {columns.map((col) => (
                  <td key={col.key} className="whitespace-nowrap px-4 py-3">
                    {col.render
                      ? col.render(row)
                      : String((row as Record<string, unknown>)[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {onPageChange && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </div>
  );
}
