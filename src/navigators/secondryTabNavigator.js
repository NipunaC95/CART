import React from 'react';
import { StyleSheet } from 'react-native'; 
import {ShopsScreen , GroupsScreen , ProfileScreen ,RequirementsScreen } from './../screens/index'   
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'; 

const Tab = createMaterialTopTabNavigator();

const secondryTabNavigator = () => {
  return ( 
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: styles.labels,
          tabStyle: styles.tabs,
          style: styles.header,
          indicatorStyle: styles.indicator,
        }}>
        <Tab.Screen name="shops" component={ShopsScreen} />
        <Tab.Screen name="groups" component={GroupsScreen} /> 
        <Tab.Screen name="requests" component={RequirementsScreen} /> 
        <Tab.Screen name="profile" component={ProfileScreen} /> 
      </Tab.Navigator> 
  );
};


const styles = StyleSheet.create({
    labels: {
        color: 'white',
       // fontWeight: 'bold',
        fontSize: 12,
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
