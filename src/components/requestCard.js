import React from 'react';
import {Text, StyleSheet, Alert} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';



import moment from 'moment';
import { deleteRequest } from '../network/requests';

const RequestCard = ({item, onPress, onLongPress}) => {
  const createTwoButtonAlert = (id) => {
    
    var type = item.status ? 'fulfilled ' : 'pending'

    Alert.alert(
      `Deleting a ${type} reqest`,
      'Do you want to delete this request ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () =>  {
          deleteRequest(id)
        }},
      ],
      {cancelable: false},
    );
  };
 
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onLongPress={() => createTwoButtonAlert(item.key)}
      style={item.status ? styles.cardRemaining : styles.cardCollected}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subTitle}>Askded from {item.groupName}</Text>
      <Text style={styles.details}>Assigned shop was {item.shop}</Text>
      <Text style={styles.details}>Assued Price was Rs.{item.price}</Text>
      <Text style={styles.details}>
        {item.status
          ? `This item is collected by ${item.collectorName}`
          : 'This item is not collected untill now'}
      </Text>
      <Text style={styles.details}>Asked {moment(item.date).fromNow()} </Text>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardCollected:{
    elevation: 6,
    padding: '5%',
    marginTop: '5%',
    marginBottom: '5%',
    height: 180,
    borderRadius: 10,
    backgroundColor: '#28AC5B',
    elevation: 5,
  },
  cardRemaining:  {
    elevation: 6,
    padding: '5%',
    marginTop: '5%',
    marginBottom: '5%',
    height: 180,
    borderRadius: 10,
    backgroundColor: '#307AFF',
    elevation: 5,
  },

  title: {
    fontSize: 24,
    color: 'white',
  },

  subTitle: {
    fontSize: 18,
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

export default RequestCard;
