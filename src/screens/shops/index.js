import React, {Component} from 'react';
import {Text, FlatList, SafeAreaView, View, StyleSheet} from 'react-native';
import {getShops} from './../../network/shops';
import {withNavigation} from 'react-navigation';
import ShopCard from './../../components/shopCard';
import {  TouchableOpacity } from 'react-native-gesture-handler';
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

  navigateToAddShop(){
      //alert("Hello !")
      this.props.navigation.navigate('addShop')
  }

  render() {
    return (
      <View>
        <View style={styles.container}> 
          <FlatList
  showsVerticalScrollIndicator ={false} 
            data={this.state.shopList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <ShopCard
                  name={item.name}
                  location={item.location}
                  admin={item.admin}
                  photo={item.image}
                />
              );
            }}
          />
          <View style={styles.plus}>
            <TouchableOpacity style={styles.plusWrapper} onPress={()=>{this.navigateToAddShop()}}> 
            <Text style={styles.plusText}>+</Text>
            </TouchableOpacity >
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  plusHolder: {
    position: 'absolute',
    left: 10,
    top: 10,
  },

  plusWrapper:{  
    width: 35,
    height: 35,
    alignContent:"center", 
    alignItems:"center",
    justifyContent: 'center', 
  },

  container: {
    height: '100%',
    paddingHorizontal: '5%',
    zIndex: 0,
    elevation: 1,
  },

  plus: {
    elevation: 3,
    position: 'absolute',
    right: '10%',
    bottom: '5%',
    backgroundColor: '#0F4021',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  plusText: {
    color: 'white',
    fontSize: 25,
  },
});

export default withNavigation(shopsScreen);
