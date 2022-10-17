/* eslint-disable no-unused-vars */
import './index.css';
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx";
import {ModalProvider} from "./modal";
import {Outlet, Link} from "react-router-dom";
import {useState} from "react";
import LoginButton from "./components/Forms/LoginForm.jsx";
import SignupButton from "./components/Forms/SignupForm.jsx";

function App() {
  return (
    <>
      <Nav />
      <Auth />
      <h1>Hello, World</h1>
      <Outlet />
    </>
  );
}

function Auth() {
  const [user, setUser] = useState(null);
  const handleLogout = () => setUser(null);
  return (
    <div>
      {user ? (<button>Logout</button>) : (
        <ModalProvider>
          <LoginButton />
          <SignupButton />
        </ModalProvider>
      )}
    </div>
  );
}

function Nav() {
  return (
    <nav>
      <Link to="/hello">Hello</Link>
      <Link to="/world">World</Link>
    </nav>
  );
}

export default App;
