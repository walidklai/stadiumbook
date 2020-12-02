import {
  ADD_STADIUM_FAILURE,
  ADD_STADIUM_SUCCESS,
  FILTER_STADIUMS,
  GET_STADIUMS,
  REMOVE_STADIUM,
  GET_SINGLE_STADIUM
} from "../actions/actionTypes";

const initialState = {
  stadiums: [],
  stadium:null,
  loading: true,
};

const stadiumReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_STADIUMS:
      return {
        ...state,
        loading: false,
        stadiums: [...payload],
      };
      case FILTER_STADIUMS:
        return {
          ...state,
          loading:false,
          stadiums:[...payload]
        }
    /* case FILTER_STADIUMS:
      switch (payload.name) {
        case "name":
          return state.filter((stadium) =>
            stadium.name.includes(payload.value)
          );
        case "governorate":
          return state.filter((stadium) =>
            stadium.address.governorate.includes(payload.value)
          );
        case "city":
          return state.filter((stadium) =>
            stadium.address.city.includes(payload.value)
          );
        default:
          return state;
      } */
    case ADD_STADIUM_SUCCESS:
      return {
        ...state,
        loading: false,
        stadiums: [...state.stadiums,payload],
      };
    case REMOVE_STADIUM:
      state.stadiums.filter((el) => el.id !== payload);
      return {
        ...state,
      };
    case GET_SINGLE_STADIUM:
      return {
        ...state,
        loading:false,
        stadium:payload
      }
    case ADD_STADIUM_FAILURE:
    default:
      return state;
  }
};

export default stadiumReducer;
