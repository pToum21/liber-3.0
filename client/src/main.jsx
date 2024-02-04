import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Error from './pages/Error.jsx';
// for routing process
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// this establishes pages component structure and their paths
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    // these will be the children components and paths that will be injected into Outlet
    children: [
      // include objects here. each object will be a (url) path and element <>
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
