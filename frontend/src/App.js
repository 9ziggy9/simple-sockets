/* eslint-disable no-unused-vars */
import './index.css';
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx";
import {Outlet, Link} from "react-router-dom";
import {useState} from "react";

function App() {
  const [user, setUser] = useState(null);
  const handleLogin = () => setUser({id: "1", name: "ziggy", "password":"lel"});
  const handleLogout = () => setUser(null);
  return (
    <>
      <Navigation />
      <div>
	{user // conditional rendering
	 ? (<button onClick={handleLogout}>Logout</button>)
	 : (<button onClick={handleLogin}>Login</button>)}
	{user ? null: (<button>Signup</button>)}
	</div>
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
