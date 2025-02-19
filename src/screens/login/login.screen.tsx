import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { IUser, Role } from "../../@types";
import { AuthContext } from "../../providers/auth-provider";
import { UsersStateContext } from "../../providers/users-state.provider";
import GuestHeader from "../../components/guestHeader/guestHeader";
import "./login.screen.css";
interface IError {
  field: string;
  message: string;
}

const LoginScreen2 = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>({
    address: "",
    email: "",
    id: "",
    name: "",
    password: "",
    phone: "",
    role: Role.CLIENT,
  });

  const [errorsList, setErrorsList] = useState<IError[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const useUsers = () => useContext(UsersStateContext);
  const { state, dispatch } = useUsers();
  const { storeUser } = useContext(AuthContext);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const errors = validateUser(user);
    if (errors.length > 0) {
      setErrorsList(errors);
    } else {
      setLoading(true);
      setErrorsList([]);
      storeUser(state.currentUser!);
    
      setTimeout(() => {
        if(state.currentUser?.role === Role.CLIENT){
          navigate("/client");
        }else if(state.currentUser?.role === Role.ADMIN){
          navigate("/admin/invoice/create");
        } else {
          console.error("Unknown user role");
        }
      }, 1500);
    }
  };

  const handleChange = (field: string, value: string) => {
    setUser({ ...user, [field]: value });
  };

  const validateUser = (user: IUser): IError[] => {
    dispatch({
      type: "GET_USER_WITH_EMAIL",
      payload: user.email,
    });

    const errors: IError[] = [];

    if (!user || !state.currentUser) {
      errors.push({
        field: "system",
        message: "missing fields or user not exist",
      });
    }
    if (
      user &&
      state.currentUser &&
      user.password != state.currentUser.password
    ) {
      errors.push({
        field: "system",
        message: "password not correct, try again",
      });
    }
    if (!user || user.email.length < 1) {
      errors.push({
        field: "email",
        message: "The email address must contain @ and . symbols",
      });
    }

    if (!user || user.password.length < 8) {
      errors.push({
        field: "password",
        message: "The password must be more than 9 letters",
      });
    }

    return errors;
  };

  const extractErrorsAsList = (field: string, errors: IError[]) => {
    return errors
      .filter((error) => error.field === field)
      .map((error) => error.message);
  };

  return (
    <div className="login-screen">
      <GuestHeader/>
      <div className="corner-square up"></div>
      <div className="corner-square down"></div>
      <form action="" className="login-from">
        <h1 className="form-title">Login</h1>
        <span className="cta-text">
          make your business faster and safer with us
        </span>

        <input 
          type="email" 
          onChange={(e) => handleChange("email", e.target.value)} 
          name="email" 
          id="email" 
          className="input" 
          placeholder="Email" 
        />
        <input 
          type="password" 
          onChange={(e) => handleChange("password", e.target.value)} 
          name="password" 
          id="password" 
          className="input" 
          placeholder="Password" 
        />
        {extractErrorsAsList("system", errorsList).map((e, i) => (
          <p key={i} className="error">{e}</p>
        ))}
        <button 
          className="btn login-btn" 
          onClick={handleSubmit}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="signup-text">
          Don't have an account? <Link to="/user/create">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginScreen2;
