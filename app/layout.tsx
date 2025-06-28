import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ReduxProvider } from "@/components/providers/redux-provider"
import { ToastProvider } from "@/components/providers/toast-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TopBar } from "@/components/top-bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nova Vacation - Property Management",
  description: "Comprehensive property management system",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider  defaultTheme="system" >
          <ReduxProvider>
            <SidebarProvider defaultOpen={true}>
              <div className="flex min-h-screen w-full">
  {/* Sidebar (left) */}
  <AppSidebar />

  {/* Main content container (right) */}
  <div className="flex flex-col flex-1 max-w-full">
    {/* TopBar - must be inside a non-scrollable parent */}
    <div className="sticky top-0 z-50 bg-background">
      <TopBar />
    </div>

    {/* Scrollable main area */}
    <div className="flex-1 overflow-y-auto overflow-x-auto flex-wrap">
      <main className="bg-background">{children}</main>
    </div>
  </div>
</div>

              <ToastProvider />
            </SidebarProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
