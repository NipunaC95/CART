import * as React from 'react';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import secondryTabNavigator from './secondryTabNavigator';
import {
  SignUpScreen,
  LoginScreen,
  ProfileScreen,
  AddGroupMembersScreen,
  CreateGroupScreen,
  ViewGroupScreen,
  AddRequestsScreen,
  EditRequestScreen,
  CheckoutScreen,
  AddShopScreen,
  EditShopScreen,
  SplashScreen,
  EditGroupScreen,
} from './../screens';
import {DARKGREEN, LIGHTGREEN} from './../styles/colors';
const Stack = createStackNavigator();

//AddShop ,  EditShop , LoginScreen ,SignUpScreen ,ShopsScreen , GroupsScreen ,profileScreen , requirementsScreen

const mainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="addRequest"
        initialRouteName="splash"
        //initialRouteName="addshop"
        //initialRouteName="signup"
        //initialRouteName="login"
        //initialRouteName="login"
        //initialRouteName="profile"
        //initialRouteName="addGroupMembers"
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
          component={AddShopScreen}
          options={{
            headerShown: true,
            title: 'Add a new shop',
            headerTitleAlign: 'left',
          }}
        />

        <Stack.Screen
          name="editShop"
          component={EditShopScreen}
          options={{
            headerShown: true,
            title: 'Edit / Delete a shop',
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
          options={{title: 'Cart',
          headerLeft: null}}
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

        <Stack.Screen
          name="viewGroup"
          component={ViewGroupScreen}
          options={{title: 'View group requests', headerShown: true}}
        />

        <Stack.Screen
          name="addRequest"
          component={AddRequestsScreen}
          options={{title: 'Create a request', headerShown: true}}
        />

        <Stack.Screen
          name="editRequest"
          component={EditRequestScreen}
          options={{title: 'Edit / Delete a request', headerShown: true}}
        />

        <Stack.Screen
          name="checkout"
          component={CheckoutScreen}
          options={{title: 'Checkout', headerShown: true}}
        />

        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="editGroup"
          component={EditGroupScreen}
          options={{title: 'Rename group', headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default mainStackNavigator;
