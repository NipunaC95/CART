import React, {Component} from 'react';
import {Text, View, Modal, Image, Button , TouchableOpacity , TextInput, Keyboard} from 'react-native';
import {getData ,clearAppData} from '../../store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileImageSection from './../../components/profileImageSection';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'; 
import styles from "./styles";
import { updateName } from "./../../network/userProfile"; 
import { withNavigation } from 'react-navigation';
import { logOut , deleteUser } from "./../../network/users";
import {GreenButton ,RedButton , GreenButtonNoPadding, GreenButtonNoShadow} from '../../components/buttons/customButton';

export class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        name: '',
        newName:''
      },
      showModal: false,
    };
  }

  async setData() {
    const user = await getData();
    if(user!=null){
      
    this.setState({...this.state, user});
    }
  }

  showNameChangeModal() {
    const showModal =  this.state.showModal
    this.setState({
      ...this.state,
      showModal:!showModal,
    }); 
    console.log('show')
  }
  onChangeText = (text) => {
    this.setState({
      ...this.state,
      text,
    });
  };

  handleOnChangeName(text){ 
    if(text.lenght < 6){
      alert('Name should be more than 5 characters long')
    }else{ 
      updateName(this.state.user.uid, text)
      const oldUser = this.state.user
      const newUser = {...oldUser,name:text} 
      this.setState({...this.state,user:newUser,showModal: false}) 
    }
  
  }
  
  handleClick = () => { 
    console.log('Clicked');
    this.setState({...this.state, showModal: false});
  };


  handleLogOut =() =>{
    clearAppData();
    logOut();
    this.props.navigation.navigate('login') 
  }


  handleDelete =() =>{
    //deleteUser();
    clearCustomData('user');
    clearAppData();
    this.props.navigation.navigate('login') 
  }


  render() {
    this.setData();
    return (
      <View style={styles.container}>
      
        <ProfileImageSection showModal={this.state.showModal}/> 
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileInfo}>
            <View style={styles.profileInfoRow}>
              <View style={styles.profileInfoColumn1}>
                <Icon name="account" style={styles.miniIcons} />
              </View> 
              <View style={styles.profileInfoColumn2}>
                <Text style={styles.infoTitleText}>Name  </Text>

                
                <Text style={styles.infoSubTitleText}>
                  {this.state.user.name}
                </Text>
              </View> 

              <View style={styles.profileInfoColumn3}>
                <TouchableWithoutFeedback onPress={() =>this.showNameChangeModal() }>
                  <Icon name="pencil" style={{...styles.miniIcons2  }} />
                </TouchableWithoutFeedback>
              </View>

            </View> 
            <View style={styles.profileInfoRow}>
              <View style={styles.profileInfoColumn1}>
                <Icon name="email" style={styles.miniIcons} />
              </View> 
              <View style={styles.profileInfoColumn2}>
                <Text style={styles.infoTitleText}>Email</Text>
                <Text style={styles.infoSubTitleText}>
                  {this.state.user.email}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Modal
        transparent={true}
        visible={this.state.showModal}
        animationType="fade">

        <TouchableOpacity
          onPress={() => {
            this.handleClick();
          }}>
          <View style={styles.modal}>
            <View style={styles.ModalBackgraound}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Enter new name here</Text>
                <TextInput
                  style={styles.inputBox}
                  onChangeText={(text) => this.onChangeText(text)}
                  value={this.state.text}
                />

                <View style={styles.buttons}>
                  <GreenButtonNoShadow
                    title="Set"
                    onPress={() => {
                      this.handleOnChangeName(this.state.text);
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>


        <GreenButtonNoPadding
          title="Logout"
          onPress={() => {
            this.handleLogOut()
          }}
        />
        <RedButton
          title="Delete acount"
          onPress={() => {
            this.handleDelete();
          }}
        />
      </View>
    );
  }
}

export default withNavigation(ProfileScreen);
