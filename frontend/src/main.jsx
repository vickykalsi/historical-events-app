import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import LoginPage from './components/LoginPage'
import SignupPage from "./components/SignupPage"
import InputPage from "./components/InputPage"
import LikedEventsPage from "./components/LikedEventsPage"
import ErrorHandlerPage from "./errors/ErrorHandlerPage"
import ErrorBoundary from "./errors/ErrorBoundary"
import EditPage from "./components/EditPage"
import Layout from './components/Layout'
import "./stylesheets/common.css"

const router = createBrowserRouter([{
  element: <Layout />,
  errorElement: <ErrorHandlerPage />, // for errors while rendering
  children: [{
    path: "/",
    element: <LoginPage />
  }, {
    path: "/signup",
    element: <SignupPage />
  }, {
    path: "/input",
    element: <InputPage />
  }, {
    path: "/edit",
    element: <EditPage />
  }, {
    path: "/liked-events",
    element: <LikedEventsPage />
  }]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster />
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)
