"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import * as React from "react"

interface TableFiltersProps {
  filters: {
    id: string
    label: string
    options: {
      label: string
      value: string
    }[]
  }[]
  onFilterChange: (filters: any) => void
}

export function TableFilters({ filters, onFilterChange }: TableFiltersProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedFilters, setSelectedFilters] = React.useState<any>({})

  const handleFilterChange = (filterId: string, value: string[]) => {
    setSelectedFilters((prevFilters: any) => ({
      ...prevFilters,
      [filterId]: value,
    }))
  }

  const handleApplyFilters = () => {
    onFilterChange(selectedFilters)
    setOpen(false)
  }

  return (
    <TableFiltersPopover
      open={open}
      setOpen={setOpen}
      filters={filters}
      selectedFilters={selectedFilters}
      onFilterChange={handleFilterChange}
      onApplyFilters={handleApplyFilters}
    />
  )
}

interface TableFiltersPopoverProps {
  open: boolean
  setOpen: (open: boolean) => void
  filters: {
    id: string
    label: string
    options: {
      label: string
      value: string
    }[]
  }[]
  selectedFilters: any
  onFilterChange: (filterId: string, value: string[]) => void
  onApplyFilters: () => void
}

export function TableFiltersPopover({
  open,
  setOpen,
  filters,
  selectedFilters,
  onFilterChange,
  onApplyFilters,
}: TableFiltersPopoverProps) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex bg-transparent">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end" alignOffset={-20} forceMount>
        <div className="space-y-4">
          {filters.map((filter) => (
            <div key={filter.id} className="space-y-2">
              <h4 className="text-sm font-medium leading-none">{filter.label}</h4>
              <div className="flex flex-wrap gap-1">
                {filter.options.map((option) => (
                  <Button
                    key={option.value}
                    variant={selectedFilters[filter.id]?.includes(option.value) ? "default" : "outline"}
                    size="xs"
                    onClick={() => {
                      const isSelected = selectedFilters[filter.id]?.includes(option.value)
                      const newValue = isSelected
                        ? selectedFilters[filter.id].filter((value: string) => value !== option.value)
                        : [...(selectedFilters[filter.id] || []), option.value]

                      onFilterChange(filter.id, newValue)
                    }}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end pt-2">
          <Button variant="primary" size="sm" onClick={onApplyFilters}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
