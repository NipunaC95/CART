import firebase from '../../firebase/config';

export const senderMsg = async (msgValue, currentUserId, guestUserId, img) => {
  const time = new Date() 
  try {
    return await firebase
      .database()
      .ref('messeges/' + currentUserId)
      .child(guestUserId)
      .push({
        messege: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          img: img,
          time: (new Date()).toISOString()
        },
      });

  } catch (error) {
    return error;
  }
};

export const recieverMsg = async (
  msgValue,
  currentUserId,
  guestUserId,
  img,
) => {
  const time = new Date() 
  try {
    return await firebase
      .database()
      .ref('messeges/' + guestUserId)
      .child(currentUserId)
      .push({
        messege: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          img: img,
          time
        },
      });
  } catch (error) {
    return error;
  }
};
