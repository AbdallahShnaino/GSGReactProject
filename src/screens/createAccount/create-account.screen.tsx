import { useContext, useState } from "react";
import "./create-account.screen.css";
import { IUser, Role } from "../../@types";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/auth-provider";
import { UsersStateContext } from "../../providers/users-state.provider";
import GuestHeader from "../../components/guestHeader/guestHeader";

interface IError {
  field: string;
  message: string;
}

const CreateAccount = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>({
    address: "",
    email: "",
    name: "",
    id: "",
    password: "",
    phone: "",
    role: Role.CLIENT,
  });

  const [errorsList, setErrorsList] = useState<IError[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const { storeUser } = useContext(AuthContext);
  const { dispatch } = useContext(UsersStateContext);

  const handleSubmit = () => {
    const newUser: IUser = {
      ...user!,
      id: `CLI-2025${Math.trunc(Math.random() * 1000000000)}`,
    };

    const errors = validateUser(newUser);
    if (errors.length > 0) {
      setErrorsList(errors);
    } else {
      setLoading((_) => true);
      setErrorsList([]);
      onSubmit(newUser);
      dispatch({ type: "ADD_USER", payload: newUser });
      setTimeout(() => {
        user.role == Role.CLIENT ? navigate("/client") : navigate("/admin/invoice/create");
      }, 1500);
    }
  };

  const onSubmit = (user: IUser) => {
    storeUser(user);
  };

  const handleChange = (field: string, value: any) => {
    setUser({ ...user!, [field]: value });
  };

  const validateUser = (newUser: IUser): IError[] => {
    const errors: IError[] = [];
    if (newUser.name.length < 1 || newUser.name.length < 4) {
      errors.push({
        field: "name",
        message: "The name must be more than 3 letters",
      });
    }
    if (newUser.address.length < 1 || newUser.address.length < 7) {
      errors.push({
        field: "address",
        message: "The address must be more than 7 letters",
      });
    }

    if (newUser.email.length < 1) {
      errors.push({
        field: "email",
        message: "The email address must contain @ and . symbols",
      });
    }
    if (
      newUser.phone.length != 10 ||
      !(newUser.phone.startsWith("056") || newUser.phone.startsWith("059"))
    ) {
      errors.push({
        field: "phone",
        message: "The phone number must math 0591234567 or 0561234567",
      });
    }
    if (newUser.password.length < 8) {
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
      <GuestHeader activeClass="Sign up" />
      <div className="login-screen">
        <div className="corner-square up"></div>
        <div className="corner-square down"></div>
        {loading && <span className="spinner"></span>}

        <div className="login-from .sign-up-form">
          <div className="welcome">
            <h3 className="form-title">Create An Account</h3>
            <span className="cta-text">
              Create an account to enjoy all the services!!!
            </span>
          </div>
          <div className=" create-account__input ">
            {extractErrorsAsList("name", errorsList).map((e, i) => (
              <span key={i} className="create-account__error">
                {e}
              </span>
            ))}
            <input
              className={`
                input sp-input
                ${
                  extractErrorsAsList("name", errorsList).length
                    ? "red-border"
                    : "normal-border"
                }
                `}
              id="name"
              type="text"
              placeholder="User Name"
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="create-account__input">
            {extractErrorsAsList("email", errorsList).map((e, i) => (
              <span key={i} className="create-account__error">
                {e}
              </span>
            ))}
            <input
              className={`
                input sp-input
                ${
                  extractErrorsAsList("email", errorsList).length
                    ? "red-border"
                    : "normal-border"
                }
                `}
              id="email"
              type="text"
              placeholder="Email Address"
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="create-account__input">
            {extractErrorsAsList("address", errorsList).map((e, i) => (
              <span key={i} className="create-account__error">
                {e}
              </span>
            ))}
            <input
              id="address"
              type="text"
              placeholder="Address"
              className={`
                input sp-input
                ${
                  extractErrorsAsList("address", errorsList).length
                    ? "red-border"
                    : "normal-border"
                }
                `}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <div className="create-account__input">
            {extractErrorsAsList("phone", errorsList).map((e, i) => (
              <span key={i} className="create-account__error">
                {e}
              </span>
            ))}
            <input
              className={`
                input sp-input
                ${
                  extractErrorsAsList("phone", errorsList).length
                    ? "red-border"
                    : "normal-border"
                }
                `}
              id="phone"
              type="text"
              placeholder="Phone Number"
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div className="create-account__input">
            {extractErrorsAsList("password", errorsList).map((e, i) => (
              <span key={i} className="create-account__error">
                {e}
              </span>
            ))}
            <input
              className={`
                input sp-input
                ${
                  extractErrorsAsList("password", errorsList).length
                    ? "red-border"
                    : "normal-border"
                }
                `}
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>
          <select
            onChange={(e) => {
              handleChange("role", e.target.value);
            }}
            className="role-select input sp-input  "
            name="Role"
            id="Role"
          >
            <option value={Role.CLIENT} className="">
              {Role.CLIENT.toLowerCase()}
            </option>
            <option value={Role.ADMIN} className="">
              {Role.ADMIN.toLowerCase()}
            </option>
          </select>
          <button className="login-btn" onClick={handleSubmit}>
            Create New Account
          </button>
          <span>
            Already have an account? <Link to={"/login"}>log in</Link>{" "}
          </span>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
