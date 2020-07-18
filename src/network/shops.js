import firestore from '@react-native-firebase/firestore';

const addShop = (shop) => {
  firestore()
    .collection('Shops')
    .add({
      name: shop.name,
      type:shop.type,
      location: shop.location,
      date: new Date(),
      admin: shop.admin,
      adminUID: shop.uid,
    })
    .then((snapshot) => snapshot.get())
    //.then((ShopData) => addComplete(ShopData.data())) //This brings submitted fod item top the state of the second screen
    .catch((error) => console.log(error));
};

const getShops = async () => {
  var ShopList = [];
  var snapshot = await firestore().collection('Shops').get();

  snapshot.forEach((doc) => {
    ShopList.push(doc.data());
  });

  return ShopList;
};

const updateShop = async (shop) => {
  firestore()
    .collection('Shops')
    .doc(shop.key)
    .update({
      name: shop.name,
      location: shop.location,
      type:shop.type
    })
    .then((snapshot) => snapshot.get())
    .catch((error) => console.log(error));
};

const deleteShop = async (key) => {
  firestore()
    .collection('Shops')
    .doc(key)
    .delete()
    .then(() => {
      console.log('User deleted!');
    });
};

export {addShop, getShops, updateShop, deleteShop};
