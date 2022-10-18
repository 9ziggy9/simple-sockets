/* eslint-disable react-hooks/exhaustive-deps */
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
      <NavBar />
      <AuthBar />
      <h1>Hello, World</h1>
      <Outlet />
    </>
  );
}

function AuthBar() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // One can easily verify with network throttling that if this is
    // not wrapped in an IIFE then a race-condition is possible.
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) return (<h2>... loading ...</h2>);

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

function NavBar() {
  return (
    <nav>
      <Link to="/hello">Hello</Link>
      <Link to="/world">World</Link>
    </nav>
  );
}

export default App;
