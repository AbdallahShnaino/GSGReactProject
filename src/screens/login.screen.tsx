import { useState } from "react";
import "./login.css";
import { IUser } from "../@types";


const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const login = (email: string, password: string) => {
    if (email === "") {
      return setError("Email is required");
    }
    if (password === "") {
      return setError("Password is required");
    }
    if (email !== "" && password !== "") {

      const users: IUser[] = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((user) => user.clientEmail === email && user.clientPassword === password);
      if (user) {
        localStorage.setItem("user-data",JSON.stringify(user))
        setIsLogin(!isLogin);
        console.log(user);
      }
      else {
        setError("Invalid email or password");
      }
    }
  }


  return (
    <div className="login-screen">
      <div className="corner-square up"></div>
      <div className="corner-square down"></div>
      <form action="" className="login-from">
        <h1 className="form-title">
          Login
        </h1>
        <span className="cta-text">
          make your business faster and safer with us
        </span>

        <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="input" placeholder="Email" />
        <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="input" placeholder="Password" />
        <p className="error">
          {error}
        </p>
        <button className="btn login-btn" onClick={(e) => {
        e.preventDefault()
          login(email, password)
          }}>Login</button>
        <p className="signup-text">
          Don't have an account?
        </p>
      </form>
    </div>
  );
}

export default LoginScreen;
