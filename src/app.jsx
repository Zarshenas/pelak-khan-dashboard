import "src/global.css"

// import Fab from "@mui/material/Fab"

import { Router } from "src/routes/sections"

import { useScrollToTop } from "src/hooks/use-scroll-to-top"

import { ThemeProvider } from "src/theme/theme-provider"

// import { Iconify } from "src/components/iconify/iconify"
import { AuthProvider } from "./context/AuthContext"

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop()

  

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AuthProvider>
  )
}
