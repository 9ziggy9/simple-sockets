/* eslint-disable no-unused-vars */
import './index.css';
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx";
import {Outlet, Link} from "react-router-dom";

function App() {
  return (
    <>
      <nav>
	<Link to="/hello">Hello</Link>
	<Link to="/world">World</Link>
      </nav>
      <h1>Hello, World</h1>
      <Outlet />
    </>
  );
}

export default App;
