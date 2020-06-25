import * as React from 'react';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import  secondryTabNavigator   from "./secondryTabNavigator";
import { AddShop } from "./../screens"
import  Login from './../screens/login'
import SignUp from './../screens/signUp'
import { DARKGREEN , LIGHTGREEN } from "./../styles/colors";

const Stack = createStackNavigator();

const mainStackNavigator = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator
        // initialRouteName="secondryNavigator" 
        //initialRouteName="addshop" 
        initialRouteName="signup"
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: DARKGREEN, 
            elevation:0 
          },
          headerTintColor: 'white',
          headerTitleAlign: 'left',
          headerTitleStyle: { 
            fontSize: 20,
    elevation: 0,
          }, 
        } 

        }>
          
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="addShop"
          component={AddShop}
          options={{headerShown: true , title:'Add a new shop' ,headerTitleAlign:'left' }}
        />
        <Stack.Screen
          name="signup"
          component={SignUp}
          options={{headerShown: false}}
        />
 
        <Stack.Screen name="secondryNavigator" 
        component={ secondryTabNavigator} 
        options={{title:'Cart' ,headerShown: true ,   }}
        defa/>
 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default mainStackNavigator;
