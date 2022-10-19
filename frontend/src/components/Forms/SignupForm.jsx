/* eslint-disable no-unused-vars */
import {useState, useContext} from "react";
import "./index.css";
import {ModalContext} from "../../modal";
import {signup} from "../../store/session.js";
import {useDispatch} from "react-redux";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const {handleModal} = useContext(ModalContext);
  const dispatch = useDispatch();

  const signupHandler = async (e) => {
    e.preventDefault();
    if (password !== repeatPass) {
      console.log("Passes don't match!");
      return null;
    }
    const data = await dispatch(signup(username, password));
    if (data.errors) {
      console.log(data.errors); 
      return null;
    }
    handleModal();
    return null;
  };

  return (
    <div className="form-container">
      <form onSubmit={signupHandler}>
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
	<input type="password"
	      name="repeatPass"
	      autoComplete="off"
	      placeholder="repeat password"
	      value={repeatPass}
	      onChange={e => setRepeatPass(e.target.value)}/>
	<br/>
	<input type="submit" name="submit"/>
      </form>
    </div>
  );
};

export default function SignupButton() {
  const {handleModal} = useContext(ModalContext);
  return (
    <button onClick={() => handleModal(<SignupForm />)}>
      Signup
    </button>
  );
};
