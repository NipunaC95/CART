import {StyleSheet} from 'react-native'; 
import { DARKGREEN , LIGHTGREEN } from '../../styles/colors';
 

export default StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: '5%',
    zIndex: 0,
    elevation: 1,
  },

  miniIcons: {
    fontSize: 40,
    alignItems: 'center',
    alignContent: 'center',
    padding: 6,
  },

  profileInfo: {
    alignItems: 'baseline',
    width: '90%',
  },

  profileInfoRow: {
    width: '100%',
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    fontSize: 20,
    marginTop: 10,
  },

  profileInfoColumn2: {
    padding:8,
    paddingTop: 0,
  },
  infoTitleText: {
    fontSize: 20,
    position: 'relative',
  },
  infoSubTitleText: {
    fontSize: 17,
    position: 'relative',
  },

  profileInfoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

  miniIcons2: {
    fontSize: 27,
  },

  profileInfoColumn3: {
    alignItems: 'center',
    alignContent: 'center',
    padding: 10,
    position: 'absolute',
    top:'-10%',
    left: '70%',
  },
  ModalBackgraound: {
    backgroundColor: '#000000aa',
    paddingTop: 40,
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
  modalContent: { 
    position: 'relative',
    top: '50%',
    width: '100%',
    flex: 1,
    borderRadius: 20,
  },
  modalText: {
    fontSize: 20,
    color: 'white',
    margin: 20,
  },

  inputBox: {
    height: 40,
    borderColor: LIGHTGREEN,
    borderBottomWidth: 1,
    margin: 20,
    color: 'white',
  },
  buttons: {},
}); 
