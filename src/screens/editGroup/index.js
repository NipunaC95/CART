import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { getCustomData} from '../../store';
import { deleteGroup , renameGroup } from '../../network/groups';
import { 
  RedButton,
  GreenButtonNoPadding,
} from '../../components/buttons/customButton';
class index extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '', 
    };
  }
  setData(key, value) {
    const state = this.state;
    this.setState({
      ...state,
      [key]: value,
    });
  }
  async componentDidMount() {
    const data = await getCustomData('groupInfo');
    console.log(JSON.stringify(data, null, 2));
    this.setState({...data});
  }

  updateGroup(group) {
    if (this.state.name.length < 3) {
      alert('Group name should contain more than 2 characters'); 
    } else {
      renameGroup( group.id , this.state.name);
      this.props.navigation.navigate('groups');
    }
  }

  deleteAGroup(group) {
    Alert.alert(
      'Delete',
      `Do you really want to delete this group (${group}) ?`,
      [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            console.log(JSON.stringify(this.state , null , 2))
            deleteGroup(this.state.id);
            this.props.navigation.navigate('groups');
          },
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    console.log(JSON.stringify(this.state));
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.inputTitles}>Name </Text>
          <TextInput
            placeholder={'Name of the group'}
            style={styles.textInput}
            value={this.state.name}
            onChangeText={(e) => {
              this.setData('name', e);
            }}></TextInput>

          <GreenButtonNoPadding
            title={'Rename'}
            onPress={() => this.updateGroup(this.state)}
          />
          <RedButton
            title={'Delete group'}
            onPress={() => this.deleteAGroup(this.state.name)}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

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
    height: '60%',
    width: '90%',
    position: 'relative',
    //  zIndex: -1,
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

export default index;
