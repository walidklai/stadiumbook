import {
  GET_STADIUMS,
  FILTER_STADIUMS,
  GET_MY_STADIUMS,
  REMOVE_STADIUM,
  ADD_STADIUM_SUCCESS,
  ADD_STADIUM_FAILURE,
  GET_SINGLE_STADIUM,
  GET_MY_STADIUM,
} from "./actionTypes";
import axios from "axios";
import { setAlert } from "./alertAction";
import { deleteBooking } from "./bookingAction";

export const getStadiums = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/stadium");
    dispatch({
      type: GET_STADIUMS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);
    const errors = err.response.data;
    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
  }
};

export const filterStadiums = ({ governorate }) => async (dispatch) => {
  try {
    let res;
    if (governorate === "All") {
      dispatch(getStadiums())
    } else {
      res = await axios.get(`/api/stadium/search/${governorate}`);
      dispatch({
        type: FILTER_STADIUMS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const getMyStadiums = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/stadium/me");
    dispatch({
      type: GET_MY_STADIUMS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);
    const errors = err.response.data;
    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
  }
};

export const addStadium = ({
  name,
  length,
  width,
  governorate,
  city,
  street,
  image,
  description,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = {
    name,
    length,
    width,
    governorate,
    city,
    street,
    image,
    description,
  };
  try {
    const res = await axios.post("/api/stadium", body, config);
    dispatch({
      type: ADD_STADIUM_SUCCESS,
      payload: res.data,
    });
    dispatch(getMyStadiums());
  } catch (err) {
    console.log(err.message);
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    dispatch({
      type: ADD_STADIUM_FAILURE,
    });
  }
};

export const removeStadium = (id) => async (dispatch) => {
  try {
    const res=await axios.delete(`/api/stadium/${id}`);
    dispatch({
      type: REMOVE_STADIUM,
      payload: id,
    });
  
    dispatch(getMyStadiums());
  } catch (err) {
    console.log(err.message);
    const errors = err.response.data;
    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
  }
};

export const editStadium = ({
  id,
  name,
  length,
  width,
  image,
  governorate,
  city,
  street,
  description,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = {
    id,
    name,
    length,
    width,
    image,
    governorate,
    city,
    street,
    description,
  };
  try {
    const res = await axios.put(`/api/stadium/${id}`, body, config);
    dispatch(getMyStadiums())
  } catch (err) {
    console.log(err.message);
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
  }
};

export const getSingleStadium = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/stadium/${id}`);
    dispatch({
      type: GET_SINGLE_STADIUM,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
  }
};

export const getMyStadium = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/stadium/${id}`);
    dispatch({
      type: GET_MY_STADIUM,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
  }
};
