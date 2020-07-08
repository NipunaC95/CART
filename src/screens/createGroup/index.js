import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList, 
} from 'react-native';
import {getCustomData, getData} from '../../store';
import { addGroup } from "./../../network/groups"; 



class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: '', 
      memberArray: '',
      admin:{}
    };
  }

  createGroup =  async() => { 
    const me = await getData();
    const {name , uid } = await me 
    
    const group ={
      admin : {name , uid},
      name:this.state.name,
      users:this.state.memberArray,
      date: new Date()
    }
    
    addGroup(group);
    this.props.navigation.navigate('secondryNavigator', { screen: 'groups'})
    
  };

  setGroupName = (name) => {
    this.setState({...this.state, name});
  };

  componentDidMount = async () => {
    const me = await getData();
    const members = await getCustomData('userList');
    var memberArray = [];
    memberArray.push(me)
    for (a in members) {
      memberArray.push(members[a]);
    }
    this.setState({
      ...this.state, 
      members,
      memberArray,
      loading: false,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.inputTitles}>Add a group name </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => {
              this.setGroupName(text);
            }}
          />

          <Text> {''}</Text>
          <Text>Members :</Text>
          {this.state.loading ? (
            <Text>loading...</Text>
          ) : (
            <FlatList
              data={this.state.memberArray}
              keyExtractor={item => item.date}
              renderItem={({item}) => {
                return <Text> {item.name}</Text>;
              }}
            />
          )}
          <Text> {''}</Text>
          <Button title={'create Group'} onPress={()=>this.createGroup()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Segoe UI',
    flex: 1,
    backgroundColor: '#E4E4E4',
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
  errorText: {
    color: 'red',
    fontSize: 13,
    marginLeft: 25,
  },

  card: {
    borderRadius: 6,
    backgroundColor: 'white',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    marginLeft: '5%',
    top: 40,
    height: '90%',
    width: '90%',
    position: 'relative',
  },

  plus: {
    elevation: 3,
    position: 'absolute',
    right: '10%',
    bottom: '5%',
    backgroundColor: '#0F4021',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  plusText: {
    color: 'white',
    fontSize: 25,
  },
});

export default  index ;
