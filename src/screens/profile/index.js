import React, {Component} from 'react';
import {Text, View , StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';

 

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    console.log(JSON.stringify(this.props , null , 2))
    return (
      <View style={styles.container}> 

        <Text>Profile </Text>
        <Text>Name: {this.props.user.name}</Text>
        <Text>Email : {this.props.user.email}</Text>
        <Text>UID : {this.props.user.uid}</Text>
        <Text>varified email ? : {this.props.user.emailVerified?' Yes':' No'}</Text>
      </View>
    );
  }



}

const styles = StyleSheet.create({
  container:{ 
      height: '100%',
      paddingHorizontal: '5%',
      zIndex: 0,
      elevation: 1, 
  
  }
})

export default connect(mapStateToProps, null)(ProfileScreen);
 