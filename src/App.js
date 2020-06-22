import React, {Component} from 'react';
import {View, Text, SafeAreaView, Button} from 'react-native';
import {TextInput, FlatList} from 'react-native-gesture-handler';
import {getFoods, addFood} from './network/FoodsAPI'; 
import ShopsScreen from './screens/shops';
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
      <ShopsScreen/>


      //       <SafeAreaView>
      //         <View>
      //           <TextInput
      //             placeholder="Add food"
      //             value={this.state.currentFoodItem}
      //             onChangeText={(text) => {
      //               this.setState({
      //                 currentFoodItem:,
      //               });
      //             }}
      //           />

      //           <Button
      //           title='Submit'
      //           onPress={()=>{addFood({
      //             name : this.state.currentFoodItem,
      //             color: this.colors[Math.floor(Math.random()*this.colors.length)]
      //           },
      //           this.onFoodAdded
      //           )

      //           }}
      //           />
      //         </View>

      // <FlatList
      //   data={this.state.foodList}
      //   keyExtractor={(item,index)=>index.toString()}
      //   renderItem={({item})=>{
      //     console.log(item)
      //     return(
      //       <Text>{item.name}</Text>
      //     )
      //   }}
      // />

      //       </SafeAreaView>
    );
  }
}

export default App;
