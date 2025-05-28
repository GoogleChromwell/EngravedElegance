import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NotFoundError from './components/RouterErrors/NotFoundError.jsx'
import Register from './components/Authentication/Register.jsx'
import Cart from './pages/Cart.jsx'
import Orders from './pages/Orders.jsx'
import Customer from './pages/Customer.jsx'
import Staff from './pages/Staff.jsx'

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
    path: '/Cart',
    element: <Cart/>,
  },
  {
    path: '/Orders',
    element: <Orders/>,
  },
  {
    path: '/Customer',
    element: <Customer/>,
  },
  {
    path: '/Staff',
    element: <Staff/>,
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
