import { CLEAR_MY_STADIUMS, GET_MY_STADIUMS,GET_MY_STADIUM} from "../actions/actionTypes";

const initialState = {
    stadiums:[],
    stadium:null,
    loading:true
};

const myStadiumsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MY_STADIUMS:
        return {
            ...state,
            loading:false,
            stadiums:[...payload]
        }
    case CLEAR_MY_STADIUMS:
        return {
            ...state,
            loading:false,
            stadiums:[]
        }
    case GET_MY_STADIUM:
        console.log(payload)
        return {
            ...state,
            loading:false,
            stadium:payload
        }
    default:
      return state;
  }
};

export default myStadiumsReducer;
