import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {TextInput, ScrollView} from 'react-native-gesture-handler';
import {getShops  } from '../../network/shops';
import { addRequest } from '../../network/requests';
import {getData, getCustomData} from './../../store';
import {withNavigation} from 'react-navigation';
import {Picker} from '@react-native-community/picker';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shops: [],
      name: '',
      selectedShop:{},
      shop: '',
      shopId: '',
      type: '',
      price: 0,
      specialNotes: '',
      user: '',
      uid: '',
      groupName:'',
      groupID:''
    };
  }
  setStateValue(key, value) {
    const state = this.state;
    this.setState({
      ...state,
      [key]: value,
    });
  }

  setShop(shop) {
    const {id, name} = shop;
    const state = this.state;
    this.setState({
      ...state,
      shopId: id,
      shop: name,
      selectedShop:shop
    });
  }

  async componentDidMount() {
    //get shop name list
    const shops = await getShops();
    var shopDetailArray = [];
    for (a in shops) {
      shopDetailArray.push(shops[a]);
    }
    const groupData = await getCustomData('groupInfo' ); 
     
    const user = await getData();
    this.setState({user: user.name, uid: user.uid ,groupName:groupData.name, shops:shopDetailArray, groupID:groupData.id , shop:shopDetailArray[0] });
  }

  submitShop = () => {
    console.log(JSON.stringify(this.state, null, 2)); 
    const {name , shop ,shopId ,type ,price ,specialNotes ,user ,uid  ,groupName , groupID  } = this.state  
    const request = {name , shop ,shopId ,type ,price ,specialNotes ,user ,uid   ,groupName , groupID   }; 
    
    //console.log(request);
    addRequest(request);
    this.props.navigation.navigate('secondryNavigator', { screen: 'shops'}) 
  };

 

  render() {
    let shopPicks = this.state.shops.map((shop, myIndex) => {
      return <Picker.Item label={shop.name} value={shop} key={myIndex} />;
    });

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.inputTitles}>Name </Text>
            <TextInput
              placeholder="Enter item name here "
              style={styles.textInput}
              onChangeText={(e) => {
                this.setStateValue('name', e);
              }}></TextInput>

            <Text style={styles.inputTitles}>Type </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(e) => {
                this.setStateValue('type', e);
              }}></TextInput>

            <Text style={styles.inputTitles}>Price (Rs.) </Text>
            <TextInput
              keyboardType={'numeric'}
              style={styles.textInput}
              onChangeText={(e) => {
                this.setStateValue('price', e);
              }}></TextInput>

            <Text style={styles.inputTitles}>Special notes </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(e) => {
                this.setStateValue('specialNotes', e);
              }}></TextInput>

 
            <Picker
              selectedValue={this.state.selectedShop} 
              selectedValue={(this.state && this.state.selectedShop) || this.state.shops[0]}
              onValueChange={(e) => {
                this.setShop(e);
              }}>
              {shopPicks}
            </Picker> 

            <View style={styles.submitContainer}>
              <Button
                title={'Create a request'}
                onPress={() => {
                  this.submitShop();
                }}
              />
            </View>
          </View>
          <View style={{height: 100, opacity: 0}}></View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Segoe UI',
    flex: 1,
    backgroundColor: '#E4E4E4',
  },

  card: {
    borderRadius: 6,
    backgroundColor: 'white',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    marginLeft: '5%',
    top: 40,
    height: '90%',
    width: '90%',
    position: 'relative',
    //  zIndex: -1,
  },
  inputTitles: {
    marginLeft: 25,
    fontFamily: 'Segoe UI',
    fontSize: 18,
    marginTop: 30,
  },
  textInput: {
    marginLeft: 25,
    fontFamily: 'Segoe UI',
    fontSize: 15,
    color: '#404040',
    width: '85%',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginLeft: 25,
  },

  loginText: {
    fontFamily: 'Segoe UI',
    fontSize: 16,
    color: 'green',
    marginLeft: 65,
    marginTop: 10,
  },

  centerButton: {
    marginTop: 100,
    // alignContent:'center',
    alignItems: 'center',
  },
});

export default withNavigation(index);
