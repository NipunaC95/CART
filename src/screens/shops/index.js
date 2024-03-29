import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ShopCard from './../../components/shopCard';
import {withNavigation} from 'react-navigation';

import {setCustomData, getData} from './../../store';

const shopsScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [shops, setshops] = useState([]); // Initial empty array of shops


  useEffect(() => {
    const subscriber = firestore()
      .collection('Shops')
      .onSnapshot((querySnapshot) => {
        const shops = [];

        querySnapshot.forEach((documentSnapshot) => {
          shops.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setshops(shops);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  const navigateToCheckout = (shop) => {
    setCustomData('shopData',shop)
    navigation.navigate('checkout');
  };


  const navigateToAddShop = () => { 
    navigation.navigate('addShop');
  };


  const navigateToEditShop = async (item) => { 
    const user = await getData(); 
    if (item.adminUID == user.uid) {
      setCustomData('shop' , item)
      navigation.navigate('editShop');
    }else{
      alert('You should be the admin to edit this shops details '); 
    }   

   
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={shops}
          renderItem={({item}) => {
            return (
              <ShopCard
                item={item}
                onLongPress={() => {
                  navigateToEditShop(item);
                }}
                onPress={()=>{ navigateToCheckout(item);}}
              />
            );
          }}
        />
        <View style={styles.plus}>
          <TouchableOpacity
            style={styles.plusWrapper}
            onPress={() => {
              navigateToAddShop();
            }}>
            <Text style={styles.plusText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  plusHolder: {
    position: 'absolute',
    left: 10,
    top: 10,
  },

  plusWrapper: {
    width: 35,
    height: 35,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    height: '100%',
    paddingHorizontal: '5%',
    zIndex: 0,
    elevation: 1,
  },

  plus: {
    elevation: 3,
    position: 'absolute',
    right: '10%',
    bottom: '5%',
    backgroundColor: '#0F4021',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  plusText: {
    color: 'white',
    fontSize: 25,
  },
});

export default withNavigation(shopsScreen);
