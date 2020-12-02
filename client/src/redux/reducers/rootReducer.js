import { combineReducers } from "redux";
import alertReducer from "../reducers/alertReducer";
import authReducer from "../reducers/authReducer";
import stadiumReducer from '../reducers/stadiumReducer'
import myStadiumsReducer from '../reducers/myStadiumsReducer'
import bookingReducer from '../reducers/bookingReducer'

const rootReducer = combineReducers({
  alertReducer,
  authReducer,
  stadiumReducer,
  myStadiumsReducer,
  bookingReducer,
});

export default rootReducer;
