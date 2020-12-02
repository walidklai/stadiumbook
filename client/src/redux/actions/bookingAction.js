import {
  GET_BOOKING,
  GET_TIMESLOT,
  SAVE_BOOKING,
  REMOVE_BOOKING,
  GET_BOOKINGS,
} from "./actionTypes";
import axios from "axios";
import {setAlert} from './alertAction'

export const getBookings=()=>async dispatch=>{
  try {
    const res=await axios.get('/api/booking')
    dispatch({
      type:GET_BOOKINGS,
      payload:res.data
    })
  } catch (err) {
    console.log(err.message)
  }
}

export const getBooking = () => async (dispatch) => {
  try {
    dispatch(getBookings())
    const res = await axios.get("/api/booking/mybooking");
    dispatch({
      type: GET_BOOKING,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);
    const errors = err.response.data;
    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
  }
};

export const getTimeslot = (day, from, to) => (dispatch) => {
  dispatch({
    type: GET_TIMESLOT,
    payload: {
      day,
      from,
      to,
    },
  });
};

export const saveBooking = ({ from,to,day,id }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = {
    from,
    to,
    day
  };

  try {
     const res =  await axios.post(`/api/booking/${id}`, body, config);
     console.log(res)
  } catch (err) {
    console.log(err.message);
    const errors = err.response.data;
    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
  }
};

export const removeBookingData=()=>dispatch=>{
  dispatch({
    type:REMOVE_BOOKING
  })
}

export const deleteBooking=(id)=>async dispatch=>{
  try {
    await axios.delete(`/api/booking/${id}`)
  } catch (err) {
    console.log(err.message)
    const errors = err.response.data;
    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
  }
}
