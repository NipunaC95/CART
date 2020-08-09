import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {getData, setData  ,clearCustomData} from './../store';

const updateImage = (uid, imagePath) => {
  console.log(uid, imagePath);
  const storageRef = storage().ref(`Profileimages/${uid}`);
  storageRef.putFile(imagePath).on(
    storage.TaskEvent.STATE_CHANGED,
    (snapshot) => {
      console.log(
        'Progress :- ',
        snapshot.bytesTransferred / snapshot.totalBytes,
      );
      if (snapshot.state == 'success') {
        console.log('Image upload successfull !');
      }
    },
    (error) => {
      console.log('Error occured while uploading ', error);
    },
    async () => {
      const downloadURL = await storageRef.getDownloadURL();
      console.log('D ' + downloadURL);
      firestore()
        .collection('Users')
        .doc(uid)
        .update({
          image:downloadURL
        })
        .then(async() => {
          clearCustomData('user');
          console.log('User updated!'); 
          const oldData = await getData();
          console.log(JSON.stringify(newData, null ,2))
          const newData = {...oldData, downloadURL};
          console.log(JSON.stringify(newData, null ,2))
          setData(newData);
        });
     
    },
  );
};


const updateName = async (uid, name) => {
  console.log(uid, name);
      firestore()
        .collection('Users')
        .doc(uid)
        .update({
          name,
        })
        .then(() => {
          console.log('User updated!');
        }); 
      const oldData = await getData();
      const newData = {...oldData,name};
      setData(newData);
    } 

export {updateImage , updateName}; 