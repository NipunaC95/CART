import React, {Component} from 'react';
import {Text, FlatList, SafeAreaView , View , StyleSheet} from 'react-native';
import {getShops} from './../../network/shops';

import ShopCard from "./../../components/shopCard"
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
class shopsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopList: [],
    };
  }

  async componentDidMount() {
    const shopList = await getShops();
    this.setState({shopList});
  }
  render() { 
    return (
      <SafeAreaView>
        <View style={styles.container}>
        <TouchableWithoutFeedback style={styles.plus}>
          <Text>+</Text>
        </TouchableWithoutFeedback>
          <FlatList
          showsHorizontalScrollIndicator={false}
            data={this.state.shopList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {  
              return  <ShopCard 
              name={item.name} 
              location={item.location}
              admin={item.admin}
              photo={item.image}
              />;
            }}
          />
        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
container:{
  height:'100%',
  paddingHorizontal:'5%', 
  zIndex: 0, 
  elevation: 1
},

plus:{ elevation: 3,
  position:'absolute',
  right:'10%', 
  backgroundColor:'red',
  height:50,
  width:50,
  borderRadius:25,
  alignContent:"center",
  alignItems:'center',
  justifyContent:'center'
}


});


export default shopsScreen;
