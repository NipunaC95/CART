import React from 'react';
import {Text, StyleSheet, Image, Alert} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'; 


const GroupCard = ({item, onPress ,  onLongPress}) => {
  return (
    <TouchableWithoutFeedback 
      onPress={onPress}
      onLongPress={onLongPress }
      style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subTitle}>{item.users.length} members</Text>
      <Text style={styles.details}>Created by {item.admin.name}</Text>
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

export default GroupCard;
