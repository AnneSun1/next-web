import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface NavigationState {
  activeTab: string
  sidebarOpen: boolean
}

const initialState: NavigationState = {
  activeTab: "dashboard",
  sidebarOpen: true,
}

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
  },
})

export const { setActiveTab, toggleSidebar, setSidebarOpen } = navigationSlice.actions
export default navigationSlice.reducer
