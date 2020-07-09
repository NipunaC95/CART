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

import {setCustomData, getData, getCustomData} from './../../store';
import request from 'superagent';

const shopsScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [requests, setRequests] = useState([]); // Initial empty array of shops

  useEffect(() => {
    const subscriber = firestore()
      .collection('Requests')
      .onSnapshot(async(querySnapshot) => {
        const requests = [];
        const groupInfo = await getCustomData('groupInfo') 
        querySnapshot.forEach((documentSnapshot) => {
          if(groupInfo.id==documentSnapshot.data().groupID){
            requests.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          } 
        }); 
        setRequests(requests);
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

  const navigateToAddNewRequest = (user) => {
    // const groupData = {}
    // setCustomData('groupData')
    navigation.navigate('addRequest', user);
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
          data={requests}
          renderItem={({item}) => {
            return (
              
              <RequestCard
              name={item.name}
              group={item.group}
              shop={item.admin}
              photo={item.image}
              onPress={() => {
                navigateToEditRequest(item);
              }}
             // onPress={()=>{alert('Show')}}
            />
            );
          }}
        />
        <View style={styles.plus}>
          <TouchableOpacity
            style={styles.plusWrapper}
            onPress={() => {
              navigateToAddNewRequest();
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
