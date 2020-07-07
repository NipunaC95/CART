import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {addShop} from '../../network/shops';
import {getData} from './../../store';
import { withNavigation } from 'react-navigation';



class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      shopName: '',
      location: '',
      name:''
    };
  }
  setShopName(shopName) {
    const state = this.state;
    this.setState({
      ...state,
      shopName,
    });
  }

  setLocation(location) {
    const state = this.state;
    this.setState({
      ...state,
      location,
    });
  }

  setImage(image) {
    const state = this.state;
    this.setState({
      ...state,
      image,
    });
  }

  async componentDidMount() {
    const user = await getData();
    this.setState({user});
  }

  submitShop = () => {
    const shop = {
      name: this.state.shopName,
      location:this.state.location,
      admin: this.state.user.name,
      uid: this.state.user.uid,
    };
    
    console.log(JSON.stringify(shop),null,2)
    addShop(shop);
    this.props.navigation.navigate('shops')
  };

  render() {
    console.log(JSON.stringify(this.state.user , null ,2))
    return (
      <View style={style.container}>
        <Text style={style.text}>Name </Text>
        <TextInput
          style={style.input}
          onChangeText={(e) => {
            this.setShopName(e);
          }}></TextInput>

        <Text style={style.text}>Location </Text>
        <TextInput
          style={style.input}
          onChangeText={(e) => {
            this.setLocation(e);
          }}></TextInput>

        <Text style={style.text}>Image</Text>
        <Button title={'Selcet image'} />

        <View style={style.submitContainer}>
          <Button
            title={'Add Shop'}
            onPress={() => {
              this.submitShop();
            }}
          />
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    height: '100%',
    padding: '5%',
    zIndex: 0,
  },

  text: {
    fontSize: 20,
    marginVertical: 10,
  },

  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 6,
  },

  submitContainer: {
    position: 'relative',
    marginTop: 40,
  },
});
export default withNavigation(index);
