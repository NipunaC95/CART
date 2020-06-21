import firebase from '../../firebase/config';

import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('Users');
const userDocument = firestore()
  .collection('Users')
  .doc('ABC');








// export const removeFromFavourites = async (
//   msgValue,
//   currentUserId,
//   guestUserId,
//   img,
// ) => {
//   try {
//     return await firebase
//       .database()
//       .ref('messeges/' + guestUserId)
//       .child(currentUserId)
//       .push({
//         messege: {
//           sender: currentUserId,
//           reciever: guestUserId,
//           msg: msgValue,
//           img: img,
//         },
//       });
//   } catch (error) {
//     return error;
//   }
// };



// export const getAllFavourites = async (
//     msgValue,
//     currentUserId,
//     guestUserId,
//     img,
//   ) => {
//     try {
//       return await firebase
//         .database()
//         .ref('messeges/' + guestUserId)
//         .child(currentUserId)
//         .push({
//           messege: {
//             sender: currentUserId,
//             reciever: guestUserId,
//             msg: msgValue,
//             img: img,
//           },
//         });
//     } catch (error) {
//       return error;
//     }
//   };
  