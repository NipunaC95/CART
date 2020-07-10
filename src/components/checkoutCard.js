import React, {useState} from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {getCustomData, setCustomData} from '../store'; 
const truePhoto = require('./../assets/checkBoxes/checked.png');
const falsePhoto = require('./../assets/checkBoxes/unchecked.png');

const ShopCard = ({name, photo, uid , item, toggleItem }) => {
  const [checked, setchecked] = useState(false);

  const addUserToList = async () => {
    toggleItem(item,checked)
    setchecked(!checked);
  };

  return (
    <TouchableWithoutFeedback
      style={styles.card}
      onPress={() => {
        addUserToList();
      }}>
      <Image source={{uri: photo}} style={styles.image} />
      <Text style={styles.title}>{name} </Text>
      <Image
        source={checked ? truePhoto : falsePhoto}
        style={styles.selection}
        width={30}
        height={30}
      />
      
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 6,
    padding: '5%',
    marginTop: '5%',
    marginHorizontal: '5%',
    height: 100,
    borderRadius: 5,
    backgroundColor: 'white',
    elevation: 2,
  },

  title: {
    paddingVertical: '8%',
    paddingLeft: '2%',
    fontSize: 17,
    color: 'black',
    position: 'relative',
    left: '30%',
    height: '100%',
    justifyContent: 'center',
  },

  image: {
    position: 'absolute',
    left: 15,
    top: 15,
    borderRadius: 40,
    width: 70,
    height: 70,
    backgroundColor: 'red',
  },

  selection: {
    position: 'absolute',
    right: 35,
    top: 32.5,
    borderRadius: 40,
    width: 35,
    height: 35,
  },
});
 
export default ShopCard;
