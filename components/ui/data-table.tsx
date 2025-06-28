"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Search,
  Download,
  Share2,
  Eye,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Filter,
  ChevronDown,
  Check,
  Plus,
  Columns,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  List,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

export interface DataTableColumn<T> {
  key: string
  header: string
  width?: string
  render: (item: T) => React.ReactNode
  sortable?: boolean
  filterable?: boolean
}

export interface DataTableFilter {
  key: string
  label: string
  type: "select" | "text" | "date" | "number"
  value: string
  options?: { value: string; label: string }[]
  placeholder?: string
}

export interface DataTableView {
  id: string
  name: string
  filters: Record<string, string>
}

export interface BulkAction {
  label: string
  icon?: React.ComponentType<{ className?: string }>
  onClick: (selectedIds: string[]) => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost"
}

export interface DataTableSort {
  key: string
  direction: "asc" | "desc"
}

export interface DataTablePagination {
  page: number
  pageSize: number
  total: number
}

interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  loading?: boolean
  searchable?: boolean
  searchPlaceholder?: string
  selectable?: boolean
  onRowClick?: (item: T) => void
  emptyMessage?: string
  emptyDescription?: string
  filters?: DataTableFilter[]
  onFilterChange?: (filterKey: string, value: string) => void
  onExport?: () => void
  onShare?: () => void
  onViewsClick?: () => void
  onSaveView?: () => void
  // New view-related props
  title?: string
  views?: DataTableView[]
  currentView?: DataTableView
  onViewChange?: (view: DataTableView) => void
  onCreateView?: () => void
  primaryAction?: {
    text: string
    icon?: React.ComponentType<{ className?: string }>
    onClick: () => void
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  }
  // New bulk action props
  bulkActions?: BulkAction[]
  onSelectionChange?: (selectedIds: string[], selectedItems: T[]) => void
  // Server-side operation props
  serverSide?: boolean
  sorting?: DataTableSort[]
  onSortingChange?: (sorting: DataTableSort[]) => void
  pagination?: DataTablePagination
  onPaginationChange?: (pagination: DataTablePagination) => void
  // Search props
  searchValue?: string
  onSearchChange?: (value: string) => void
  // Column visibility
  columnVisibility?: Record<string, boolean>
  onColumnVisibilityChange?: (visibility: Record<string, boolean>) => void
  // Error handling
  error?: string
  onRetry?: () => void
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  loading = false,
  searchable = false,
  searchPlaceholder = "Search...",
  selectable = false,
  onRowClick,
  emptyMessage = "No data found",
  emptyDescription = "No items to display",
  filters = [],
  onFilterChange,
  onExport,
  onShare,
  onViewsClick,
  onSaveView,
  title,
  views = [],
  currentView,
  onViewChange,
  onCreateView,
  primaryAction,
  bulkActions = [],
  onSelectionChange,
  serverSide = false,
  sorting = [],
  onSortingChange,
  pagination,
  onPaginationChange,
  searchValue,
  onSearchChange,
  columnVisibility,
  onColumnVisibilityChange,
  error,
  onRetry,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState(searchValue || "")
  const [currentPage, setCurrentPage] = useState(pagination?.page || 1)
  const [showFilters, setShowFilters] = useState(false)
  const [internalColumnVisibility, setInternalColumnVisibility] = useState<Record<string, boolean>>(
    columnVisibility || columns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {}),
  )

  // Internal selection state
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isAllSelected, setIsAllSelected] = useState(false)

  const itemsPerPage = pagination?.pageSize || 10

  // Use external column visibility if provided, otherwise use internal
  const visibilityState = columnVisibility || internalColumnVisibility
  const setVisibilityState = onColumnVisibilityChange || setInternalColumnVisibility

  // Visible columns based on visibility state
  const visibleColumns = columns.filter((col) => visibilityState[col.key] !== false)

  // Reset selection when data changes
  useEffect(() => {
    setSelectedItems([])
    setIsAllSelected(false)
  }, [data])

  // Sync search query with external search value
  useEffect(() => {
    if (searchValue !== undefined) {
      setSearchQuery(searchValue)
    }
  }, [searchValue])

  // Sync current page with external pagination
  useEffect(() => {
    if (pagination?.page !== undefined) {
      setCurrentPage(pagination.page)
    }
  }, [pagination?.page])

  // Notify parent of selection changes
  useEffect(() => {
    if (onSelectionChange) {
      const selectedObjects = data.filter((item) => selectedItems.includes(item.id))
      onSelectionChange(selectedItems, selectedObjects)
    }
  }, [selectedItems, data, onSelectionChange])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    if (serverSide && onSearchChange) {
      onSearchChange(value)
    } else {
      setCurrentPage(1)
    }
  }

  const handleFilterChange = (filterKey: string, value: string) => {
    // Convert "all" back to empty string for the parent component
    const actualValue = value === "all" ? "" : value
    onFilterChange?.(filterKey, actualValue)
    if (!serverSide) {
      setCurrentPage(1)
    }
  }

  const handleSortChange = (columnKey: string) => {
    if (!onSortingChange) return

    const existingSort = sorting.find((s) => s.key === columnKey)
    let newSorting: DataTableSort[]

    if (!existingSort) {
      // Add new sort
      newSorting = [{ key: columnKey, direction: "asc" }]
    } else if (existingSort.direction === "asc") {
      // Change to desc
      newSorting = [{ key: columnKey, direction: "desc" }]
    } else {
      // Remove sort
      newSorting = []
    }

    onSortingChange(newSorting)
  }

  const getSortIcon = (columnKey: string) => {
    const sort = sorting.find((s) => s.key === columnKey)
    if (!sort) return <ArrowUpDown className="h-4 w-4 opacity-50" />
    if (sort.direction === "asc") return <ArrowUp className="h-4 w-4" />
    return <ArrowDown className="h-4 w-4" />
  }

  const handleRowClick = (item: T) => {
    if (onRowClick) {
      onRowClick(item)
    }
  }

  const handleSelectionChange = (itemId: string, checked: boolean) => {
    let newSelection: string[]
    if (checked) {
      newSelection = [...selectedItems, itemId]
    } else {
      newSelection = selectedItems.filter((id) => id !== itemId)
    }
    setSelectedItems(newSelection)
    setIsAllSelected(newSelection.length === filteredData.length && filteredData.length > 0)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = filteredData.map((item) => item.id)
      setSelectedItems(allIds)
      setIsAllSelected(true)
    } else {
      setSelectedItems([])
      setIsAllSelected(false)
    }
  }

  const handleClearSelection = () => {
    setSelectedItems([])
    setIsAllSelected(false)
  }

  const handleViewChange = (view: DataTableView) => {
    onViewChange?.(view)
    // Clear selection when view changes
    setSelectedItems([])
    setIsAllSelected(false)
  }

  const handleColumnVisibilityChange = (columnKey: string, visible: boolean) => {
    const newVisibility = { ...visibilityState, [columnKey]: visible }
    setVisibilityState(newVisibility)
  }

  const handlePageChange = (newPage: number) => {
    if (serverSide && onPaginationChange && pagination) {
      onPaginationChange({ ...pagination, page: newPage })
    } else {
      setCurrentPage(newPage)
    }
  }

  // Filter and search data (only if not server-side)
  const filteredData = serverSide
    ? data
    : data.filter((item) => {
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

  // Pagination (only if not server-side)
  const totalPages = serverSide
    ? Math.ceil((pagination?.total || 0) / itemsPerPage)
    : Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = serverSide ? 0 : (currentPage - 1) * itemsPerPage
  const paginatedData = serverSide ? filteredData : filteredData.slice(startIndex, startIndex + itemsPerPage)

  const renderFilterInput = (filter: DataTableFilter) => {
    if (filter.type === "select") {
      return (
        <Select value={filter.value || "all"} onValueChange={(value) => handleFilterChange(filter.key, value)}>
          <SelectTrigger className="w-full sm:w-40">
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
        className="w-full sm:w-40"
      />
    )
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-4">
        <div className="text-center py-12">
          <div className="text-destructive mb-2">Error loading data</div>
          <div className="text-sm text-muted-foreground mb-4">{error}</div>
          {onRetry && (
            <Button onClick={onRetry} variant="outline">
              Try Again
            </Button>
          )}
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {/* Header skeleton */}
        {(title || primaryAction) && (
          <div className="flex items-center justify-between pb-4">
            <Skeleton className="h-10 w-48" />
            {primaryAction && <Skeleton className="h-10 w-32" />}
          </div>
        )}

        {/* Filters skeleton */}
        {filters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.map((_, index) => (
              <Skeleton key={index} className="h-10 w-full sm:w-40" />
            ))}
          </div>
        )}

        {/* Actions and search skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>
          <Skeleton className="h-10 w-full sm:w-64" />
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
      {/* Header with View Selector */}
      {(title || primaryAction) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
          <div className="flex items-center gap-2">
            {title && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-3xl font-bold text-foreground p-0 h-auto hover:bg-transparent"
                  >
                    <span>{currentView ? currentView.name : title}</span>
                    <ChevronDown className="ml-2 h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  <DropdownMenuLabel>Select View</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {views.map((view) => (
                    <DropdownMenuItem
                      key={view.id}
                      onClick={() => handleViewChange(view)}
                      className="flex items-center justify-between"
                    >
                      <span>{view.name}</span>
                      {currentView?.id === view.id && <Check className="h-4 w-4" />}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onCreateView} className="text-primary">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New View
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            {/* Secondary Actions */}
            {onSaveView && (
              <Button
                variant="outline"
                onClick={onSaveView}
                disabled={loading}
                className="flex items-center space-x-1 bg-transparent"
              >
                <Bookmark className="h-4 w-4" />
                <span className="hidden sm:inline">Save View</span>
              </Button>
            )}
            

            {/* Primary Action */}
            {primaryAction && (
              <Button
                variant={primaryAction.variant || "default"}
                onClick={primaryAction.onClick}
                className="flex items-center space-x-2"
                disabled={loading}
              >
                {primaryAction.icon && <primaryAction.icon className="h-4 w-4" />}
                <span>{primaryAction.text}</span>
              </Button>
            )}
            {onExport && (
              <Button
                variant="outline"
                onClick={onExport}
                disabled={loading}
                className="flex items-center space-x-1 bg-transparent"
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
            {onShare && (
              <Button
                variant="outline"
                onClick={onShare}
                disabled={loading}
                className="flex items-center space-x-1 bg-transparent"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            )}
            {onViewsClick && (
              <Button
                variant="outline"
                onClick={onViewsClick}
                disabled={loading}
                className="flex items-center space-x-1 bg-transparent"
              >
                <List className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Bulk Actions Bar */}
      {selectable && selectedItems.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg border border-border">
          <span className="text-sm text-foreground">{selectedItems.length} item(s) selected</span>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleClearSelection}
              className="border-border text-foreground hover:bg-accent bg-transparent"
            >
              Clear
            </Button>
            {bulkActions.map((action, index) => (
              <Button
                key={index}
                size="sm"
                variant={action.variant || "outline"}
                onClick={() => action.onClick(selectedItems)}
                disabled={loading}
                className="border-border text-foreground hover:bg-accent bg-transparent flex items-center space-x-1"
              >
                {action.icon && <action.icon className="h-4 w-4" />}
                <span>{action.label}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Filter Toggle */}
      {filters.length > 0 && (
        <div className="sm:hidden">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {filters.some((f) => f.value) && (
              <span className="ml-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                {filters.filter((f) => f.value).length}
              </span>
            )}
          </Button>
        </div>
      )}

      {/* Filters */}
      {filters.length > 0 && (
        <div className={`${showFilters ? "block" : "hidden"} sm:block`}>
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2">
            {filters.map((filter) => (
              <div key={filter.key} className="w-full sm:w-auto">
                {renderFilterInput(filter)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Actions Row */}
      <div className="flex items-center gap-2">
        {/* Search */}
        {searchable && (
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 w-full"
              disabled={loading}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {/* Filter Button */}
          {filters.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1 bg-transparent px-2 sm:px-3"
                  disabled={loading}
                >
                  <Filter className="h-4 w-4" />
                  <span className="hidden lg:inline">Filter</span>
                  {filters.some((f) => f.value) && (
                    <span className="ml-1 px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                      {filters.filter((f) => f.value).length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="end">
                <div className="space-y-4">
                  <h4 className="font-medium leading-none">Filters</h4>
                  {filters.map((filter) => (
                    <div key={filter.key} className="space-y-2">
                      <label className="text-sm font-medium">{filter.label}</label>
                      {renderFilterInput(filter)}
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Column Visibility Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-1 bg-transparent px-2 sm:px-3"
                disabled={loading}
              >
                <Columns className="h-4 w-4" />
                <span className="hidden lg:inline">Columns</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {columns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.key}
                  className="capitalize"
                  checked={visibilityState[column.key] !== false}
                  onCheckedChange={(value) => handleColumnVisibilityChange(column.key, !!value)}
                >
                  {column.header}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
              {visibleColumns.map((column) => (
                <div key={column.key} className={`${column.width || "flex-1 min-w-[150px]"} px-2 flex-shrink-0`}>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium text-foreground whitespace-nowrap">{column.header}</span>
                    {column.sortable !== false && onSortingChange && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => handleSortChange(column.key)}
                        disabled={loading}
                      >
                        {getSortIcon(column.key)}
                      </Button>
                    )}
                  </div>
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
                  {visibleColumns.map((column) => (
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center sm:text-left">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, serverSide ? pagination?.total || 0 : filteredData.length)} of{" "}
            {serverSide ? pagination?.total || 0 : filteredData.length} results
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              className="flex items-center space-x-1"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    disabled={loading}
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
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
              className="flex items-center space-x-1"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
