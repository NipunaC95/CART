import AsyncStorage from '@react-native-community/async-storage';

const setData = async (data) => {
  try {
    if (data !== null) {
      const stringData = JSON.stringify(data);
      //console.log('saving string : ', stringData)
      await AsyncStorage.setItem('user', stringData);
    }
  } catch (error) {
    console.log('Error occured while writing data to the store ' + error);
  }
};

const getData = async () => {
  try {
    const stringData = await AsyncStorage.getItem('user');
    // console.log('retrieving string :' , stringData)
    const objectData = JSON.parse(stringData);
   // console.log('retrieving object :' , objectData)

    if (objectData !== null) {
      return objectData;
    }
  } catch (error) {
    console.log('Error occured while retrieving data from store ' + error);
  }
};

const clearAppData = async function () {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error('Error clearing app data.');
  }
};
export {setData, getData, clearAppData};
