import React from 'react';
import {View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('Users');
const userDocument = firestore()
  .collection('Users')
  .doc('ABC');


const App = ()  => {
  console.log(JSON.stringify(userDocument))
  
  return (
    
      <View>
      <Text>Hello !</Text>
      </View>
  );
}; 

export default App;
