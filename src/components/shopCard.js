import React from 'react';
import {View, Text} from 'react-native';

const shopCard = ({name, location, image}) => {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{location}</Text>
      <Text>{image}</Text>
    </View>
  );
};

export default shopCard;
