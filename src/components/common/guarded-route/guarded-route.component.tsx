import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Role } from "../../../@types";
import { AuthContext } from "../../../providers/auth-provider";

interface IProps {
  children: React.ReactNode;
  roles: Role[];
}

const Guarded = (props: IProps) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  if (user === null) {
    // User is not logged in
    return (
      <div>
        <h3>You must be logged in to see this screen!</h3>
        <Link to="/login">Login in here</Link>
      </div>
    );
  } else if (!props.roles.includes(user.role)) {
    // User doesn't have permission
    return (
      <div>
        <h2>You don't have sufficient permissions to see this screen!</h2>
      </div>
    );
  }

  return props.children;
};

export default Guarded;
