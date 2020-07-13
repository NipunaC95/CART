import firestore from '@react-native-firebase/firestore';

const addGroup = (group) => {
  firestore()
    .collection('Groups')
    .add(group) 
    .catch((error) => console.log(error));
};

const getGroups = async () => {
  var groupList = [];
  var snapshot = await firestore().collection('Groups').get();

  snapshot.forEach((doc) => {
    groupList.push(doc.data());
  });

  return groupList;
};

const deleteGroup = async (key) => {
  firestore()
    .collection('Groups')
    .doc(key)
    .delete()
    .then(() => {
      console.log('Group deleted!');
    });
};

export { addGroup , getGroups , deleteGroup  };
