import React, {useLayoutEffect, useState, useContext, useEffect} from 'react';
import {Alert, SafeAreaView, View, Text} from 'react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {color, globalStyle} from '../../utility';
import LogOutUser from '../../network/logout';
import {clearAsyncStorage} from '../../asyncStorarge';
import {Store} from '../../context/store';
import firebase from '../../firebase/config';
import {Profile, ShowUsers, StickyHeader} from '../../components';
import {LOADING_START, LOADING_STOP} from '../../context/action/types';
import {FlatList} from 'react-native-gesture-handler';
import {uuid, smallDeviceHeight} from '../../utility/constants';
import ImagePicker from 'react-native-image-picker';
import {UpdateUser} from '../../network';
import {deviceHeight} from '../../utility/styleHelper/appStyle';

const FavaouritesScreen = ({navigation}) => {
  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;

  const [userDetail, setUserDetail] = useState({
    id: '',
    name: '',
    profileImg: '',
  });

  const {name, profileImage} = userDetail;

  const [allUsers, setAllUsers] = useState([]);

  const [getScrollPosition, setScrollposition] = useState(0);

  useEffect(() => {
    dispatchLoaderAction({
      type: LOADING_START,
    });
    try {
      firebase
        .database()
        .ref('users')
        .on('value', (dataSnapshot) => {
          let users = [];
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
            } else {
              users.push({
                id: child.val().uuid,
                name: child.val().name,
                profileImg: child.val().profileImage,
              });
            }
          });
          setUserDetail(currentUser);
          setAllUsers(users);
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

  const nameTap = (profileImg, name, guestUserId) => {
    if (!profileImage) {
      navigation.navigate('chat', {
        name,
        imageText: name.charAt(0),
        guestUserId,
        currentUserId: uuid,
      });
    } else {
      navigation.navigate('chat', {
        name,
        img: profileImage,
        guestUserId,
        currentUserId: uuid,
      });
    }
  };

  return (
    <SafeAreaView style={[globalStyle.flex1, {backgroundColor: color.BLACK}]}>
      <FlatList
        alwaysBounceVertical="false"
        data={allUsers}
        keyExtractor={(_, index) => index.toString()}
        onScroll={(event) =>
          setScrollposition(event.nativeEvent.contentOffset.y)
        }
        renderItem={({item}) => (
          <View style={{backgroundColor: 'white'}}>
            <ShowUsers
              name={item.name}
              img={item.profileImg}
              onImgTap={() => imgTap(item.profileImage, item.name)}
              onNameTap={() => nameTap(item.profileImage, item.name, item.id)}
              onLongPress={()=>{alert(item.name)}}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};
export default FavaouritesScreen;
