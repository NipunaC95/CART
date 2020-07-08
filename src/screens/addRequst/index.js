import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {TextInput, ScrollView} from 'react-native-gesture-handler';
import { getShops} from '../../network/shops';
import {getData} from './../../store';
import {withNavigation} from 'react-navigation';
import {Picker} from '@react-native-community/picker';


class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shops:[],
      name: '', 
      shop:{},
      type: '',
      price: 0,
      specialNotes: '',
      user: '',
      uid: '',
    };
  }
  setStateValue(key, value) {
    const state = this.state;
    this.setState({
      ...state,
      [key]: value,
    });
  }

  async componentDidMount() {
    //get shop name list 
    const shops = await getShops()
    var shopDetailArray = [] 
    for (a in shops) {
        shopDetailArray.push(shops[a]);
    }
    this.setStateValue('shops' , shopDetailArray)

    const user = await getData();
    this.setState({user: user.name, uid: user.uid});
  }

  submitShop = () => {
    const shop = {
      name: this.state.shopName,
      location: this.state.location,
      admin: this.state.user.name,
      uid: this.state.user.uid,
    };

    console.log(JSON.stringify(shop), null, 2);
    addShop(shop);
    this.props.navigation.navigate('shops');
  };

  render() {
 
    let shopPicks = this.state.shops.map((shop,myIndex)=>{
        return(
        <Picker.Item label={shop.name} value={shop} key={myIndex}/>
        )
        });


    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.inputTitles}>Name </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(e) => {
                this.setStateValue(name, e);
              }}></TextInput>

            <Text style={styles.inputTitles}>Type </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(e) => {
                this.setStateValue(type, e);
              }}></TextInput>

            <Text style={styles.inputTitles}>Price (Rs.) </Text>
            <TextInput
              keyboardType={'numeric'}
              style={styles.textInput}
              onChangeText={(e) => {
                this.setStateValue(price, e);
              }}></TextInput>

            <Text style={styles.inputTitles}>Special notes </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(e) => {
                this.setStateValue(specialNotes, e);
              }}></TextInput>

            <Picker
            //   selectedValue={this.state.shopName}
            //   onValueChange={props.handleChange('plantType')}
               >
                   {shopPicks } 
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
