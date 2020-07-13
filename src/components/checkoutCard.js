import React, {useState} from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {getCustomData, setCustomData} from '../store';  
import moment from 'moment';
const truePhoto = require('./../assets/checkBoxes/checked.png');
const falsePhoto = require('./../assets/checkBoxes/unchecked.png');

const ShopCard = ({ item, toggleItem }) => {
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
      
      <Text style={styles.title}>{item.name}  </Text> 
      <Text style={styles.subTitle}>Type :- {item.type} </Text>
      <Text style={styles.subTitle}>Price :- {item.price}   </Text> 
      <Text style={styles.subTitle}>Requested by :- {item.user}   </Text> 
      <Text style={styles.subTitle}>Asked :- { moment(item.date).fromNow()}   </Text> 
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
    marginBottom: '5%',
    marginHorizontal: '5%',
    height: 160,
    borderRadius: 5,
    backgroundColor: 'white',
    elevation: 2,
  },

  title: { 
    paddingTop: '3.5%', 
    fontSize: 20,
    color: 'black',   
  }, 
  subTitle: {
    top:'10%',
    fontSize: 16, 
    color: 'black',  
  }, 
  selection: { 
    position: 'absolute',
    right: 35,
    top:'18%',
    borderRadius: 40,
    width: 35,
    height: 35,
  },
});
 
export default ShopCard;
