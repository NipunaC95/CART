import React, {Component} from 'react';
import {View, Text, SafeAreaView, Button   } from 'react-native';
import {TextInput, FlatList} from 'react-native-gesture-handler';
import {getFoods, addFood} from './network/FoodsAPI';  
import TabNavigator from "./navigators/secondryTabNavigator";
class App extends Component {
  colors = ['red', 'green', 'yellow', 'blue', 'maroon', 'black'];

  state = {
    foodList: [],
    currentFoodItem: null,
  };

  onFoodAdded = (food) => {
    this.setState({
      foodList: [...this.state.foodList, food],
    });
  };

  onFoodsRecieved = (foodList) => {
    this.setState((prevState) => ({
      foodList: (prevState.foodList = foodList),
    }));
  };

  componentDidMount() {
    getFoods(this.onFoodsRecieved);
  }

  render() {
    return (  
      <TabNavigator />
    );
  }
}

export default App;
