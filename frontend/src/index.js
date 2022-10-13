/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Hello from "./components/Sandbox/Hello.jsx";
import World from "./components/Sandbox/World.jsx";
// Basically provides browser router context
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
	<Route path="/" element={<App />} >
	  <Route path="hello" element={<Hello />} />
	  <Route path="world" element={<World />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
