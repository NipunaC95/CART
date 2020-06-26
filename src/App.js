import React, {Component} from 'react';
import {View, Text, SafeAreaView, Button   } from 'react-native';
import {TextInput, FlatList} from 'react-native-gesture-handler';
import {getFoods, addFood} from './network/FoodsAPI';  
import TabNavigator from "./navigators/secondryTabNavigator";
import StackNavigator from "./navigators/mainStackNavigator";
import { Provider } from "react-redux";
import store from './redux/store';
class App extends Component {
 

  render() {
    return (  
      <Provider store={store}>
      <StackNavigator />
      </Provider>
    );
  }
}

export default App;
