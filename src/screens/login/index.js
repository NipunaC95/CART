import React, {useState} from 'react';
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

const index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const submitForm = () => {
    //console.log(email, password);

    if (email == '') {
      alert('Enter email');
    } else if (password == '') {
      alert('Enter password');
    } else {
      //create account
      logIn(email, password)
        .then((data) => {
          console.log(JSON.stringify(data, null, 2));
        })
        .catch((error) => {
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
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

      <View style={styles.buttonContainer}>
        <Button
          title={'Submit'}
          onPress={() => {
            submitForm();
          }}
        />
      </View>
    </ScrollView>
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
