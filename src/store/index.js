import AsyncStorage from '@react-native-community/async-storage';

const setData = async (data) => {
  try {
    if (data !== null) {
      const stringData = JSON.stringify(data);
      console.log('saving string : ', stringData)
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
    //console.log('retrieving object :' , objectData)

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

const setCustomData = async (Key, Value) => {
  try {
    if (Value !== null) {
      const stringData = JSON.stringify(Value);
      //console.log('saving string : ', stringData)
      await AsyncStorage.setItem(Key, stringData);
    }
  } catch (error) {
    console.log('Error occured while writing data to the store ' + error);
  }
};

const clearCustomData = async(key) =>{
 await AsyncStorage.removeItem(key)
}

const getCustomData = async (key) => {
 // console.log(`Get data of ${key}`)
  try {
    const stringData = await AsyncStorage.getItem(key);
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

export {setData, getData, setCustomData, getCustomData, clearCustomData , clearAppData };
