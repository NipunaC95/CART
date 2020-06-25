import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {signUp} from '../../network/users';

const index = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const submitForm = ({navigator}) => {
    console.log(userName, email, password, repeatPassword);

    if (userName == '') {
      alert('Enter username');
    } else if (email == '') {
      alert('Enter email');
    } else if (password == '') {
      alert('Enter password');
    } else if (password != repeatPassword) {
      alert('Re enter password correctly');
    } else {
      //create account
      signUp(email, password, userName ,navigator);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUp</Text>
      <Text style={styles.subtitle}>Username</Text>
      <TextInput
        onChangeText={(e) => {
          setUserName(e);
        }}
        style={styles.input}
      />

      <Text style={styles.subtitle}>email</Text>
      <TextInput
        onChangeText={(e) => {
          setEmail(e);
        }}
        style={styles.input}
      />

      <Text style={styles.subtitle}>Password</Text>
      <TextInput
        onChangeText={(e) => {
          setPassword(e);
        }}
        style={styles.input}
      />

      <Text style={styles.subtitle}>Re enter password</Text>
      <TextInput
        onChangeText={(e) => {
          setRepeatPassword(e);
        }}
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button
          title={'Submit'}
          onPress={() => {
            submitForm();
          }}
        />
      </View>
    </View>
  );
};

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
