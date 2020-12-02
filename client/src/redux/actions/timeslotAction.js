import { GET_TIMESLOT} from './actionTypes'

export const getTimeslot=({day,from,to})=>dispatch=>{
    dispatch({
        type:GET_TIMESLOT,
        payload:{
            day,
            from,
            to
        }
    })
}