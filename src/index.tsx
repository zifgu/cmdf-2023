import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Onboarding} from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {Scene} from "./components/Scene";
import {Select} from "./components/Select";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/game",
    element: <Scene/>,
  },
  {
    path: "/select",
    element: <Select/>,
  },
  {
    path: "/",
    element: <Onboarding/>,
  },
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
