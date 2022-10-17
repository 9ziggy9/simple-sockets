/* eslint-disable no-unused-vars */
import './index.css';
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx";
import {ModalProvider} from "./modal";
import {Outlet, Link} from "react-router-dom";
import {useState, useEffect} from "react";
import LoginButton from "./components/Forms/LoginForm.jsx";
import SignupButton from "./components/Forms/SignupForm.jsx";
import {useSelector, useDispatch} from "react-redux";
import {logout, authenticate} from "./store/session";

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
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);

  const handleLogout = () => dispatch(logout());
  return (
    <div>
      {user ? (<button onClick={handleLogout}>Logout</button>) : (
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
