import React from 'react';
import {Text, StyleSheet, Image , View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const ShopCard = ({item, onPress, onLongPress}) => {
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subTitle}>located at {item.location}</Text>
      <Text style={styles.details}>Added by {item.admin}</Text>
    
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 6,
    padding: '7%',
    marginTop: '5%',
    marginBottom: '5%',
    height: 140,
    borderRadius: 10,
    backgroundColor: '#28AC5B',
    elevation: 5,
  },

  title: {
    fontSize: 24,
    color: 'white',
  },

  subTitle: {
    fontSize: 20,
    color: 'white',
  },

  details: {
    color: 'white',
  },

  image: {
    position: 'absolute',
    right: '10%',
    top: '35%',
    borderRadius: 40,
    width: 80,
    height: 80,
  },
});

export default ShopCard;
