import React, {Component} from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {TextInput, ScrollView} from 'react-native-gesture-handler';
import {getShops} from '../../network/shops';
import {addRequest} from '../../network/requests';
import {getData, getCustomData} from './../../store';
import {withNavigation} from 'react-navigation';
import {Picker} from '@react-native-community/picker';
import {GreenButton} from '../../components/buttons/customButton';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shops: [],
      name: '',
      selectedShop: {},
      shop: '',
      shopId: '',
      type: '',
      price: 0,
      specialNotes: '',
      user: '',
      uid: '',
      groupName: '',
      groupID: '',
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
      selectedShop: shop,
    });
  }

  async componentDidMount() {
    //get shop name list
    const shops = await getShops();
    var shopDetailArray = [];
    for (a in shops) {
      shopDetailArray.push(shops[a]);
    }
    const groupData = await getCustomData('groupInfo');

    const user = await getData();
    this.setState({
      user: user.name,
      uid: user.uid,
      groupName: groupData.name,
      shops: shopDetailArray,
      groupID: groupData.id,
      shop: shopDetailArray[0],
    });
  }

  submitShop = () => {
    const {
      name,
      shop,
      shopId,
      type,
      price,
      specialNotes,
      user,
      uid,
      groupName,
      groupID,
    } = this.state;

    if (name.length < 6) {
      alert('Item name should contain more than 5 characters');
    } else if (type.length < 3) {
      alert('Item type should contain more than 2 characters');
    } else if (price == 0) {
      alert('Price should not be zero or empty');
    } else {
      const request = {
        name,
        shop,
        shopId,
        type,
        price,
        specialNotes,
        user,
        uid,
        groupName,
        groupID,
      };

      //console.log(request);
      addRequest(request);
      this.props.navigation.navigate('secondryNavigator', {screen: 'shops'});
    }
  };

  render() {
    let shopPicks = this.state.shops.map((shop, myIndex) => {
      return <Picker.Item label={shop.name} value={shop} key={myIndex} />;
    });

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
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
            placeholder="Eg:- Foods / Grocery / Stationery etc. "
            style={styles.textInput}
            onChangeText={(e) => {
              this.setStateValue('type', e);
            }}></TextInput>

          <Text style={styles.inputTitles}>Price (Rs.) </Text>
          <TextInput
            placeholder="How much will it cost "
            keyboardType={'numeric'}
            style={styles.textInput}
            onChangeText={(e) => {
              this.setStateValue('price', e);
            }}></TextInput>

          <Picker
            style={styles.shopPicker}
            selectedValue={this.state.selectedShop}
            selectedValue={
              (this.state && this.state.selectedShop) || this.state.shops[0]
            }
            onValueChange={(e) => {
              this.setShop(e);
            }}>
            {shopPicks}
          </Picker>

          <View style={styles.submitContainer}>
            <GreenButton
              title={'Create a request'}
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
    height: '80%',
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
