import axios from "axios";

import {
  SET_USER,
  UPDATE_PROFILE_PICTURE,
  UPDATE_PASSWORD,
  PAY_MEMBERSHIP,
  CANCEL_MEMBERSHIP,
  LOGIN_USERMEMBER,
  VERIFY_USERNAME,
  VERIFY_ISMEMBER,
  GENERIC_ERROR,
  RESET_GENERIC_ERROR,
  RESET_IS_MEMBER,
  GET_USER_ID,
  GET_SPECIALITY,
  DOCTOR_FILTERING,
  GET_DOCTORS,
  GET_SPECIALTIES,
  POST_USER,
  GET_DNITYPE,
  GET_PLAN,
  GET_ALL_PRODUCTS,
  GET_DRUGS,
} from "./type.js";

export const verifyUsername = (userName) => {
  const endPoint =
    import.meta.env.VITE_BASENDPOINT_BACK +
    `/userClient/validateUser/?userName=${userName}`;
  return (dispatch) => {
    axios
      .get(endPoint)
      .then(({ data }) => {
        return dispatch({
          type: VERIFY_USERNAME,
          payload: data,
        });
      })
      .catch((error) => {
        var err = error.response;
        return dispatch({
          type: GENERIC_ERROR,
          payload: err.data.error,
        });
      });
  };
};

export const verifyIsMember = (ID, setIsLoading) => {
  const endPoint =
    import.meta.env.VITE_BASENDPOINT_BACK + `/userClient/isMember/${ID}`;
  return (dispatch) => {
    axios
      .get(endPoint)
      .then(({ data }) => {
        setIsLoading(false);
        return dispatch({
          type: VERIFY_ISMEMBER,
          payload: data,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        var err = error.response;
        if (err.status === 403) {
          setIsLoading(false);
          return dispatch({
            type: GENERIC_ERROR,
            payload: { ...err.data, status: err.status },
          });
        }
      });
  };
};

export const resetGenericError = () => {
  return {
    type: RESET_GENERIC_ERROR,
    payload: null,
  };
};

export const signUp = async (token) => {
  const endpoint =
    import.meta.env.VITE_BASENDPOINT_BACK + `/userAdmin/register`;
  try {
    const body = {
      token: token,
    };
    const response = await axios.post(endpoint, body);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const loginUser = (email, password, token) => {
  return async function (dispatch) {
    const datos = {
      password: password,
      userName: email,
      token: token,
    };
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/userAdmin/login`;

    try {
      const response = await axios.post(endpoint, datos);
      const apiResponse = response.data.user;

      dispatch({ type: LOGIN_USERMEMBER, payload: apiResponse });

      return response;
    } catch (error) {
      return error.response;
    }
  };
};

export const resetIsMember = () => ({
  type: RESET_IS_MEMBER,
  payload: null,
});

export const getUser = (id) => {
  const endPoint =
    import.meta.env.VITE_BASENDPOINT_BACK + `/userClient/?id=${id}`;
  return (dispatch) => {
    axios
      .get(endPoint)
      .then(({ data }) => {
        return dispatch({
          type: GET_USER_ID,
          payload: data,
        });
      })
      .catch((error) => {
        var err = error.response;
        return dispatch({
          type: GENERIC_ERROR,
          payload: err.data.error,
        });
      });
  };
};

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const updateUserProfilePicture = (newProfilePicture) => ({
  type: UPDATE_PROFILE_PICTURE,
  payload: newProfilePicture,
});

export const updateUserPassword = (newPassword) => ({
  type: UPDATE_PASSWORD,
  payload: newPassword,
});

export const payMembership = () => ({
  type: PAY_MEMBERSHIP,
});

export const cancelMembership = () => ({
  type: CANCEL_MEMBERSHIP,
});

export const getSpeciality = () => async (dispach) => {
  try {
    const { data } = await axios.get("http://localhost:3002/speciality");
    return dispach({
      type: GET_SPECIALITY,
      payload: data,
    });
  } catch (error) {
    return error.response;
  }
};

export const doctorFiltering = (dataSpeciality) => async (dispach) => {
  try {
    const { data } = await axios.get("http://localhost:3002/doctor");
    const filteredDoctors = data.filter((doctor) => {
      return doctor.specialities.some(
        (speciality) => speciality.name === dataSpeciality
      );
    });
    return dispach({
      type: DOCTOR_FILTERING,
      payload: filteredDoctors,
    });
  } catch (error) {
    return error.response;
  }
};

export const getDoctors = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://serverwellnestclinic.onrender.com/doctor/"
      );
      dispatch({
        type: GET_DOCTORS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
};

export const getSpecialties = () => async (dispach) => {
  try {
    const { data } = await axios.get(
      "https://serverwellnestclinic.onrender.com/speciality"
    );
    return dispach({
      type: GET_SPECIALTIES,
      payload: data,
    });
  } catch (error) {
    return error.response;
  }
};

export const postUser = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "https://serverwellnestclinic.onrender.com/userClient",
        payload
      );
      alert("User created successfully!");
      return response;
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };
};

export const getDniType = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://serverwellnestclinic.onrender.com/dni-type/"
      );
      dispatch({
        type: GET_DNITYPE,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching DNI:", error);
    }
  };
};

export const getPlan = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://serverwellnestclinic.onrender.com/plan/"
      );
      dispatch({
        type: GET_PLAN,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching PLAN:", error);
    }
  };
};


export const postProducts = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "https://serverwellnestclinic.onrender.com/product",
        payload
      );
      alert("Product created successfully!");
      return response;
    } catch (error) {
      alert(error.response); 
    }
  };
};


export const fetchProducts = async () => {
  const refreshToken = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };
  try {
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK;
    const response = await axios.get(`${endpoint}/product`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK;
    await axios.delete(`${endpoint}/product/${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};





export const updateProduct = async (productData) => {
  try {
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK;
    const response = await axios.put(
      `${endpoint}/product/`,
      productData
    );
    return response.data; // O puedes regresar cualquier dato que necesites
  } catch (error) {
    throw error; // Puedes manejar el error aquí o dejar que lo manejen en el componente
  }
};






