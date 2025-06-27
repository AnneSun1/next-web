"use client"

import { useState } from "react"
import { Search, Languages, Star, Bell, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSidebar } from "@/components/ui/sidebar"

export function TopBar() {
  const [searchValue, setSearchValue] = useState("")
  const { toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left side - Toggle and Search */}
        <div className="flex items-center space-x-4 flex-1 max-w-md">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search ⌘K"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full bg-muted border-border pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                  e.preventDefault()
                  e.currentTarget.focus()
                }
              }}
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-2">
          {/* Language/Translate */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                <Languages className="h-4 w-4" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background border-border">
              <DropdownMenuLabel className="text-foreground">Language</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground">
                English (US)
              </DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground">
                Español
              </DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground">
                Français
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Favorites/Starred */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Star className="h-4 w-4" />
            <span className="sr-only">Favorites</span>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-accent relative"
              >
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive p-0 text-xs text-destructive-foreground flex items-center justify-center">
                  3
                </Badge>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-background border-border">
              <DropdownMenuLabel className="text-foreground">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <div className="max-h-96 overflow-y-auto">
                <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground p-4 flex-col items-start">
                  <div className="font-medium">New booking received</div>
                  <div className="text-sm text-muted-foreground">Ocean View Villa - Alice Johnson</div>
                  <div className="text-xs text-muted-foreground mt-1">2 minutes ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground p-4 flex-col items-start">
                  <div className="font-medium">Maintenance request</div>
                  <div className="text-sm text-muted-foreground">Downtown Loft - Air conditioning issue</div>
                  <div className="text-xs text-muted-foreground mt-1">1 hour ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground p-4 flex-col items-start">
                  <div className="font-medium">Payment received</div>
                  <div className="text-sm text-muted-foreground">Mountain Cabin - $1,400 payment confirmed</div>
                  <div className="text-xs text-muted-foreground mt-1">3 hours ago</div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="text-primary hover:bg-accent hover:text-primary justify-center">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 w-9 rounded-full p-0 relative">
                <img
                  src="/placeholder.svg?height=36&width=36"
                  alt="Profile"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background border-border">
              <DropdownMenuLabel className="text-foreground">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium text-foreground">John Doe</p>
                  <p className="text-xs text-muted-foreground">john.doe@novavacation.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground">
                <Star className="mr-2 h-4 w-4" />
                Favorites
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="text-destructive hover:bg-accent hover:text-destructive">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
