import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import UserCard from '../../components/userCard';
import {   setCustomData, getData} from '../../store'; 
import GroupMembersCard from '../../components/groupMembersCard'

const index = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]); 
  const [current, setCurrent] = useState({})
  
  

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .onSnapshot(async(querySnapshot) => {
        const users = [];

        querySnapshot.forEach((documentSnapshot) => { 
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
            selected: false,
          });
        });

        const me  = await getData()   
        const filtered = users.filter(user => user.uid != me.uid); 
        setUsers(filtered);
      });
    return () => subscriber();
  }, []);

  const toggleItem = (item, state) => {
    console.log(item.name);
    if (state == false) {
      setSelected({...selected, [item.uid]: item});
    } else {
      var uidUser = item.uid;
      var selectedObject = selected;
      delete selectedObject[uidUser];
      setSelected({...selectedObject});
    }
  };


  const navigateToCreateGroup   = () => {
     setCustomData ('userList', selected) 
     navigation.navigate('createGroup')
  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputTitles}>Selcet members  !</Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={users}
        renderItem={({item}) => { 
          return (
            
            <UserCard
              item={item}
              name={item.name}
              photo={item.image}
              uid={item.uid}
              toggleItem={toggleItem}
            />
          );
        }}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{height: 50}}
      />

      <View style={styles.plus}>
        <TouchableOpacity
          style={styles.plusWrapper}
          onPress={() => {
            navigateToCreateGroup();
          }}>
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    height: '90%',
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
  errorText: {
    color: 'red',
    fontSize: 13,
    marginLeft: 25,
  },

  loginText: {
    fontFamily: 'Segoe UI',
    fontSize: 16,
    color: 'green',
    marginLeft: 65,
    marginTop: 10,
  },

  centerButton: {
    marginTop: 100,
    // alignContent:'center',
    alignItems: 'center',
  },plusWrapper: {
    width: 35,
    height: 35,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    height: '100%',
    paddingHorizontal: '5%',
    zIndex: 0,
    elevation: 1,
  },

  plus: {
    elevation: 3,
    position: 'absolute',
    right: '5%',
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

export default index;

/**
 * import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Button , Alert} from 'react-native';
import {setCustomData, getCustomData} from './../../store';
import { updateShop , deleteShop } from "../../network/shops";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  async componentDidMount() {
    const data = await getCustomData('shop'); 
    this.setState({...data});
  }

  updateShop(shop) {
    updateShop(shop);
    this.props.navigation.navigate('shops')
  }

  deleteShop(shop) {
    Alert.alert(
      'Delete',
      `Do you really want to delete this shop (${shop}) ?`,
      [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => {
          deleteShop(shop);
          this.props.navigation.navigate('shops')
        }},
      ],
      {cancelable: false},
    );
  }

  render() {
    console.log(JSON.stringify(this.state));
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.inputTitles}>Shop name</Text>
          <TextInput
            placeholder={'Name'}
            onChangeText={(name) => {
              this.setState({...this.state, name});
            }}
            value={this.state.name}
            style={styles.textInput}
          />
          <Text style={styles.inputTitles}>Location of the shop</Text>
          <TextInput
            placeholder={'Location'}
            onChangeText={(location) => {
              this.setState({...this.state, location});
            }}
            value={this.state.location}
            style={styles.textInput}
          />


          <Button title={'Update'} onPress={() => this.updateShop(this.state)} />
          <Text>{''}</Text>
          <Button title={'Delete'} onPress={() => this.deleteShop(this.state.key)} />
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
  errorText: {
    color: 'red',
    fontSize: 13,
    marginLeft: 25,
  },

  loginText: {
    fontFamily: 'Segoe UI',
    fontSize: 16,
    color: 'green',
    marginLeft: 65,
    marginTop: 10,
  },

  centerButton: {
    marginTop: 100,
    // alignContent:'center',
    alignItems: 'center',
  },
});

export default index;

 */
