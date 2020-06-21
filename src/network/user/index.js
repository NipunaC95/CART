import firebase from '../../firebase/config';

export const AddUser = async ( name ,email, uid , profileImage) => {
  try {
    return await firebase
    .database()
    .ref('users/'+uid)
    .set({
        name,
        email,
        uuid:uid,
        profileImage
    })
  } catch (error) {
    return error;
  }
};


export const UpdateUser = async (  uuid , profileImage) => {
  try {
    return await firebase
    .database()
    .ref('users/'+uid)
    .update({  
        profileImage
    })
  } catch (error) {
    return error;
  }
};
