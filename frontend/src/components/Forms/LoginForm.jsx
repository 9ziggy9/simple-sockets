/* eslint-disable no-unused-vars */
import {useState, useContext} from "react";
import {ModalContext} from "../../modal";

function LoginForm() {
  const {handleModal} = useContext(ModalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    console.log(username,password);
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

