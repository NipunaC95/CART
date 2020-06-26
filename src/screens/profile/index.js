import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';

const mapStateToProps = (state) => {
  return {
    //name: state.user.name,
    uid: state.user.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <TextInput />

        <Text> textInComponent </Text>
        <Text>UID : {this.props.uid}</Text>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
 