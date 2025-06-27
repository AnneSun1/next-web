"use client"

import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface PageHeaderProps {
  title: string
  description?: string
  buttonText?: string
  buttonIcon?: LucideIcon
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  onButtonClick?: () => void
}

export function PageHeader({
  title,
  description,
  buttonText,
  buttonIcon: ButtonIcon,
  buttonVariant = "default",
  onButtonClick,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      {buttonText && onButtonClick && (
        <Button variant={buttonVariant} onClick={onButtonClick} className="flex items-center space-x-2">
          {ButtonIcon && <ButtonIcon className="h-4 w-4" />}
          <span>{buttonText}</span>
        </Button>
      )}
    </div>
  )
}
