"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setActiveTab } from "@/lib/features/navigation/navigationSlice"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  Home,
  Calendar,
  Users,
  Settings,
  Building2,
  MessageSquare,
  BookOpen,
  User,
  CheckSquare,
  Crown,
  UserCheck,
  Target,
} from "lucide-react"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    key: "dashboard",
  },
  {
    title: "Properties",
    url: "/properties",
    icon: Building2,
    key: "properties",
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
    title: "Inbox",
    url: "/inbox",
    icon: MessageSquare,
    key: "inbox",
  },
  {
    title: "Guest Guide",
    url: "/guest-guide",
    icon: BookOpen,
    key: "guest-guide",
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
    key: "profile",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    key: "settings",
  },
]

export function AppSidebar() {
  const dispatch = useAppDispatch()
  const activeTab = useAppSelector((state) => state.navigation.activeTab)
  const pathname = usePathname()

  useEffect(() => {
    const currentItem = navigationItems.find((item) => pathname.startsWith(item.url))
    if (currentItem) {
      dispatch(setActiveTab(currentItem.key))
    }
  }, [pathname, dispatch])

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-background">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-foreground group-data-[collapsible=icon]:hidden">Nova</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeTab === item.key}
                    className="data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700 dark:data-[active=true]:bg-purple-900/20 dark:data-[active=true]:text-purple-300"
                  >
                    <a href={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-4">
        <div className="text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          Nova Vacation Rental Management
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
