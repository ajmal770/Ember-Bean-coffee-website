import React, { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X } from "lucide-react";

export default function DataTable({
  data = [],
  columns = [],
  searchPlaceholder = "Search...",
  filterCategoryKey = null,
  categories = [],
  itemsPerPage = 8,
}) {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter & Search
  const filteredData = useMemo(() => {
    let result = [...data];

    // Category / Status Filter
    if (filterCategoryKey && selectedFilter !== "ALL") {
      result = result.filter((item) => {
        const val = item[filterCategoryKey];
        return String(val).toLowerCase() === selectedFilter.toLowerCase();
      });
    }

    // Keyword Search
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter((item) =>
        Object.values(item).some((val) => {
          if (val === null || val === undefined) return false;
          if (typeof val === "object") {
            return JSON.stringify(val).toLowerCase().includes(q);
          }
          return String(val).toLowerCase().includes(q);
        })
      );
    }

    // Sort
    if (sortColumn) {
      result.sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];

        if (aVal === bVal) return 0;
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
        }

        return sortDirection === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }

    return result;
  }, [data, search, selectedFilter, filterCategoryKey, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const handleSort = (key) => {
    if (sortColumn === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(key);
      setSortDirection("asc");
    }
  };

  return (
    <div className="w-full space-y-4 text-left">
      {/* Control Bar: Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gold/70" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className="w-full bg-brand-deepBlack border border-brand-warmSand/20 rounded-2xl pl-10 pr-9 py-2.5 text-xs text-brand-cream placeholder:text-brand-cream/40 focus:border-brand-gold/60 focus:outline-none transition-all"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-cream/40 hover:text-brand-cream"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category / Status Filter */}
        {filterCategoryKey && categories.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-accent uppercase tracking-wider text-brand-sandBeige font-bold">
              Filter:
            </span>
            <select
              value={selectedFilter}
              onChange={(e) => {
                setSelectedFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-brand-deepBlack border border-brand-warmSand/20 rounded-2xl px-3 py-2 text-xs text-brand-cream focus:border-brand-gold/60 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Selections ({data.length})</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto rounded-3xl border border-brand-warmSand/15 bg-brand-deepBlack/85 shadow-2xl backdrop-blur-md">
        <table className="w-full text-left text-xs">
          <thead className="bg-brand-vantablack/90 border-b border-brand-warmSand/15 font-accent text-brand-cream/70 uppercase tracking-wider text-[10px] select-none">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  onClick={() => col.accessor && handleSort(col.accessor)}
                  className={`py-3.5 px-4 font-bold ${
                    col.accessor ? "cursor-pointer hover:text-brand-gold transition-colors" : ""
                  }`}
                >
                  <div className="flex items-center space-x-1.5">
                    <span>{col.header}</span>
                    {sortColumn === col.accessor && (
                      <span>
                        {sortDirection === "asc" ? (
                          <ChevronUp className="w-3 h-3 text-brand-gold inline" />
                        ) : (
                          <ChevronDown className="w-3 h-3 text-brand-gold inline" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-brand-warmSand/10">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-brand-cream/50">
                  <div className="space-y-2">
                    <p className="font-heading text-sm font-semibold text-brand-cream">
                      No matching records found.
                    </p>
                    <p className="text-xs text-brand-cream/40">
                      Try adjusting your search criteria or filter tags.
                    </p>
                    {(search || selectedFilter !== "ALL") && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearch("");
                          setSelectedFilter("ALL");
                        }}
                        className="mt-2 text-xs text-brand-gold hover:underline font-accent"
                      >
                        Reset All Filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIdx) => (
                <tr
                  key={row.id || rowIdx}
                  className="hover:bg-brand-vantablack/50 transition-colors duration-150"
                >
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="py-3.5 px-4 text-brand-cream/90 align-middle">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-brand-cream/60 px-2 pt-2">
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
            <strong className="text-brand-gold font-mono">{filteredData.length}</strong> items
          </span>

          <div className="flex items-center space-x-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-xl border border-brand-warmSand/20 bg-brand-deepBlack text-brand-cream disabled:opacity-30 disabled:cursor-not-allowed hover:border-brand-gold transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-mono text-xs px-2 text-brand-cream">
              {currentPage} / {totalPages}
            </span>

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === 1 || currentPage === totalPages}
              className="p-1.5 rounded-xl border border-brand-warmSand/20 bg-brand-deepBlack text-brand-cream disabled:opacity-30 disabled:cursor-not-allowed hover:border-brand-gold transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

