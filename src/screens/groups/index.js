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
import GroupCard from '../../components/groupCard';

import {setCustomData, getData} from './../../store';
import { deleteGroup } from "./../../network/groups";

const groupsScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [groups, setgroups] = useState([]); // Initial empty array of groups
  
  useEffect(() => {
    var user = ""
     async function foo(){
      user = await getData();  
    }
  
    foo();
    const subscriber = firestore()
      .collection('Groups')
      .onSnapshot((querySnapshot) => {
        const groups = [];

        querySnapshot.forEach((documentSnapshot) => {
          var isAUser = false;
          const data = documentSnapshot.data();
          for (var a in data.users) {
            console.log((data.users[a].uid + " -- "+  user.uid))
            if (data.users[a].uid  == user.uid) {
              isAUser = true;
              break;
            }
          }

          if (isAUser) {
            groups.push({
              ...data,
              key: documentSnapshot.id,
            });
          }
        });
        setgroups(groups);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  const navigateToAddGroup = (user) => {
    navigation.navigate('addGroupMembers', user);
  };

  const navigateToViewGroup = async (item) => {
    setCustomData('groupInfo', item);
    navigation.navigate('viewGroup');
  };

  const editGroup = async (item) => {
    const user = await getData(); 
    if (user.uid != item.admin.uid) {
      alert('You are not the admin to make changes to this group');
    }else{ 
      setCustomData('groupInfo', item);
      navigation.navigate('editGroup')
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
          data={groups}
          renderItem={({item}) => {
            return (
              <GroupCard
                item={item}
                onPress={() => {
                  navigateToViewGroup(item);
                }} 
                onLongPress={() => {
                  editGroup(item);
                }}
              />
            );
          }}
        />
        <View style={styles.plus}>
          <TouchableOpacity
            style={styles.plusWrapper}
            onPress={() => {
              navigateToAddGroup();
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

export default groupsScreen;
