import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Toaster} from 'react-hot-toast'

import App from './App.jsx'
import Jobs from './components/Jobs.jsx';
import AdminDashboard from './components/AdminDashBoard.jsx';

let router = createBrowserRouter([
  { 
    path : "/",
    element : <App/>
  },{ 
    path : "/recruiter",
    element : <AdminDashboard/>
  },
  {
    path : "/user",
    element : <Jobs/>
  },
  {
    path : "*",
    element : <h1>404 Not Found</h1>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
    <Toaster position="top-center" reverseOrder={false} /> 
  </StrictMode>
)
