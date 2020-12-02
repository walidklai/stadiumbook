import {
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  LOAD_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  GET_USERS
} from "../actions/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  users:[],
  user: null,
  isAuth: null,
  loading: true,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuth: false,
        loading: false,
      };
    case REGISTER_FAILURE:
    case AUTH_ERROR:
    case LOGIN_FAILURE:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
      };
    case LOAD_USER:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      console.log(payload);
      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: false,
      };
      case GET_USERS:
        return{
          ...state,
          users:[...payload]
        }
    default:
      return state;
  }
};

export default authReducer;
