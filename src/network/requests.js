import firestore from '@react-native-firebase/firestore';

const addRequest = (request) => {
  firestore()
    .collection('Requests')
    .add({
      ...request , date : new Date()
    })
    .then((snapshot) => snapshot.get())
    //.then((RequestData) => addComplete(RequestData.data())) //This brings submitted fod item top the state of the second screen
    .catch((error) => console.log(error));
};

const getRequests = async () => {
  var RequestList = [];
  var snapshot = await firestore().collection('Requests').get();

  snapshot.forEach((doc) => {
    RequestList.push(doc.data());
  });

  return RequestList;
};

const updateRequest = async (request) => {
  const { name ,type,price} = request;
  firestore()
    .collection('Requests')
    .doc(request.key)
    .update({name ,type,price }) 
    .catch((error) => console.log(error));
};

const deleteRequest = async (key) => {
  firestore()
    .collection('Requests')
    .doc(key)
    .delete()
    .then(() => {
      console.log('User deleted!');
    });
};

export {addRequest, getRequests, updateRequest, deleteRequest};
