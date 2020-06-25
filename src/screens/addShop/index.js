import React , {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import { addShop } from '../../network/shops';
 
export default function index() {
  const [shopName, setShopName] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');

  const submitShop = () => {
    alert(shopName + ' ' + location)
    const shop ={ name:shopName , location , admin:"Test user"}
    addShop(shop)
  
  };

  return (
    <View style={style.container}>
      <Text style={style.text}>Name </Text>
      <TextInput style={style.input}  onChangeText={(e)=>{setShopName(e)}}></TextInput>

      <Text style={style.text}>Location </Text>
      <TextInput style={style.input}  onChangeText={(e)=>{setLocation(e)}}></TextInput>

      <Text style={style.text}>Image</Text>
      <Button title={'Selcet image'} />

      <View style={style.submitContainer}>
        <Button title={'Add Shop'}  onPress={()=>{submitShop()}}/>
      </View>
    </View>
  );
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
