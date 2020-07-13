import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';  

const signUp = (email, password, userName, navigation) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
    
      console.log(JSON.stringify(data, null, 2));

      firestore()
        .collection('Users')
        .doc(data.user.uid)
        .set({
          name: userName,
          email,  
          uid: data.user.uid,
          image: 'https://firebasestorage.googleapis.com/v0/b/cart-aa736.appspot.com/o/Profileimages%2Fdefault.png?alt=media&token=6161e962-c895-4522-80c6-4de7ef1e6c4e', 
        })
        .then((snapshot) => {
          navigation.navigate('login');
        }) 
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
  return await auth().signInWithEmailAndPassword(email, password)
};

const logOut = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};




const getUserDetails = async (userId)=>{  
  const doc = await firestore().collection('Users').doc(userId).get();  
  return doc.data();  
}  


const deleteUser = async (userId)=>{  
  var user = await  auth().currentUser;
  auth().currentUser.delete()
  console.log(JSON.stringify(user,null,2))

  user.delete().then( async function() {
      firestore().collection('Users').doc(user.uid).delete()  
  }, function(error) {
    // An error happened.
  }); 
}  

 
export {signUp, logOut, logIn , getUserDetails , deleteUser };
