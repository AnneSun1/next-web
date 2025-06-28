import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface NavigationState {
  activeTab: string
  isCollapsed: boolean
}

const initialState: NavigationState = {
  activeTab: "dashboard",
  isCollapsed: false,
}

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload
    },
    toggleSidebar: (state) => {
      state.isCollapsed = !state.isCollapsed
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload
    },
  },
})

export const { setActiveTab, toggleSidebar, setSidebarCollapsed } = navigationSlice.actions
export default navigationSlice.reducer
