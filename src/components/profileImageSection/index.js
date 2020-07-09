import React, {Component} from 'react';
import {View,   Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import {updateImage} from './../../network/userProfile';
import {getData, setData} from './../../store';
import styles from "./styles";


class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      uid: '',
      uri: 'https://i.pravatar.cc/150?u=fake@pravatar.com',
    };
  }

  handleClick = () => {
    ImagePicker.showImagePicker(
      {title: 'Pick an image', maxHeight: 600, maxWidth: 600},
      (response) => {
        const data = this.state;
        this.setState({
          ...data,
          uri: response.uri,
        }); 
        //upload image and update document
        updateImage(this.state.uid, response.uri); 
      },
    );
  };

  async componentDidMount() {
    console.log(JSON.stringify(await getData(), null, 2));
    const userData = await getData();

    this.setState({
      uri: userData.downloadURL,
      uid: userData.uid,
      user: userData,
    });
  }

  render() {
    return (
      <View style={styles.imageContainer}>
        <Image source={{uri: this.state.uri}} style={styles.image} />
        <View style={styles.editIconContainer}>
          <TouchableWithoutFeedback
            style={styles.editButon}
            onPress={() => this.handleClick()}>
            <Icon name="camera" style={styles.editIcon} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

export default index;
