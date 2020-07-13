import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const groupMembersCard = ({item}) => {
  console.log(JSON.stringify(item,null,3))
  return (
    <View style={styles.card}>
      <Image source={{uri: item.image}} style={styles.image} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  card: { 
    padding: '5%', 
    height: 100,
    width: 100,
    borderRadius: 5,
    backgroundColor: 'white', 
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

export default groupMembersCard;
