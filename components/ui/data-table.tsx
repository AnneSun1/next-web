"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Search } from "lucide-react"

export interface DataTableColumn<T> {
  key: string
  header: string
  width?: string
  render: (item: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  loading?: boolean
  searchable?: boolean
  searchPlaceholder?: string
  selectable?: boolean
  selectedItems?: any[]
  onSelectionChange?: (selectedIds: any[]) => void
  onSelectAll?: (checked: boolean) => void
  isAllSelected?: boolean
  onRowClick?: (item: T) => void
  emptyMessage?: string
  emptyDescription?: string
}

export function DataTable<T extends { id: number | string }>({
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
  emptyDescription = "There are no items to display",
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = searchable
    ? data.filter((item) =>
        Object.values(item).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
      )
    : data

  const handleRowClick = (item: T, event: React.MouseEvent) => {
    // Don't trigger row click if clicking on checkbox or action buttons
    const target = event.target as HTMLElement
    if (target.closest('input[type="checkbox"]') || target.closest("button")) {
      return
    }

    if (onRowClick) {
      onRowClick(item)
    }
  }

  const handleSelectionChange = (itemId: any, checked: boolean) => {
    if (!onSelectionChange) return

    let newSelection = [...selectedItems]
    if (checked) {
      newSelection.push(itemId)
    } else {
      newSelection = newSelection.filter((id) => id !== itemId)
    }
    onSelectionChange(newSelection)
  }

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg">
        {searchable && (
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                className="pl-10 bg-muted border-border text-foreground"
                disabled
              />
            </div>
          </div>
        )}
        <div className="p-8">
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      {searchable && (
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted border-border text-foreground"
            />
          </div>
        </div>
      )}

      {filteredData.length === 0 ? (
        <div className="p-8 text-center">
          <div className="text-muted-foreground mb-2">{emptyMessage}</div>
          <div className="text-sm text-muted-foreground">{emptyDescription}</div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {selectable && (
                  <th className="w-12 p-4 text-left">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={onSelectAll}
                      className="border-border data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`p-4 text-left text-sm font-medium text-muted-foreground ${column.width || ""}`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  onClick={(e) => handleRowClick(item, e)}
                  className={`border-b border-border last:border-b-0 transition-colors ${
                    onRowClick ? "cursor-pointer hover:bg-accent/50" : ""
                  }`}
                >
                  {selectable && (
                    <td className="p-4">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(checked) => handleSelectionChange(item.id, checked as boolean)}
                        className="border-border data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className={`p-4 ${column.width || ""}`}>
                      {column.render(item)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
