import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Onboarding, Scene} from './App';
import {Home} from './Home';

import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Tutorial from './Tutorial';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/game",
    element: <Scene/>,
  },
  {
    path: "/",
    element: <Onboarding/>,
  },
  {
    path: "/Home",
    element: <Home/>,
  },
  {
    path: "/Tutorial",
    element: <Tutorial/>,
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
