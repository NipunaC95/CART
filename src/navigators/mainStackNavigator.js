import * as React from 'react';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import secondryTabNavigator from './secondryTabNavigator';
import {
  AddShop,
  EditShop,
  SignUpScreen,
  LoginScreen,
  ProfileScreen,
  AddGroupMembersScreen,
  CreateGroupScreen
} from './../screens';
import {DARKGREEN, LIGHTGREEN} from './../styles/colors';
const Stack = createStackNavigator();

//AddShop ,  EditShop , LoginScreen ,SignUpScreen ,ShopsScreen , GroupsScreen ,profileScreen , requirementsScreen

const mainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="secondryNavigator"
        //initialRouteName="addshop"
        //initialRouteName="signup"
        //initialRouteName="login"
        //initialRouteName="login"
        //initialRouteName="profile"
        initialRouteName="addGroupMembers"
        //initialRouteName="createGroup"
        screenOptions={{
          animationEnabled: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: DARKGREEN,
            elevation: 0,
          },
          headerTintColor: 'white',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontSize: 20,
            elevation: 0,
          },
        }}>
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="profile"
          component={ProfileScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="addShop"
          component={AddShop}
          options={{
            headerShown: true,
            title: 'Add a new shop',
            headerTitleAlign: 'left',
          }}
        />

        <Stack.Screen
          name="editShop"
          component={EditShop}
          options={{
            headerShown: true,
            title: 'Edit/ Delete a shop',
            headerTitleAlign: 'left',
          }}
        />

        <Stack.Screen
          name="signup"
          component={SignUpScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="secondryNavigator"
          component={secondryTabNavigator}
          options={{title: 'Cart', headerShown: true}}
        />
        <Stack.Screen
          name="addGroupMembers"
          component={AddGroupMembersScreen}
          options={{title: 'Create a new group', headerShown: true}}
        />
        <Stack.Screen
          name="createGroup"
          component={CreateGroupScreen}
          options={{title: 'Create a new group', headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default mainStackNavigator;
