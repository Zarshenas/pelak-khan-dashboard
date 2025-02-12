import ReactDOM from "react-dom/client"
import { Suspense, StrictMode } from "react"
import { BrowserRouter } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { AuthProvider } from "./context/AuthContext"

import App from "./app"

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <StrictMode>
    <HelmetProvider>
        <BrowserRouter>
      <AuthProvider>
          <Suspense>
            <App />
          </Suspense>
      </AuthProvider>
        </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)
