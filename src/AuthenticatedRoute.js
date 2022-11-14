import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthenticatedRoute = ({
  children,
  checkLoggedIn = false,
  isRegister = false,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      (!localStorage.getItem("accessToken") ||
        !localStorage.getItem("username")) &&
      !isRegister
    ) {
      return navigate("/note-app-online/login");
    }
    if (checkLoggedIn) {
      if (
        localStorage.getItem("accessToken") ||
        localStorage.getItem("username")
      ) {
        return navigate("/note-app-online");
      }
    }
  }, []);

  return children;
};

AuthenticatedRoute.propTypes = {
  children: PropTypes.element.isRequired,
  checkLoggedIn: PropTypes.bool,
  isRegister: PropTypes.bool,
};

export default AuthenticatedRoute;
