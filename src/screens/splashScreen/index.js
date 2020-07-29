import React, {Component} from 'react';
import {View, TouchableWithoutFeedback , Text, StyleSheet , Image} from 'react-native';
import {SimpleAnimation} from 'react-native-simple-animations';
import {getData} from '../../store';
const logo = require('../../assets/logo/logo.png');
import { withNavigation } from 'react-navigation';
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:[]
    };
  }

  componentDidMount() {
    setTimeout(async () => {
      const user = await getData();
      this.setState({user})
      if (user==null) {
        this.props.navigation.navigate('login');
      }else{ 
        this.props.navigation.navigate('secondryNavigator');
      }
    }, 3000);
  }

  async navigateToCorrectScreen(){ 
    console.log('Clicked') 
      if (this.state.user==null) {
        this.props.navigation.navigate('login');
      }else{ 
        this.props.navigation.navigate('secondryNavigator');
      }
  }

  

  render() {

     
    return (
      <TouchableWithoutFeedback style={styles.test} onPress={()=>{this.navigateToCorrectScreen()}}> 
      <View style={styles.containerCentered}>
        <Text style={{fontSize:20}}>17001196 J.A.N.C.Niroshana</Text>
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
        </ TouchableWithoutFeedback >
    );
  }
}

const styles = StyleSheet.create({
  containerCentered: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },logoStyle:{
    height:100,
    width:100
  },
test:{ 
  height:'100%'
}
});




export default withNavigation(index);
