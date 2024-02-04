import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Error from './pages/Error.jsx';
// for routing process
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import pages to be used as children
import Home from './pages/Home.jsx';
import MyLibrary from './pages/MyLibrary.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import SingleBook from './pages/SingleBook.jsx';
import BookReader from './pages/BookReader.jsx'

// this establishes pages component structure and their paths
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    // these will be the children components and paths that will be injected into Outlet
    children: [
      // include objects here. each object will be a (url) path and element <>
      {
        // this index: true means home will be the default path that matches App.jsx, other children objects should not have index:true.
        index: true,
        element: <Home />
      },
      {
        path:'/myLibrary',
        element: <MyLibrary />
      },
      {
        path:'/login',
        element: <Login />
      },
      {
        path:'/signup',
        element: <Signup />
      },
      {
        path:'/singleBook/:id',
        element: <SingleBook />
      }, 
      {
        path:'/bookReader/:bookId',
        element: <BookReader />
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
