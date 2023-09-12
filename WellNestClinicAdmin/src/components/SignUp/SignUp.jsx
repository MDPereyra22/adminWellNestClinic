import  { useState } from "react";
import style from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../redux/action/actions";
import Loading from "../Loading/Loading";
import { GoogleLogin } from '@react-oauth/google';

//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpComponent = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({});  
  const [isLoading, setIsLoading] = useState(false);



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

  const messageSuccess = (message) => {
    toast.success(message, {
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
    try {
      if(response.credential){
        setIsLoading(true);    
        //esto cambiarlo por props
        const signUpResponse = await signUp(response.credential);

        if (signUpResponse.status == 200) {
          messageSuccess("Your account was created successfully!");
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else if (signUpResponse.status == 403) {
            messageError(signUpResponse.data.error);
        } else {
          let message = signUpResponse.data.message;
          if (!message) {
            messageError(signUpResponse.data.error);
          }
          const errorServer = { server: message };
          setError(errorServer);
        }
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      const errorServer = { server: "There is a server error" };
      setError(errorServer);
    } finally {
      setIsLoading(false);
    }
  }

  const googleResponseError = (erros) => {
    console.log('Register faile');
  }

  return (
    <div>
        {isLoading && <Loading></Loading>}
        <div>
          <h1 className={style.heading}>Welcome</h1>
          <div className={style.container}>
            <h2 id={style.titleForm}>Sign Up</h2>
            <GoogleLogin
              useOneTap
              clientId={import.meta.env.VITE_CLIENT_ID_GOOGLE}
              onSuccess={googleResponse}
              onError={googleResponseError}
              text = "Sign in with Google"
              shape = 'circle'
              logo_alignment = "center"
              
              />
            <h4>
                Already have an account?{" "}
                <a
                  className={style.login}
                  
                  onClick={() => navigate("/")}
                >
                  Sign in
                </a>
              </h4>
          </div>
        </div>
      )
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default SignUpComponent;
