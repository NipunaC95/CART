import {StyleSheet} from 'react-native';
import {DARKGREEN} from '../../styles/colors';
const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    marginTop: 20,
    alignItems: 'center',
  },

  image: {
    height: 200,
    width: 200,
    borderRadius: 115,
    resizeMode: 'cover',
  },
  editIconContainer: {
    alignContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: DARKGREEN,
    position: 'absolute',
    borderRadius: 25,
    left: 210,
    top: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    color: 'white',
    fontSize: 30,
  },
  editButton: {
    backgroundColor: 'green',
    opacity: 0.1,
  },
});

export default styles;
