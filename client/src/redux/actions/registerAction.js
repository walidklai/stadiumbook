import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  AUTH_ERROR,
  LOAD_USER,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_MY_STADIUMS,
  REMOVE_BOOKING,
  GET_USERS,
} from "./actionTypes";
import axios from "axios";
import { setAlert } from "./alertAction";
import { setAuthToken } from "../../utility/setAuthToken";

export const register = ({ name, email, password, cin }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = {
    name,
    email,
    password,
    cin,
  };
  try {
    const res = await axios.post("/api/user", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
    });
  } catch (err) {
    console.log(err.message);
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    dispatch({
      type: REGISTER_FAILURE,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = {
    email,
    password,
  };
  try {
    const res = await axios.post("./api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    dispatch({
      type: LOGIN_FAILURE,
    });
  }
};

export const logout = () => (dispatch) => {
    dispatch({
        type:CLEAR_MY_STADIUMS
    })
    dispatch({
        type:REMOVE_BOOKING
    })
  dispatch({
    type: LOGOUT,
  });
};

export const getUsers=()=>async dispatch=>{
  try {
    const res=await axios.get('/api/user')
    dispatch({
      type:GET_USERS,
      payload:res.data
    })
  } catch (err) {
    console.log(err.message)
  }
}

export const removeUser=(id)=>async dispatch=>{
  try {
    
  } catch (err) {
    console.log(err.message)
  }
}
