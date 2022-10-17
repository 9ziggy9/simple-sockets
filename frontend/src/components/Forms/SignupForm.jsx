/* eslint-disable no-unused-vars */
import {useState, useContext} from "react";
import {ModalContext} from "../../modal";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const {handleModal} = useContext(ModalContext);

  const signupHandler = (e) => {
    e.preventDefault();
    console.log(username,password,repeatPass);
    handleModal();
  };

  return (
    <form onSubmit={signupHandler}>
      <input type="text"
             name="username"
             placeholder="username"
             value={username}
             onChange={e => setUsername(e.target.value)}/>
      <br/>
      <input type="password"
             name="password"
             placeholder="password"
             value={password}
             onChange={e => setPassword(e.target.value)}/>
      <br/>
      <input type="password"
             name="repeatPass"
             placeholder="repeat password"
             value={repeatPass}
             onChange={e => setRepeatPass(e.target.value)}/>
      <br/>
      <input type="submit" name="submit"/>
    </form>
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
