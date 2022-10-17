/* eslint-disable no-unused-vars */
import {useState} from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    console.log(username,password);
  };

  return (
    <form onSubmit={loginHandler}>
      <input type="text"
             name="username"
             value={username}
             onChange={e => setUsername(e.target.value)}/>
      <br/>
      <input type="text"
             name="password"
             value={password}
             onChange={e => setPassword(e.target.value)}/>
      <br/>
      <input type="submit" name="submit"/>
    </form>
  );
};
