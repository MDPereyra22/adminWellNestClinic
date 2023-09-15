import { useState } from "react";
import style from "./Login.module.css";
import { loginUser, getUser } from "../../redux/action/actions";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../Authenticator/AuthPro";
import Loading from "../Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { GoogleLogin } from "@react-oauth/google";

//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (auth.isAuthenticated) {
    return <Navigate to="/home"></Navigate>;
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const loginResponse = await dispatch(loginUser(email, password, null));

      if (loginResponse.data.pass) {
        dispatch(
          getUser(loginResponse.data.user.id, loginResponse.data.accessToken)
        );

        // const json = (await loginResponse.json())

        if (loginResponse.data.accessToken && loginResponse.data.refreshToken) {
          auth.saveUser(loginResponse);
        }

        auth.getAccess();
        navigate("/home");
      } else if (loginResponse.status === 403) {
        if (loginResponse.data.message) {
          messageError(loginResponse.data.message);
        } else {
          messageError(loginResponse.data.error);
        }
      } else {
        messageError(loginResponse.data.error);
      }
    } catch (error) {
      setError("Internal error");
    } finally {
      setIsLoading(false);
    }
  };

  const messageError = (message) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const googleResponse = async (response) => {
    setIsLoading(true);
    try {
      const loginResponse = await dispatch(
        loginUser(null, null, response.credential)
      );

      if (loginResponse.data.pass) {
        dispatch(
          getUser(loginResponse.data.user.id, loginResponse.data.accessToken)
        );

        // const json = (await loginResponse.json())

        if (loginResponse.data.accessToken && loginResponse.data.refreshToken) {
          auth.saveUser(loginResponse);
        }

        auth.getAccess();
        navigate("/home");
      } else if (loginResponse.status === 403) {
        if (loginResponse.data.message) {
          messageError(loginResponse.data.message);
        } else {
          messageError(loginResponse.data.error);
        }
      } else {
        messageError(loginResponse.data.error);
      }
    } catch (error) {
      setError("Internal error");
    } finally {
      setIsLoading(false);
    }
  };

  const googleResponseError = (erros) => {
    messageError("Register faile");
  };

  return (
    <div className={style.page}>
      {isLoading && <Loading></Loading>}
      <div>
        <h1 id={style.title} className={style.heading}>
          Welcome
        </h1>
        <div className={style.container}>
          <h3 id={style.titleForm}>Hey admin,</h3>
          <h3 id={style.titleForm}>sign in with Google</h3>
          {/* <form className={style.Form} onSubmit={handleSubmit}>
              <div className={style.form}>
                <div>
                  {" "}
                  <label className={style.label}>Email address</label>
                </div>
                <input
                  type="text"
                  className={style.input}
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div>
                {" "}
                <div>
                  <label className={style.label}>Password </label>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={style.input}
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button className={style.toggle} type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}
                </button>
              </div>{" "}
              <button className={style.button} type="submit">
                Submit
              </button>
              {error && <p className={style.error}>{error}</p>}
              <h4>
                Don't have an account?{" "}
                <a
                  className={style.signup}
                  onClick={() => navigate("/sign-up")}
                >
                  Register
                </a>
              </h4>
            </form> */}
          {/* <br/> <br/> */}
          <div className={style.gooogle}></div>
          <GoogleLogin
            useOneTap
            clientId={import.meta.env.VITE_CLIENT_ID_GOOGLE}
            onSuccess={googleResponse}
            onError={googleResponseError}
            text="Sign in with Google"
          />
        </div>
      </div>

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Login;
