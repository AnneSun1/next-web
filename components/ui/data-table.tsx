"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Download, Share2, Eye, Bookmark, ChevronLeft, ChevronRight } from "lucide-react"

export interface DataTableColumn<T> {
  key: string
  header: string
  width?: string
  render: (item: T) => React.ReactNode
}

export interface DataTableFilter {
  key: string
  label: string
  type: "select" | "text" | "date" | "number"
  value: string
  options?: { value: string; label: string }[]
  placeholder?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  loading?: boolean
  searchable?: boolean
  searchPlaceholder?: string
  selectable?: boolean
  selectedItems?: string[]
  onSelectionChange?: (selectedIds: string[]) => void
  onSelectAll?: (checked: boolean) => void
  isAllSelected?: boolean
  onRowClick?: (item: T) => void
  emptyMessage?: string
  emptyDescription?: string
  filters?: DataTableFilter[]
  onFilterChange?: (filterKey: string, value: string) => void
  onExport?: () => void
  onShare?: () => void
  onViewsClick?: () => void
  onSaveView?: () => void
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  loading = false,
  searchable = false,
  searchPlaceholder = "Search...",
  selectable = false,
  selectedItems = [],
  onSelectionChange,
  onSelectAll,
  isAllSelected = false,
  onRowClick,
  emptyMessage = "No data found",
  emptyDescription = "No items to display",
  filters = [],
  onFilterChange,
  onExport,
  onShare,
  onViewsClick,
  onSaveView,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handleFilterChange = (filterKey: string, value: string) => {
    // Convert "all" back to empty string for the parent component
    const actualValue = value === "all" ? "" : value
    onFilterChange?.(filterKey, actualValue)
    setCurrentPage(1)
  }

  const handleRowClick = (item: T) => {
    if (onRowClick) {
      onRowClick(item)
    }
  }

  const handleSelectionChange = (itemId: string, checked: boolean) => {
    if (!onSelectionChange) return

    let newSelection: string[]
    if (checked) {
      newSelection = [...selectedItems, itemId]
    } else {
      newSelection = selectedItems.filter((id) => id !== itemId)
    }
    onSelectionChange(newSelection)
  }

  const handleSelectAll = (checked: boolean) => {
    if (onSelectAll) {
      onSelectAll(checked)
    }
  }

  // Filter and search data
  const filteredData = data.filter((item) => {
    // Apply search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      const itemString = JSON.stringify(item).toLowerCase()
      if (!itemString.includes(searchLower)) {
        return false
      }
    }

    // Apply other filters
    for (const filter of filters) {
      if (filter.value && filter.value !== "all") {
        const itemValue = (item as any)[filter.key]
        if (filter.type === "select") {
          if (itemValue !== filter.value) {
            return false
          }
        } else if (filter.type === "text") {
          if (!itemValue?.toString().toLowerCase().includes(filter.value.toLowerCase())) {
            return false
          }
        } else if (filter.type === "number") {
          const numValue = Number(itemValue)
          const filterNum = Number(filter.value)
          if (isNaN(numValue) || numValue < filterNum) {
            return false
          }
        } else if (filter.type === "date") {
          const itemDate = new Date(itemValue).toDateString()
          const filterDate = new Date(filter.value).toDateString()
          if (itemDate !== filterDate) {
            return false
          }
        }
      }
    }

    return true
  })

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const renderFilterInput = (filter: DataTableFilter) => {
    if (filter.type === "select") {
      return (
        <Select value={filter.value || "all"} onValueChange={(value) => handleFilterChange(filter.key, value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder={filter.label} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All {filter.label}</SelectItem>
            {filter.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    }

    return (
      <Input
        type={filter.type}
        placeholder={filter.placeholder || filter.label}
        value={filter.value}
        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
        className="w-40"
      />
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {/* Filters skeleton */}
        {filters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.map((_, index) => (
              <Skeleton key={index} className="h-10 w-40" />
            ))}
          </div>
        )}

        {/* Actions and search skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>
          <Skeleton className="h-10 w-64" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        {/* Table skeleton */}
        <div className="border border-border rounded-lg">
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-4">
              {selectable && <Skeleton className="h-4 w-4" />}
              {columns.map((_, index) => (
                <Skeleton key={index} className="h-4 flex-1" />
              ))}
            </div>
          </div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="p-4 border-b border-border last:border-b-0">
              <div className="flex items-center space-x-4">
                {selectable && <Skeleton className="h-4 w-4" />}
                {columns.map((_, colIndex) => (
                  <Skeleton key={colIndex} className="h-8 flex-1" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <div key={filter.key}>{renderFilterInput(filter)}</div>
          ))}
        </div>
      )}

      {/* Actions and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {onExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="flex items-center space-x-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          )}
          {onShare && (
            <Button
              variant="outline"
              size="sm"
              onClick={onShare}
              className="flex items-center space-x-2 bg-transparent"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          )}
        </div>

        {searchable && (
          <div className="relative flex-1 max-w-md mx-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        )}

        <div className="flex items-center space-x-2">
          {onViewsClick && (
            <Button
              variant="outline"
              size="sm"
              onClick={onViewsClick}
              className="flex items-center space-x-2 bg-transparent"
            >
              <Eye className="h-4 w-4" />
              <span>Views</span>
            </Button>
          )}
          {onSaveView && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSaveView}
              className="flex items-center space-x-2 bg-transparent"
            >
              <Bookmark className="h-4 w-4" />
              <span>Save View</span>
            </Button>
          )}
        </div>
      </div>

      {/* Table Container with Horizontal Scroll */}
      <div className="w-full overflow-x-auto">
        <div className="border border-border rounded-lg bg-card min-w-max">
          {/* Header */}
          <div className="border-b border-border bg-muted/50">
            <div className="flex items-center px-4 py-3 min-w-max">
              {selectable && (
                <div className="w-12 flex items-center flex-shrink-0">
                  <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} aria-label="Select all" />
                </div>
              )}
              {columns.map((column) => (
                <div key={column.key} className={`${column.width || "flex-1 min-w-[150px]"} px-2 flex-shrink-0`}>
                  <span className="text-sm font-medium text-foreground whitespace-nowrap">{column.header}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Body */}
          <div>
            {paginatedData.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-2">{emptyMessage}</div>
                <div className="text-sm text-muted-foreground">{emptyDescription}</div>
              </div>
            ) : (
              paginatedData.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center px-4 py-3 border-b border-border last:border-b-0 hover:bg-muted/50 cursor-pointer transition-colors min-w-max"
                  onClick={() => handleRowClick(item)}
                >
                  {selectable && (
                    <div className="w-12 flex items-center flex-shrink-0">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(checked) => handleSelectionChange(item.id, checked as boolean)}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Select item ${item.id}`}
                      />
                    </div>
                  )}
                  {columns.map((column) => (
                    <div key={column.key} className={`${column.width || "flex-1 min-w-[150px]"} px-2 flex-shrink-0`}>
                      {column.render(item)}
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
