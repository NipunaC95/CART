import React, {Component} from 'react';
import {View, Text, Animated, StyleSheet , Image} from 'react-native';
import {SimpleAnimation} from 'react-native-simple-animations';
import {getData} from '../../store';
const logo = require('../../assets/logo/logo.png');
import { withNavigation } from 'react-navigation';
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(async () => {
      const user = await getData();
      if (user==null) {
        this.props.navigation.navigate('login');
      }else{ 
        this.props.navigation.navigate('secondryNavigator');
      }
    }, 3000);
  }

  render() {
    return (
      <View style={styles.containerCentered}>
        <SimpleAnimation
          delay={100}
          duration={500}
          aim="in"
          fade="true"
          distance={100}
          movementType="slide"
          staticType="zoom"
          direction="up">
          <Image style={styles.logoStyle} source={logo} />
        </SimpleAnimation>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerCentered: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default withNavigation(index);
