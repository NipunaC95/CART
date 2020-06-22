import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native'; 
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const ShopCard = ({name, location, admin, photo, onPress , onLongPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress} style={styles.card}>
  
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subTitle}>located at {location}</Text>
        <Text style={styles.details}>Added by {admin}</Text>
        <Image source={{uri: photo}} style={styles.image} />
     
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 6,
    padding: '7%',
    marginTop: '10%',
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
