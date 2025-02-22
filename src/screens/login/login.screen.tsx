import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { IUser, Role } from "../../@types";
import { AuthContext } from "../../providers/auth-provider";
import { UsersStateContext } from "../../providers/users-state.provider";
import GuestHeader from "../../components/guestHeader/guestHeader";
import "./login.screen.css";
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

  // Fetch user before validating login (to make sure state.currentUser is populated)
  useEffect(() => {
    if (user.email) {
      dispatch({
        type: "GET_USER_WITH_EMAIL",
        payload: user.email,
      });
    }
  }, [user.email, dispatch]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevents form from submitting and reloading
    const errors = validateUser(user);
    if (errors.length > 0) {
      setErrorsList(errors);
    } else {
      setLoading(true);
      setErrorsList([]);
      storeUser(state.currentUser!);

      setTimeout(() => {
        if (state.currentUser?.role === Role.CLIENT) {
          console.log(state.currentUser?.role);
          navigate("/client");
        } else if (state.currentUser?.role === Role.ADMIN) {
          console.log("Navigating to admin dashboard");
          navigate("/admin/invoice/create");
        } else {
          console.error("Unknown user role");
        }
      }, 1500);
    }
  };

  const handleChange = (field: string, value: any) => {
    setUser({ ...user, [field]: value });
  };

  const validateUser = (user: IUser): IError[] => {
    const errors: IError[] = [];

    if (!user.email || !state.currentUser) {
      errors.push({
        field: "system",
        message: "User not found or missing fields.",
      });
    }

    // Password should be at least 8 characters long
    if (user.password.length < 8) {
      errors.push({
        field: "password",
        message: "Password must be at least 8 characters long.",
      });
    }

    // Email validation (basic check for @ and . symbols)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(user.email)) {
      errors.push({
        field: "email",
        message: "Please enter a valid email address.",
      });
    }

    // Check if the password is correct
    if (
      user.password.length > 8 &&
      state.currentUser &&
      user.password !== state.currentUser.password
    ) {
      errors.push({
        field: "password",
        message: "Incorrect password, please try again.",
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
      <GuestHeader activeClass="Sign In" />
      <div className="corner-square up"></div>
      <div className="corner-square down"></div>
      <form action="" className="login-from" onSubmit={handleSubmit}>
        <h1 className="form-title">Login</h1>
        <span className="cta-text">
          make your business faster and safer with us
        </span>
        {extractErrorsAsList("system", errorsList).map((e, i) => (
          <p key={i} className="error">
            {e}
          </p>
        ))}
        {extractErrorsAsList("email", errorsList).map((e, i) => (
          <p key={i} className="error">
            {e}
          </p>
        ))}
        <input
          type="email"
          onChange={(e) => handleChange("email", e.target.value)}
          name="email"
          id="email"
          className="input"
          placeholder="Email"
        />
        {extractErrorsAsList("password", errorsList).map((e, i) => (
          <p key={i} className="error">
            {e}
          </p>
        ))}
        <input
          type="password"
          onChange={(e) => handleChange("password", e.target.value)}
          name="password"
          id="password"
          className="input"
          placeholder="Password"
        />

        <button className="btn login-btn" type="button" onClick={handleSubmit}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="signup-text">
          Don't have an account? <Link to="/user/create">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginScreen;
