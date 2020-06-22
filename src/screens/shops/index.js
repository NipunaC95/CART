import React, { useState } from 'react';
import {Text, FlatList, SafeAreaView} from 'react-native';
import {getShops} from './../../network/shops'; 
 

const shopsScreen = () => {
const [shopList, setshopList] = useState([]);
  const list = getShops(); 
  setshopList({list:list});
  return (
    <SafeAreaView>
      <FlatList
        data={this.shopList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          console.log(item);
          return <Text>{item.name}</Text>;
        }}
      />
    </SafeAreaView>
  );
};

export default shopsScreen;
