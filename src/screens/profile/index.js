import React, {Component} from 'react';
import {Text, View, Modal, Image, Button , TouchableOpacity , TextInput} from 'react-native';
import {getData} from '../../store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileImageSection from './../../components/profileImageSection';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'; 
import styles from "./styles";

export class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        name: '',
      },
      showModal: false,
    };
  }

  async componentDidMount() {
    const user = await getData();
    this.setState({...this.state, user});
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

  
  handleClick = () => { 
    console.log('Clicked');
    this.setState({...this.state, showModal: false});
  };

  render() {
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
                  <Icon name="pencil" style={styles.miniIcons2} />
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
                  <Button
                    title="Hide"
                    onPress={() => {
                      this.handleClick();
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>


        <Button
          title="Logout"
          onPress={() => {
            alert('Delete account');
          }}
        />
        <Button
          title="Delete acount"
          onPress={() => {
            alert('Delete account');
          }}
        />
      </View>
    );
  }
}

export default ProfileScreen;
