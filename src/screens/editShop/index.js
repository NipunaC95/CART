import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Button , Alert} from 'react-native';
import {setCustomData, getCustomData} from './../../store';
import { updateShop , deleteShop } from "../../network/shops";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  async componentDidMount() {
    const data = await getCustomData('shop');
    console.log(JSON.stringify(data, null, 2));
    this.setState({...data});
  }

  updateShop(shop) {
    updateShop(shop);
    this.props.navigation.navigate('shops')
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
        {text: 'Yes', onPress: () => {
          deleteShop(shop);
          this.props.navigation.navigate('shops')
        }},
      ],
      {cancelable: false},
    );
  }

  render() {
    console.log(JSON.stringify(this.state));
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.inputTitles}>Shop name</Text>
          <TextInput
            placeholder={'Name'}
            onChangeText={(name) => {
              this.setState({...this.state, name});
            }}
            value={this.state.name}
            style={styles.textInput}
          />
          <Text style={styles.inputTitles}>Location of the shop</Text>
          <TextInput
            placeholder={'Location'}
            onChangeText={(location) => {
              this.setState({...this.state, location});
            }}
            value={this.state.location}
            style={styles.textInput}
          />


          <Button title={'Update'} onPress={() => this.updateShop(this.state)} />
          <Text>{''}</Text>
          <Button title={'Delete'} onPress={() => this.deleteShop(this.state.key)} />
        </View>
      </View>
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

export default index;
