import firebase from '../../firebase/config';

const SignUpRequest = async (email, password) => {
  try {

    const user = await firebase.auth().createUserWithEmailAndPassword (email, password)
    JSON.stringify(user, null, 2)
    return user;
  } catch (error) {
    return error;
  }
};


export default SignUpRequest;