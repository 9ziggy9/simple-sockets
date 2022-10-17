/* eslint-disable no-unused-vars */
import {useState, useContext} from "react";
import {ModalContext} from "../../modal";
import {useDispatch} from "react-redux";
import {login} from "../../store/session";

function LoginForm() {
  const {handleModal} = useContext(ModalContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    const data = await dispatch((login(name, password)));
    handleModal(); // Close modal
  };

  return (
    <form onSubmit={loginHandler}>
      <input type="text"
             name="name"
	     autoComplete="off"
             placeholder="name"
             value={name}
             onChange={e => setName(e.target.value)}/>
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

