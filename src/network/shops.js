import firestore from '@react-native-firebase/firestore';

const addShop = (shop ) => {
  firestore()
    .collection('Shops')
    .add({
      name: shop.name,
      location: shop.location,
      date: new Date(),
      admin:shop.user,
      adminUID:shop.uid
    })
    .then((snapshot) => snapshot.get())
    //.then((ShopData) => addComplete(ShopData.data())) //This brings submitted fod item top the state of the second screen
    .catch((error) => console.log(error));
};

const getShops = async ( ) => {
  var ShopList = [];
  var snapshot = await firestore().collection('Shops').get();

  snapshot.forEach((doc) => {
    ShopList.push(doc.data());
  });

  return ShopList;
};

export {addShop, getShops};
