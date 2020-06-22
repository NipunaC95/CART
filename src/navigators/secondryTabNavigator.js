import React from 'react';
import { StyleSheet } from 'react-native';

import ShopsScreen from "./../screens/shops/index";
import GroupsScreen from "./../screens/groups/index";

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();

const secondryTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: styles.labels,
          tabStyle: styles.tabs,
          style: styles.header,
          indicatorStyle: styles.indicator,
        }}>
        <Tab.Screen name="Shops" component={ShopsScreen} />
        <Tab.Screen name="Groups" component={GroupsScreen} /> 
      </Tab.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
    labels: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
      },
      tabs: {
        //borderBottomColor:'red'
        // width: 100
      },
      indicator: {
        height: '100%',
        backgroundColor: '#0F4021',
        borderBottomColor: '#16C60C',
        borderBottomWidth: 3,
      },
    
      header: {
        backgroundColor: '#0F4021',
      },
})
export default secondryTabNavigator;
