import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Button, Alert} from 'react-native';
import {setCustomData, getCustomData} from './../../store';
import {updateShop, deleteShop} from '../../network/shops';
import {updateRequest , deleteRequest} from '../../network/requests';
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: '',
      price: 0,
    };
  }

  async componentDidMount() {
    const data = await getCustomData('request');
    console.log(JSON.stringify(data, null, 2));
    this.setState({...data});
  }

  pressOnUpdate(request) {
    updateRequest(request);
    this.props.navigation.navigate('requests');
  }

  updateStateData(key, value) {
    const data = this.state;
    this.setState({...data, [key]: value});
  }

  deleteRequest(request) {
    Alert.alert(
      'Delete',
      `Do you really want to delete this request (${request}) ?`,
      [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            deleteRequest(request);
            this.props.navigation.navigate('secondryNavigator', { screen: 'reqests' });
          },
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.inputTitles}>Name</Text>
          <TextInput
            placeholder={'Name of the item'}
            onChangeText={(name) => {
              this.updateStateData('name', name);
            }}
            value={this.state.name}
            style={styles.textInput}
          />

          <Text style={styles.inputTitles}>Type</Text>
          <TextInput
            placeholder={'Type of the item'}
            onChangeText={(type) => {
              this.updateStateData( 'type',type);
            }}
            value={this.state.type}
            style={styles.textInput}
          />

          <Text style={styles.inputTitles}>Price</Text>
          <TextInput
            placeholder={'Price of the item'}
            onChangeText={(price) => {
              this.updateStateData( 'price',price);
            }}
            value={this.state.price}
            style={styles.textInput}
          />

          <Button
            title={'Update'}
            onPress={() => this.pressOnUpdate(this.state)}
          />
          <Text>{''}</Text>
          <Button
            title={'Delete'}
            onPress={() => this.deleteRequest(this.state.key)}
          />
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
