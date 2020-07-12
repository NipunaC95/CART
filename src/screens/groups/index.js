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

const groupsScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [groups, setgroups] = useState([]); // Initial empty array of groups

  useEffect(() => {
    const subscriber = firestore()
      .collection('Groups')
      .onSnapshot((querySnapshot) => {
        const groups = [];

        querySnapshot.forEach((documentSnapshot) => {
          groups.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setgroups(groups);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  const navigateToAddGroup = (user) => {
    navigation.navigate('addGroupMembers', user);
  };

  const navigateToViewGroup= async (item) => { 
      setCustomData('groupInfo', item);
      navigation.navigate('viewGroup'); 
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
                item ={item}
                onPress={() => {
                  navigateToViewGroup(item);
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
