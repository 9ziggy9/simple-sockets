/* eslint-disable no-unused-vars */
import {useState, useContext} from "react";
import {ModalContext} from "../../modal";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../store/session";

function LoginForm() {
  const {handleModal} = useContext(ModalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    const data = await dispatch((login(username, password)));
    handleModal(); // Close modal
  };

  return (
    <form onSubmit={loginHandler}>
      <input type="text"
             name="username"
	     autoComplete="off"
             placeholder="username"
             value={username}
             onChange={e => setUsername(e.target.value)}/>
      <br/>
      <input type="password"
             name="password"
	     autoComplete="off"
             placeholder="password"
             value={password}
             onChange={e => setPassword(e.target.value)}/>
      <br/>
      <input type="submit" name="submit"/>
    </form>
  );
};

export default function LoginButton() {
  const {handleModal} = useContext(ModalContext);
  return (
    <button onClick={() => handleModal(<LoginForm />)}>
      Login
    </button>
  );
};

