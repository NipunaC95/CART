import React, {useState, Component} from 'react';
import {connect} from 'react-redux';
import {
  loginRequest,
  loginSuccess,
  loginFailed,
} from './../../redux/actionCreators/authActions';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import {logIn} from '../../network/users';
import {useNavigation} from '@react-navigation/native';

const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: (data) => {  dispatch(loginSuccess(data)); },
    loginFailed: ( ) => {  dispatch(loginFailed( )); },
  };
};

const mapStateToProps = (state) => {
 // console.log(JSON.stringify(state,null,2))
  return { 
    user:  state.auth.user,
  };
};

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      uid:''
    };
  }

  setPassword(text) {
    this.setState({
      ...this.state,
      password: text,
    });
  }

  setEmail(text) {
    this.setState({
      ...this.state,
      email: text,
    });
  }

  submitForm() {
    //console.log(email, password);
    const email = this.state.email;
    const password = this.state.password;
    if (email == '') {
      alert('Enter email');
    } else if (password == '') {
      alert('Enter password');
    } else {
      //create account
      logIn(email, password)
        .then((data) => {
          //console.log(JSON.stringify(data, null, 2));
          //navigation.navigate('profile');
          this.props.loginSuccess(data);

         // console.log(JSON.stringify(this.state));
        })
        .catch((error) => {
          this.props.loginFailed()
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
      // .then((data) => {
      //   console.log(JSON.stringify(data, null, 2));
      // }).catch((e)=>{
      //   console.log(e)
      // });
      //console.log(JSON.stringify(data, null, 2));
    }
  }

testButton(){
  
 //console.log(JSON.stringify(this.props,null,3));
 //console.log(JSON.stringify(this.props.user.user.uid,null,3));
}



  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <Text style={styles.subtitle}>email</Text>
        <TextInput
          onChangeText={(e) => {
            this.setEmail(e);
          }}
          style={styles.input}
        />

        <Text style={styles.subtitle}>Password</Text>
        <TextInput
          onChangeText={(e) => {
            this.setPassword(e);
          }}
          style={styles.input}
        />

        <View style={styles.buttonContainer}>
          <Button
            title={'Submit'}
            onPress={() => {
              this.submitForm();
            }}
          />
<Text>.</Text>
<Button
            title={'Test'}
            onPress={() => {
              this.testButton();
            }}
          />
        </View>

        <Text> {this.props.user.user.uid}</Text>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(index);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: '5%',
    zIndex: 0,
    elevation: 1,
  },

  title: {
    fontSize: 20,
    marginTop: 20,
  },
  subtitle: {
    marginTop: 20,
    fontSize: 18,
  },

  input: {
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
