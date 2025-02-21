// import Cookies from "js-cookie"
import { lazy, Suspense } from "react"
import { Outlet, Navigate, useRoutes } from "react-router-dom"

import Box from "@mui/material/Box"
import LinearProgress, {
  linearProgressClasses
} from "@mui/material/LinearProgress"

import { varAlpha } from "src/theme/styles"
import { AuthLayout } from "src/layouts/auth"
import { useAuth } from "src/context/AuthContext"
import { DashboardLayout } from "src/layouts/dashboard"
// ----------------------------------------------------------------------

export const HomePage = lazy(() => import("src/pages/home"))
export const PlatePage = lazy(() => import("src/pages/Plate"))
export const PermisionPage = lazy(() => import("src/pages/permisions"))
export const CarsPage = lazy(() => import("src/pages/cars"))
export const UserPage = lazy(() => import("src/pages/user"))
export const SignInPage = lazy(() => import("src/pages/sign-in"))
export const SignUpPage = lazy(() => import("src/pages/sign-up"))
export const ProfilePage = lazy(() => import("src/pages/profile"))
export const Page404 = lazy(() => import("src/pages/page-not-found"))

// ----------------------------------------------------------------------

const PrivateRoute = () => {
  const { isLoggedin, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return isLoggedin ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

const PublicRoute = () => {
  const { isLoggedin } = useAuth();
  
  return isLoggedin ? <Navigate to="/dashboard/users" replace /> : <Outlet />;
};


const renderFallback = (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    flex="1 1 auto"
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: theme =>
          varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: "text.primary" }
      }}
    />
  </Box>
)

export function Router() {
  return useRoutes([
    {
      path: "/",
      element: <PublicRoute />, 
      
      children: [
        { element: <AuthLayout >
          <Suspense fallback={renderFallback}> <Outlet /> </Suspense>
        </AuthLayout>, children: [
          { path: "sign-in", element: <SignInPage /> },
          { path: "sign-up", element: <SignUpPage /> },
          { index: true, element: <Navigate to="/sign-in" replace /> }
        ]
         },
        
      ],
    },

    {
      path: "/dashboard",
      element: <PrivateRoute />, 
      children: [
        {
          element: (
            <DashboardLayout>
              <Suspense fallback={renderFallback}>
                <Outlet />
              </Suspense>
            </DashboardLayout>
          ),
          children: [
            { path: "users", element: <UserPage /> },
            { path: "profile", element: <ProfilePage /> },
            { path: "plate", element: <PlatePage /> },
            { path: "Cars", element: <CarsPage /> },
            { path: "permisions", element: <PermisionPage /> },
            { element: <HomePage />, index: true },
          ],
        },
      ],
    },

    { path: "404", element: <Page404 /> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
