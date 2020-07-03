import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import {logIn, getUser} from '../../network/users';
import {useNavigation} from '@react-navigation/native';
import {getData, setData, clearAppData} from './../../store';
import {getUserDetails} from './../../network/users';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 's@s.com',
      password: 'Nipuna',
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
          this.props.navigation.navigate('secondryNavigator');
        })
        .catch((error) => {
          alert('Error occured ', error);
          console.error(error);
        });
    }
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
          value={this.state.email}
          style={styles.input}
        />

        <Text style={styles.subtitle}>Password</Text>
        <TextInput
          onChangeText={(e) => {
            this.setPassword(e);
          }}
          value={this.state.password}
          style={styles.input}
        />

        <View style={styles.buttonContainer}>
          <Button
            title={'Submit'}
            onPress={() => {
              this.submitForm();
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

export default index;

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
