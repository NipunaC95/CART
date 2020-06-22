import * as React from 'react';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  Login,
  SignUp,
  Dashboard,
  Splash,
  ShowFullImg,
  Chat,
} from '../containers/index';
import {color} from '../utility';
import  FrontBarDrawer   from "./frontBarDrawer";

const Stack = createStackNavigator();

const mainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splash" 
        screenOptions={{
          headerShown: true,
          headerStyle: {backgroundColor: color.PRIMARY},
          headerTintColor: color.WHITE,
          headerTitleAlign: 'left',
          headerTitleStyle: { 
            fontSize: 20,
          },
        }}>
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signup"
          component={SignUp}
          options={{headerShown: false}}
        />
 
        <Stack.Screen name="frontbardrawer" component={FrontBarDrawer} 
        options={{title:'Chit Chat'}}/>

        <Stack.Screen
          name="showFullImg"
          component={ShowFullImg}
          options={{
            headerBackTitle: null,
          }}
        />

        <Stack.Screen
          name="chat"
          component={Chat}
          options={{
            headerBackTitle: null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default mainStackNavigator;
