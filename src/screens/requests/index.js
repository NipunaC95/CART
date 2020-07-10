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
import RequestCard from './../../components/requestCard';
import {withNavigation} from 'react-navigation';

import {setCustomData, getData} from './../../store';

const shopsScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [request, setshops] = useState([]); // Initial empty array of request

  useEffect(async() => {

    const user = await getData();

    const subscriber = firestore()
      .collection('Requests')
      .onSnapshot((querySnapshot) => {
        const request = [];

        querySnapshot.forEach((documentSnapshot) => {
            const data = documentSnapshot.data()
            if(data.uid==user.uid){
                request.push({
                    ...data,
                    key: documentSnapshot.id,
                });
            }  
        }); 
        setshops(request);
        setLoading(false);
      });
    return () => subscriber();
  }, []);
 

  const navigateToEditRequest= async (item) => {
    const user = await getData(); 
    if (item.uid == user.uid) {
      setCustomData('request' , item)
      navigation.navigate('editRequest');
    }else{
      alert('You should be the admin to edit this request details '); 
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
          data={request}
          renderItem={({item}) => {
            return (
              <RequestCard
                name={item.name}
                group={item.group}
                shop={item.admin}
                photo={item.image}
                state={item.status}
                onPress={() => {
                  if(item.status=='collected'){
                   alert(`This item is already collected by ${item.collectorName}`) 
                  }else{ 
                  navigateToEditRequest(item);
                  }
                }} 
              />
            );
          }}
        />
 
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
  container: {
    height: '100%',
    paddingHorizontal: '5%',
    zIndex: 0,
    elevation: 1,
  },
 

 
});

export default withNavigation(shopsScreen);
