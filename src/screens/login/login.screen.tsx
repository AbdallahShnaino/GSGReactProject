import { Link, useNavigate } from "react-router-dom";
import "./login.screen.css";
import { useContext, useReducer, useState } from "react";
import { IUser, Role } from "../../@types";
import { AuthContext } from "../../providers/auth-provider";
import logo from "./../../assets/WE_GROW.png";
import { stateReducer } from "../../state/users.reducer";
import { UsersStateContext } from "../../providers/users-state.provider";
interface IError {
  field: string;
  message: string;
}

const LoginScreen = () => {
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
  const handleSubmit = () => {
    const errors = validateUser(user);
    if (errors.length > 0) {
      setErrorsList(errors);
    } else {
      setLoading((_) => true);
      setErrorsList([]);
      storeUser(state.currentUser!);
    
      setTimeout(() => {
        if(state.currentUser?.role === Role.CLIENT){
          console.log("Navigating to client dashboard");
          navigate("/client");
        }else if(state.currentUser?.role === Role.ADMIN){
          console.log("Navigating to admin dashboard");
          navigate("/admin/invoice/create");
        } else {
          console.error("Unknown user role");
        }
      }, 1500);
    }
  };


  const handleChange = (field: string, value: any) => {
    setUser({ ...user!, [field]: value });
  };

  const validateUser = (user: IUser): IError[] => {
    dispatch({
      type: "GET_USER_WITH_EMAIL",
      payload: user!.email,
    });

    console.log("Validating user:", user);
    console.log("Current state user:", state.currentUser);

    const errors: IError[] = [];


    if (!user || !state.currentUser) {
      errors.push({
        field: "system",
        message: "missing fields or user not exist",
      });
      console.log("errors ", errors);
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
      console.log("errors ", errors);
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
    <>
      <nav className="c-header">
        <img className="header__logo" src={logo} alt="logo" />
      </nav>
      <div className="create-account">
        <div className="create-account__form">
          {loading && <span className="spinner"></span>}

          <div className="welcome">
            <h3>Log In</h3>
            <span>Welcome Back!!</span>
          </div>
          {extractErrorsAsList("system", errorsList).map((e, i) => (
            <span key={i} className="create-account__error">
              {e}
            </span>
          ))}
          <div className="create-account__input">
            {extractErrorsAsList("email", errorsList).map((e, i) => (
              <span key={i} className="create-account__error">
                {e}
              </span>
            ))}
            <input
              className={
                extractErrorsAsList("email", errorsList).length
                  ? "red-border"
                  : "normal-border"
              }
              id="email"
              type="text"
              placeholder="Email Address"
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="create-account__input">
            {extractErrorsAsList("password", errorsList).map((e, i) => (
              <span key={i} className="create-account__error">
                {e}
              </span>
            ))}
            <input
              className={
                extractErrorsAsList("password", errorsList).length
                  ? "red-border"
                  : "normal-border"
              }
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>

          <button className="create-account__button" onClick={handleSubmit}>
            Log In
          </button>
          <span>
            You Don't have an account? <Link to={"/user/create"}>Sign Up</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
