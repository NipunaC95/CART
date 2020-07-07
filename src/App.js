import React, {Component} from 'react';
import {View, Text, SafeAreaView, Button   } from 'react-native';
import {TextInput, FlatList} from 'react-native-gesture-handler';
import {getFoods, addFood} from './network/FoodsAPI';  
import TabNavigator from "./navigators/secondryTabNavigator";
import StackNavigator from "./navigators/mainStackNavigator";
   
class App extends Component {
 

  render() {
    return (   
      <StackNavigator /> 
    );
  }
}

export default App;
