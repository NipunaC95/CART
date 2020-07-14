import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {addShop} from '../../network/shops';
import {getData} from './../../store';
import {withNavigation} from 'react-navigation';
import {GreenButton} from '../../components/buttons/customButton';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      shopName: '',
      location: '',
      name: '',
      type:''
    };
  }
 
  setData(key, value) {
    const state = this.state;
    this.setState({
      ...state,
      [key]: value,
    });
  }

  async componentDidMount() {
    const user = await getData();
    this.setState({user});
  }

  submitShop = () => {
    if(this.state.shopName.length <3){
      alert('Shop name should contain more than 2 characters');
    }else if(this.state.location.length <6){
      alert('Location of the shop should contain more than 5 characters');
    }else if(this.state.type.length <6){
      alert('Shop type should contain more than 5 characters');
    }
    else{
      
    const shop = {
      name: this.state.shopName,
      location: this.state.location,
      admin: this.state.user.name,
      uid: this.state.user.uid,
      type:this.state.user.type
    };

    console.log(JSON.stringify(shop), null, 2);
    addShop(shop);
    this.props.navigation.navigate('shops');
    }
  };

  render() {
    console.log(JSON.stringify(this.state.user, null, 2));
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.inputTitles}>Name </Text>
          <TextInput
            placeholder={'Name of the shop'}
            style={styles.textInput}
            onChangeText={(e) => {
              this.setData('shopName', e);
            }}></TextInput>

          <Text style={styles.inputTitles}>Location </Text>
          <TextInput
            placeholder={'Location of the shop'}
            style={styles.textInput}
            onChangeText={(e) => {
              this.setData('location', e);
            }}></TextInput>

          <Text style={styles.inputTitles}>Type </Text>
          <TextInput
            placeholder={'Type of the shop'}
            style={styles.textInput}
            onChangeText={(e) => {
              this.setData('type', e);
            }}></TextInput>

          <View style={styles.submitContainer}>
            <GreenButton
              title={'Add Shop'}
              onPress={() => {
                this.submitShop();
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
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
    height: '75%',
    width: '90%',
    position: 'relative',
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

  shopPicker: {
    width: '80%',
    marginTop: '5%',
    marginHorizontal: '10%',
  },

  centerButton: {
    marginTop: 100,
    alignItems: 'center',
  },
});
export default withNavigation(index);
