import firestore from '@react-native-firebase/firestore';

const addFood = (food, addComplete) => {
  firestore()
    .collection('Foods')
    .add({
      name: food.name,
      color: food.color,
      date: new Date(),
    })
    .then((snapshot) => snapshot.get())
    .then((foodData) => addComplete(foodData.data())) //This brings submitted fod item top the state of the second screen
    .catch((error) => console.log(error));
};

const getFoods = async (foodsRetrieved) => {
  var foodList = [];
  var snapshot = await firestore()
  .collection('Foods')
  .orderBy('date').
  get();

  snapshot.forEach((doc) => {
    foodList.push(doc.data());
  });

  foodsRetrieved(foodList);
};

export {addFood, getFoods};
