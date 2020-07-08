import firestore from '@react-native-firebase/firestore';

const addGroup = (group) => {
  firestore()
    .collection('Groups')
    .add(group) 
    .catch((error) => console.log(error));
};

const getGroups = async () => {
  var groupList = [];
  var snapshot = await firestore().collection('Group').get();

  snapshot.forEach((doc) => {
    groupList.push(doc.data());
  });

  return groupList;
};

export { addGroup , getGroups };
