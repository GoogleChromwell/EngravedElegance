import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NotFoundError from './components/RouterErrors/NotFoundError.jsx'
import Register from './components/Authentication/Register.jsx'
import CustomerTable from './components/Tables/CustomerTable.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
    errorElement: <NotFoundError/>,
  },
  {
    path: '/Dashboard',
    element: <Dashboard/>,
  },
  {
    path: '/Register',
    element: <Register/>,
  },
  {
    path: '/CustomerTable',
    element: <CustomerTable/>,
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
