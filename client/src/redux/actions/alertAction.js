import { SET_ALERT, REMOVE_ALERT } from "./actionTypes";

export const setAlert = (msg, alertType, delay = 5000) => (dispatch) => {
  const id = Math.random() * 1000;
  dispatch({
    type: SET_ALERT,
    payload: {
      id,
      alertType,
      msg,
    },
  });
  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id,
    });
  }, delay);
};
