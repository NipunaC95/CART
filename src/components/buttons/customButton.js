import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BoxShadow} from 'react-native-shadow';

export  function GreenButton({title, onPress}) {
  return (
    <TouchableOpacity style={styles.touch} onPress={onPress}>
      <BoxShadow setting={shadowOpt}></BoxShadow>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#2CBE64', '#33C974', '#2CBE64']}
        style={styles.button}>
        <Text style={styles.buttonText}> {title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export  function GreenButtonNoPadding({title, onPress}) {
  return (
    <TouchableOpacity style={styles.touchNoPad} onPress={onPress}>
      <BoxShadow setting={shadowOpt}></BoxShadow>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#2CBE64', '#33C974', '#2CBE64']}
        style={styles.button}>
        <Text style={styles.buttonText}> {title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}


export  function GreenButtonNoShadow({title, onPress}) {
  return (
    <TouchableOpacity style={styles.touch} onPress={onPress}> 
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#2CBE64', '#33C974', '#2CBE64']}
        style={styles.button}>
        <Text style={styles.buttonText}> {title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}


export  function RedButton({title, onPress}) {
  return (
    <TouchableOpacity style={styles.touchRed} onPress={onPress}>
      <BoxShadow setting={shadowOptRed}></BoxShadow>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#BE2C36', '#C93335', '#BE2C36']}
        style={styles.button}>
        <Text style={styles.buttonText}> {title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}


const shadowOpt = {
  height: 32,
  color: '#C0EBD1',
  border: 18,
  radius: 10,
  opacity: 0.9,
  x: 20,
  width: 137,
  y: 45,
};

const shadowOptRed = {
  height: 32,
  color: '#EBC0C2',
  border: 18,
  radius: 10,
  opacity: 0.9,
  x: 20,
  width: 137,
  y: 45,
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    fontFamily: 'Segoe UI',
    textAlign: 'center',
    margin: 10,
    marginTop: 14,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  button: {
    borderRadius: 5,
    height: 49,
    width: 188,
  },
  touchNoPad:{ 
    position:'relative',  
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:'30%',   
  },
  touchRed:{ 
    position:'relative',  
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:'30%',  
    paddingBottom:30
  },
  touch:{ 
    position:'relative',  
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:'30%',  
    paddingBottom:30
  }
});
