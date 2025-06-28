"use client"

import type * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  Building2,
  Mail,
  CheckSquare,
  Calendar,
  BookOpen,
  Users,
  Settings,
  User,
  LogOut,
  FileText,
  Crown,
  UserCheck,
  Target,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setActiveTab } from "@/lib/features/navigation/navigationSlice"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    key: "dashboard",
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Mail,
    key: "inbox",
  },
  {
    title: "Properties",
    url: "/properties",
    icon: Building2,
    key: "properties",
  },
  {
    title: "Intents",
    url: "/intents",
    icon: Target,
    key: "intents",
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: CheckSquare,
    key: "tasks",
  },
  {
    title: "Reservations",
    url: "/reservations",
    icon: Calendar,
    key: "reservations",
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
    key: "users",
  },
  {
    title: "Owners",
    url: "/owners",
    icon: Crown,
    key: "owners",
  },
  {
    title: "Guests",
    url: "/guests",
    icon: UserCheck,
    key: "guests",
  },
  {
    title: "Guest Guide",
    url: "/guest-guide",
    icon: BookOpen,
    key: "guest-guide",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    key: "settings",
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
    key: "profile",
  },

]

const bottomItems = [
  {
    title: "Logout",
    url: "/logout",
    icon: LogOut,
    key: "logout",
  },
  {
    title: "Tenants",
    url: "/tenants",
    icon: FileText,
    key: "tenants",
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const activeTab = useAppSelector((state) => state.navigation.activeTab)

  const handleNavigation = (url: string, key: string) => {
    dispatch(setActiveTab(key))
    router.push(url)
  }

  return (
    <Sidebar {...props} className="border-r border-sidebar-border">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white font-bold text-lg">
            N
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sidebar-foreground text-lg">Nova Vacation</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs font-medium uppercase tracking-wider px-3 py-2">
            APPS & PAGES
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-3">
              {navigationItems.map((item) => {
                const isActive = pathname === item.url || activeTab === item.key
                return (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      onClick={() => handleNavigation(item.url, item.key)}
                      className={`w-full justify-start gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg"
                          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1 px-3 pb-4">
                {bottomItems.map((item) => {
                  const isActive = pathname === item.url || activeTab === item.key
                  return (
                    <SidebarMenuItem key={item.key}>
                      <SidebarMenuButton
                        onClick={() => handleNavigation(item.url, item.key)}
                        className={`w-full justify-start gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg"
                            : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
