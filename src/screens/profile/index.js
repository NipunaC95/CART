import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {getData} from '../../store';
import {Button} from 'native-base';

export class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };

  }

  async componentDidMount(){

    const user = await getData();
    this.setState({user});
    
  }



   showState(){
    //const user =wa getData();  
    console.log(JSON.stringify(this.state, null, 2));

  }
 
 



  render() {
 

 
  
    return (
      <View style={styles.container}>
        <Text>Profile </Text>

        <Text>Name: {this.state.user.name}</Text>
        <Text>Email : {this.state.user.email}</Text>
        <Text>UID : {this.state.user.uid}</Text>
        <Text>
          varified email ? : {this.state.user.emailVerified ? ' Yes' : ' No'}
        </Text>
        <Image source={{uri: this.state.user.image}} />

        <Button
          onPress={() => {
           this.showState()
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
});

export default ProfileScreen;
