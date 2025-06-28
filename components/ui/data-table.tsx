"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Download, Share2, Eye, Save } from "lucide-react"

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
  placeholder?: string
  options?: { value: string; label: string }[]
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

export function DataTable<T extends { id: string | number }>({
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
  emptyDescription,
  filters = [],
  onFilterChange,
  onExport,
  onShare,
  onViewsClick,
  onSaveView,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  const handleRowSelection = (itemId: string, checked: boolean) => {
    if (!onSelectionChange) return

    const currentSelection = [...selectedItems]
    if (checked) {
      currentSelection.push(itemId)
    } else {
      const index = currentSelection.indexOf(itemId)
      if (index > -1) {
        currentSelection.splice(index, 1)
      }
    }
    onSelectionChange(currentSelection)
  }

  const handleSelectAllChange = (checked: boolean) => {
    if (onSelectAll) {
      onSelectAll(checked)
    }
  }

  const filteredData = data.filter((item) => {
    if (!searchTerm) return true
    return Object.values(item).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
  })

  if (loading) {
    return (
      <div className="space-y-4">
        {/* Filters skeleton */}
        {filters.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-4">
            {filters.map((filter) => (
              <div key={filter.key} className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-48" />
              </div>
            ))}
          </div>
        )}

        {/* Action bar skeleton */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>
          <Skeleton className="h-10 w-64" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        {/* Table skeleton */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-muted/50 border-b border-border p-4">
            <div className="flex items-center space-x-4">
              {selectable && <Skeleton className="h-4 w-4" />}
              {columns.map((column) => (
                <Skeleton key={column.key} className="h-4 w-24" />
              ))}
            </div>
          </div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="border-b border-border p-4 last:border-b-0">
              <div className="flex items-center space-x-4">
                {selectable && <Skeleton className="h-4 w-4" />}
                {columns.map((column) => (
                  <Skeleton key={column.key} className="h-6 w-32" />
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
        <div className="flex flex-wrap gap-4 mb-4">
          {filters.map((filter) => (
            <div key={filter.key} className="space-y-2">
              <label className="text-sm font-medium text-foreground">{filter.label}</label>
              {filter.type === "select" ? (
                <Select
                  value={filter.value || "all"}
                  onValueChange={(value) => onFilterChange?.(filter.key, value === "all" ? "" : value)}
                >
                  <SelectTrigger className="w-48 bg-background border-border text-foreground">
                    <SelectValue placeholder={filter.placeholder || `Select ${filter.label.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="all" className="text-foreground hover:bg-accent">
                      All {filter.label}
                    </SelectItem>
                    {filter.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-foreground hover:bg-accent">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type={filter.type}
                  placeholder={filter.placeholder}
                  value={filter.value}
                  onChange={(e) => onFilterChange?.(filter.key, e.target.value)}
                  className="w-48 bg-background border-border text-foreground"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Action Bar */}
      <div className="flex items-center justify-between gap-4">
        {/* Left side - Export and Share */}
        <div className="flex items-center gap-2">
          {onExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="border-border text-foreground hover:bg-accent bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
          {onShare && (
            <Button
              variant="outline"
              size="sm"
              onClick={onShare}
              className="border-border text-foreground hover:bg-accent bg-transparent"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          )}
        </div>

        {/* Center - Search */}
        {searchable && (
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 bg-background border-border text-foreground"
            />
          </div>
        )}

        {/* Right side - Views and Save */}
        <div className="flex items-center gap-2">
          {onViewsClick && (
            <Button
              variant="outline"
              size="sm"
              onClick={onViewsClick}
              className="border-border text-foreground hover:bg-accent bg-transparent"
            >
              <Eye className="h-4 w-4 mr-2" />
              Views
            </Button>
          )}
          {onSaveView && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSaveView}
              className="border-border text-foreground hover:bg-accent bg-transparent"
            >
              <Save className="h-4 w-4 mr-2" />
              Save View
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-muted/50 border-b border-border">
          <div className="flex items-center p-4">
            {selectable && (
              <div className="w-12 flex justify-center">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAllChange}
                  className="border-border data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
              </div>
            )}
            {columns.map((column) => (
              <div key={column.key} className={`${column.width || "flex-1"} px-2`}>
                <span className="text-sm font-medium text-foreground">{column.header}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="bg-background">
          {filteredData.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-lg font-medium text-foreground mb-2">{emptyMessage}</div>
              {emptyDescription && <div className="text-muted-foreground">{emptyDescription}</div>}
            </div>
          ) : (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-4 border-b border-border last:border-b-0 hover:bg-accent/50 cursor-pointer transition-colors"
                onClick={() => onRowClick?.(item)}
              >
                {selectable && (
                  <div className="w-12 flex justify-center">
                    <Checkbox
                      checked={selectedItems.includes(String(item.id))}
                      onCheckedChange={(checked) => handleRowSelection(String(item.id), checked as boolean)}
                      onClick={(e) => e.stopPropagation()}
                      className="border-border data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                  </div>
                )}
                {columns.map((column) => (
                  <div key={column.key} className={`${column.width || "flex-1"} px-2`}>
                    {column.render(item)}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
