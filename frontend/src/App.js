/* eslint-disable no-unused-vars */
import './index.css';
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx";
import {Outlet, Link} from "react-router-dom";

function App() {
  return (
    <>
      <Navigation />
      <h1>Hello, World</h1>
      <Outlet />
    </>
  );
}

function Navigation() {
  return (
    <nav>
      <Link to="/hello">Hello</Link>
      <Link to="/world">World</Link>
    </nav>
  );
}

export default App;
