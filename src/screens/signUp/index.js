import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import {signUp} from '../../network/users';
import {useNavigation} from '@react-navigation/native';
import {
  GreenButton,
  GreenButtonNoPadding,
} from '../../components/buttons/customButton';

const index = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigation = useNavigation();

  const submitForm = () => {
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
      signUp(email, password, userName, navigation);
      navigation.navigate('login');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>SignUp</Text>
        <Text style={styles.inputTitles}>Username</Text>
        <TextInput
          onChangeText={(e) => {
            setUserName(e);
          }}
          style={styles.input}
        />

        <Text style={styles.inputTitles}>email</Text>
        <TextInput
          onChangeText={(e) => {
            setEmail(e);
          }}
          style={styles.input}
        />

        <Text style={styles.inputTitles}>Password</Text>
        <TextInput
          secureTextEntry={true}
          onChangeText={(e) => {
            setPassword(e);
          }}
          style={styles.input}
        />

        <Text style={styles.inputTitles}>Re enter password</Text>
        <TextInput
          secureTextEntry={true}
          onChangeText={(e) => {
            setRepeatPassword(e);
          }}
          style={styles.input}
        />

        <View style={styles.buttonContainer}>
          <GreenButtonNoPadding
            title={'Submit'}
            onPress={() => {
              submitForm();
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default index;
const styles = StyleSheet.create({
  container: {
    fontFamily: 'Segoe UI',
    flex: 1,
    height: 650,
    backgroundColor: '#E4E4E4',
  },

  card: {
    borderRadius: 6,
    backgroundColor: 'white',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    marginLeft: '5%',
    top: 40,
    height: 650,
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
  input: {
    marginLeft: 25,
    fontFamily: 'Segoe UI',
    fontSize: 15,
    color: '#404040',
    width: '85%',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
});
