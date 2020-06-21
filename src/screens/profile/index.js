import React, {useLayoutEffect, useState, useContext, useEffect} from 'react';
import {Alert, SafeAreaView, View} from 'react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {globalStyle} from '../../utility';
import {Store} from '../../context/store';
import firebase from '../../firebase/config';
import {Profile, StickyHeader} from '../../components';
import {LOADING_START, LOADING_STOP} from '../../context/action/types';
import {uuid, smallDeviceHeight} from '../../utility/constants';
import ImagePicker from 'react-native-image-picker';
import {UpdateUser} from '../../network';
import {deviceHeight} from '../../utility/styleHelper/appStyle';

const ProfileScreen = ({navigation}) => {
  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;

  const [userDetail, setUserDetail] = useState({
    id: '',
    name: '',
    profileImg: '',
  });

  const {name, profileImage} = userDetail;
  const [getScrollPosition, setScrollposition] = useState(0);

  useEffect(() => {
    dispatchLoaderAction({
      type: LOADING_START,
    });
    try {
      firebase
        .database()
        .ref('users')
        .once('value', (dataSnapshot) => {
          let currentUser = {
            id: '',
            name: '',
            img: '',
          };
          dataSnapshot.forEach((child) => {
            if (uuid === child.val().uuid) {
              currentUser.id = uuid;
              currentUser.name = child.val().name;
              currentUser.profileImage = child.val().profileImage;
            }
          });
          setUserDetail(currentUser);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
    } catch (error) {
      alert(error);
      dispatchLoaderAction({
        type: LOADING_STOP,
      });
    }
  }, []);

  const selectPhotoTapped = () => {
    const option = {
      storageOption: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(option, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image upload');
      } else if (response.error) {
        console.log('Error in image upload ');
      } else {
        //Base 64  image
        let source = 'data:image/jpeg;base64' + response.data;
        dispatchLoaderAction({
          type: LOADING_START,
        });
        UpdateUser(uuid, source)
          .then(() => {
            setUserDetail({...userDetail, profileImage: source});
          })
          .catch((error) => {
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
            alert(error);
          });
      }
    });
  };

  const imgTap = (profileImage, name) => {
    if (!profileImage) {
      navigation.navigate('showFullImg', {
        name,
        imgText: name.charAt(0),
      });
    } else {
      navigation.navigate('showFullImg', {
        name,
        img: profileImage,
      });
    }
  };

  const getOpacity = () => {
    if (deviceHeight < smallDeviceHeight) {
      return deviceHeight / 4;
    } else {
      return deviceHeight / 6;
    }
  };

  return (
    <SafeAreaView style={[globalStyle.flex1, {marginTop: 50}]}>
      {getScrollPosition > getOpacity() && (
        <StickyHeader
          name={name}
          img={profileImage}
          onImgTap={() => imgTap(profileImage, name)}
        />
      )}
      <View
        style={{
          opacity:
            getScrollPosition < getOpacity()
              ? (getOpacity() - getScrollPosition) / 100
              : 0,
        }}>
        <Profile
          img={profileImage}
          name={name}
          onEditImgTap={() => selectPhotoTapped()}
          onImgTap={() => imgTap(profileImage, name)}
        />
      </View>
    </SafeAreaView>
  );
};
export default ProfileScreen;
