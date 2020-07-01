import React, { Component }  from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import { updateImage } from "./../../network/userProfile";
import { DARKGREEN} from '../../styles/colors'
import { getData , setData } from "./../../store";

class index extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        image:'',
        uid:'',
        uri:''
    };
  }

handleClick = () => {
  ImagePicker.showImagePicker({title:'Pick an image',maxHeight:600 , maxWidth:600},
  response=>{
      
     const data = this.state
     this.setState({
         ...data ,uri:response.uri
     })
 
    //upload image and update document 
    updateImage( this.state.uid, response.uri)

    
     
    console.log( this.state.uid)
    console.log(response.uri)
  }
  )
};

async componentDidMount(){
  console.log(JSON.stringify((await getData()),null,2))
  const userData = await getData();

 this.setState({
     uri:userData.downloadURL,
     uid:userData.uid,
     user:userData
 })

}


  render() {
    return (
        <View style={styles.imageContainer}>
        <Image
          source={{uri:this.state.uri}}
          style={styles.image}
        />
        <View style={styles.editIconContainer}>
          <TouchableWithoutFeedback
            style={styles.editButon}
            onPress={() => this.handleClick()}>
            <Icon name="pencil" style={styles.editIcon} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
    imageContainer: {
      position: 'relative',
      top: 50,
      padding: 20,
      alignItems: 'center', 
    },
  
    image: {
      height: 230,
      width: 230,
      borderRadius: 115,
      resizeMode: 'cover',
    },
    editIconContainer: {
      alignContent: 'center',
      width: 50,
      height: 50,
      backgroundColor: DARKGREEN,
      position: 'absolute',
      borderRadius: 25,
      left: 210,
      top: 200,
      alignItems: 'center',
      justifyContent: 'center',
    },
    editIcon: {
      color: 'white',
      fontSize: 30,
    },
    editButton: {
      backgroundColor: 'green',
      opacity: 0.1,
    },
  });
  

export default index;
