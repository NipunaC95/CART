import { LOGIN_FAILED , LOGIN_SUCCESSS , LOGIN_REQUEST } from "../actionTypes/authActionTypes";

const loginRequest  = () => {
    return { 
        type: LOGIN_REQUEST, 
        loading:true 
    }
}

const loginSuccess  = (data) => {
    return { 
        type: LOGIN_SUCCESSS,
        payload: data, 
        loading:false 
    }
}

const loginFailed  = ( ) => {
    return { 
        type: LOGIN_FAILED, 
        loading:false 
    }
}

export { loginRequest , loginSuccess , loginFailed};