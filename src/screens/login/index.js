import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {logIn, getUser} from '../../network/users';
import {useNavigation} from '@react-navigation/native';
import {getData, setData, clearAppData} from './../../store';
import {getUserDetails} from './../../network/users';
import {GreenButton, GreenButtonNoPadding} from '../../components/buttons/customButton';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      uid: '',
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
    const email = this.state.email;
    const password = this.state.password;
    if (email == '') {
      alert('Enter email');
    } else if (password == '') {
      alert('Enter password');
    } else {
      logIn(email, password)
        .then(async (data) => {
          const state = this.state;
          const User = await getUserDetails(data.user.uid);
          this.setState({...state, uid: data.user.uid, user: User});
          setData(User);
        })
        .then(() => {
          this.props.navigation.navigate('secondryNavigator', {
            screen: 'requests',
          });
        })
        .catch((error) => {
          alert('Error occured ', error);
        });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>

          <Text style={styles.inputTitles}>email</Text>
          <TextInput
            onChangeText={(e) => {
              this.setEmail(e);
            }}
            value={this.state.email}
            style={styles.textInput}
          />

          <Text style={styles.inputTitles}>Password</Text>
          <TextInput
          secureTextEntry={true}
            onChangeText={(e) => {
              this.setPassword(e);
            }}
            value={this.state.password}
            style={styles.textInput}
          />

          <View style={styles.buttonContainer}>
            <GreenButtonNoPadding
              title={'Log in'}
              onPress={() => {
                this.submitForm();
              }}
            />
 <GreenButtonNoPadding
              title={'Sign up'}
              onPress={() => {
                this.props.navigation.navigate('signup')
              }}
            /> 
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default index;

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Segoe UI',
    flex: 1,
    backgroundColor: '#E4E4E4',
  },

  card: {
    borderRadius: 6,
    backgroundColor: 'white',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    marginLeft: '5%',
    top: 40,
    height: 500,
    width: '90%',
    position: 'relative',
    //  zIndex: -1,
  },
  title: {
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontFamily: 'Segoe UI',
    fontSize: 26,
    marginTop: 30,
  },

  inputTitles: {
    marginLeft: 25,
    fontFamily: 'Segoe UI',
    fontSize: 18,
    marginTop: 30,
  },
  textInput: {
    marginLeft: 25,
    fontFamily: 'Segoe UI',
    fontSize: 15,
    color: '#404040',
    width: '85%',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
});
