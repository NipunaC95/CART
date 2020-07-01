import React, {Component} from 'react';
import {Text, View, StyleSheet, Image , Button} from 'react-native';
import {getData} from '../../store'; 
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileImageSection from './../../components/profileImageSection'

export class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email:'',
        name:''
      },
    };
  }

  async componentDidMount() {
   const user = await getData();
   this.setState({...this.state, user})
  }

  render() { 
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Profile </Text>
        </View>

        <ProfileImageSection  />

        <View style={styles.profileInfoContainer}>
          <View style={styles.profileInfo}>

            <Text style={styles.profileInfoText}>
            <Icon name="account" style={styles.icon3}/> Name: {this.state.user.name}
            </Text>


            <Text style={styles.profileInfoText}>
              Email : {this.state.user.email}
            </Text>
            
            <Text style={styles.profileInfoText}>
              Lives in  ? : Colombo
            </Text>
          </View>
        </View>

        <Button title='Delet acount'
          onPress={() => {
            alert('Delete account')
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: '5%',
    zIndex: 0,
    elevation: 1,
  },

  titleContainer:{
         position:'relative',
         top:40,
         left:10
  },
  title:{
 fontSize:30
  },

  imageContainer: {
    position:'relative',
    top:50,
    padding:20,
    alignItems: 'center',
    backgroundColor:'red'
  },

  image: {
    height: 230,
    width: 230,
    borderRadius: 115,
    resizeMode: 'cover',
  },
  profileInfo: {
    alignItems: 'baseline',
  },

  profileInfoText: {
    fontSize: 18,
  },
 

  profileInfoContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
});

export default ProfileScreen;
