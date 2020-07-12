import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {setCustomData, getCustomData} from './../../store';
import {updateShop, deleteShop} from '../../network/shops';
import {GreenButton, RedButton} from '../../components/buttons/customButton';
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
    const data = await getCustomData('shop');
    this.setState({...data});
  }

  updateShop(shop) {
    if (this.state.name.length < 3) {
      alert('Shop name should contain more than 2 characters');
    } else if (this.state.location.length < 6) {
      alert('Location of the shop should contain more than 5 characters');
    } else if (this.state.type.length < 6) {
      alert('Shop name should contain more than 5 characters');
    } else {
      updateShop(shop);
      this.props.navigation.navigate('shops');
    }
  }

  deleteShop(shop) {
    Alert.alert(
      'Delete',
      `Do you really want to delete this shop (${shop}) ?`,
      [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            deleteShop(shop);
            this.props.navigation.navigate('shops');
          },
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    console.log(JSON.stringify(this.state));
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.inputTitles}>Name </Text>
          <TextInput
            placeholder={'Name of the shop'}
            style={styles.textInput}
            value={this.state.name}
            onChangeText={(e) => {
              this.setData('name', e);
            }}></TextInput>

          <Text style={styles.inputTitles}>Location </Text>
          <TextInput
            placeholder={'Location of the shop'}
            style={styles.textInput}
            value={this.state.location}
            onChangeText={(e) => {
              this.setData('location', e);
            }}></TextInput>

          <Text style={styles.inputTitles}>Type </Text>
          <TextInput
            placeholder={'Type of the shop'}
            style={styles.textInput}
            value={this.state.type}
            onChangeText={(e) => {
              this.setData('type', e);
            }}></TextInput>

          <GreenButton
            title={'Update'}
            onPress={() => this.updateShop(this.state)}
          />
          <RedButton
            title={'Delete'}
            onPress={() => this.deleteShop(this.state.key)}
          />
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
    height: '85%',
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

export default index;
