/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Hello from "./components/Sandbox/Hello.jsx";
import World from "./components/Sandbox/World.jsx";
import NumWorld from "./components/Sandbox/NumWorld.jsx";
import LoginForm from "./components/Forms/LoginForm.jsx";
import SignupForm from "./components/Forms/SignupForm.jsx";
import {ModalProvider} from "./modal";

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
	  <Route path="world" element={<World />}>
            <Route path=":worldId" element={<NumWorld />}/>
          </Route>
          <Route path="*" element={<h1>404: NOTHING TO SEE HERE</h1>}/>
        </Route>
        <Route path="/debug" element={<SignupForm />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
