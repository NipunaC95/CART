import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Checkout from '../../components/checkoutCard';
import {setCustomData, getData, getCustomData} from '../../store';
import {collectRequests} from '../../network/requests';

const index = ({navigation}) => {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const subscriber = firestore()
      .collection('Requests')
      .onSnapshot(async (querySnapshot) => {
        const requests = [];
        const shopData = await getCustomData('shopData');
        console.log(JSON.stringify(shopData, null, 2));

        querySnapshot.forEach((documentSnapshot) => {
          if (
            documentSnapshot.data().shopId == shopData.id &&
            documentSnapshot.data().status != 'collected'
          ) {
            console.log(documentSnapshot.data().status );

            requests.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
              selected: false,
            });
          }
        });

        const me = await getData();
        setCurrentUser(me);
        setRequests(requests);
      });
    return () => subscriber();
  }, []);

  const toggleItem = (item, state) => {
    console.log(item.name);
    var key = item.key;
    if (state == false) {
      setSelected({...selected, [key]: item});
    } else {
      var selectedObject = selected;
      delete selectedObject[key];
      setSelected({...selectedObject});
    }
    console.log(JSON.stringify(selected, null, 2));
  };

  const setFinished = () => {
    /**
     * get All objects set their state as collected
     * set Price if needed
     * add collected by name and uid
     * in the request screen after collected editions / deltions are prohibited
     * Then set recieved box which will delete the request
     */
    collectRequests(selected, currentUser.name, currentUser.uid);
    // console.log(JSON.stringify(selected , null , 2))
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputTitles}>Selcet items you collected </Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={requests}
        renderItem={({item}) => {
          return (
            <Checkout
              item={item}
              name={item.name}
              photo={item.image}
              uid={item.uid}
              toggleItem={toggleItem}
            />
          );
        }}
      />

      <Button
        title={'Finish'}
        onPress={() => {
          setFinished();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Segoe UI',
    flex: 1,
    backgroundColor: '#E4E4E4',
  },

  card: {
    borderRadius: 6,
    backgroundColor: 'white',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    marginLeft: '5%',
    top: 40,
    height: '90%',
    width: '90%',
    position: 'relative',
    //  zIndex: -1,
  },
  inputTitles: {
    marginLeft: 25,
    fontFamily: 'Segoe UI',
    fontSize: 18,
    marginTop: 30,
  },
  textInput: {
    marginLeft: 25,
    fontFamily: 'Segoe UI',
    fontSize: 15,
    color: '#404040',
    width: '85%',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginLeft: 25,
  },

  loginText: {
    fontFamily: 'Segoe UI',
    fontSize: 16,
    color: 'green',
    marginLeft: 65,
    marginTop: 10,
  },

  centerButton: {
    marginTop: 100,
    // alignContent:'center',
    alignItems: 'center',
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
    right: '5%',
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

export default index;
