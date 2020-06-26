import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESSS,
} from './../actionTypes/authActionTypes';

const initialState = {
  user: {user:{id:''}},
  loading: true,
  errorMessage: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...state, loading: action.payload};
    case LOGIN_SUCCESSS:
     // console.log(JSON.stringify(action.payload,null,2));
      return {...state, user: action.payload, loading: action.loading};
    case LOGIN_FAILED:
      return {...state, errorMessage: action.payload, loading: action.loading};
    default:
      return state;
  }
};

export default reducer;
