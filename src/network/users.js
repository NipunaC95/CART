import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const signUp = (email, password, userName, navigator) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
      console.log(JSON.stringify(data, null, 2));

      firestore()
        .collection('Users')
        .add({
          name: userName, 
          email,
          newUser: data.additionalUserInfo.isNewUser,
          emailVerified: data.emailVerified,
          uid: data.user.uid,
          image:data.user.photoURl,
          date: new Date(),
        })
        .then((snapshot) => { 
            navigator.navigate('secondryNavigator');})
        //.then((ShopData) => addComplete(ShopData.data())) //This brings submitted fod item top the state of the second screen
        .catch((error) => console.log(error));
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
};

const logIn = async (email, password) => {
  try {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    return error;
  }
};

const logOut = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};

export {signUp, logOut, logIn};
