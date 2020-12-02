import {GET_BOOKING,REMOVE_BOOKING,GET_TIMESLOT, GET_BOOKINGS} from '../actions/actionTypes'

const initialState={
    loading:true,
    bookings:[],
    booking:{}
}

const bookingReducer=(state=initialState,action)=>{
    const {type,payload}=action
    switch(type){
        case GET_BOOKING:
        return {
            ...state,
            loading:false,
            booking:payload
        }
        case GET_TIMESLOT:
            return {
                ...state,
                loading:false,
                booking:{...state.booking,...payload}
            }
        case REMOVE_BOOKING:
            return{
                ...state,
                loading:false,
                booking:{}
            }
        case GET_BOOKINGS:
            return{
                ...state,
                loading:false,
                bookings:[...payload]
            }
        default:
            return state
    }
}

export default bookingReducer