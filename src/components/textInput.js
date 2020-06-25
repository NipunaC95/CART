import React , {useState} from 'react';
import { TextInput , StyleSheet} from 'react-native';
import {DARKGREEN , LIGHTGREEN} from "./../styles/colors";


const textInput = ({onTextChange}) => {
    const [BorderColor, setBorderColor] = useState({
        borderColor:'white'
      })

  return (
    <TextInput
      style={{...style.input, borderColor: BorderColor}}
      onFocus={() => {
        setBorderColor(LIGHTGREEN);
      }}
      onTextChange={(value)=>onTextChange(value)}
      onBlur={() => setBorderColor('white')}
    />
  );
};
const style = StyleSheet.create({
    container: {
        height: '100%',
        padding: '5%',
        zIndex: 0, 
      },

    text:{
        fontSize:20,
        marginVertical:10
    },

    input:{ 
        borderWidth:1,
        borderRadius:6
    }
});

export default textInput;
