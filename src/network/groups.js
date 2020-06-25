import firestore from '@react-native-firebase/firestore';

const addGroup = (Group, addComplete) => {
  firestore()
    .collection('Groups')
    .add({
      name: Shop.name,
      location: Shop.location,
      date: new Date(),
    })
    .then((snapshot) => snapshot.get())
    .then((ShopData) => addComplete(ShopData.data())) //This brings submitted fod item top the state of the second screen
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
