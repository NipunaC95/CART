import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {getData, setData} from './../store';

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
          downloadURL,
        })
        .then(() => {
          console.log('User updated!');
        });
      console.log(JSON.stringify(downloadURL, null, 2));
      const oldData = await getData();
      const newData = {...oldData, downloadURL};
      setData(newData);
    },
  );
};

export {updateImage}; 