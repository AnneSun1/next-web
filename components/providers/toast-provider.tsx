"use client"

import { Toaster } from "sonner"

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "rgb(30 41 59)", // slate-800
          border: "1px solid rgb(51 65 85)", // slate-700
          color: "rgb(248 250 252)", // slate-50
        },
      }}
    />
  )
}
