import React, { Component } from 'react'

import styles from './styles.js'
import { View, Image, SafeAreaView, Animated, Text, ImageBackground, StatusBar } from 'react-native'

import logoPurity from '../../../assets/image/purity_logo.jpg'
import backgroundLogo from '../../../assets/image/splash_background.jpg'

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    anim              : new Animated.Value(0),
    progressStatus    : 0,
  })

  resetState = () => {
    this.setState(this.getInitialState());
  }

  componentDidMount() {
    this.onAnimate();
  }

  componentDidUpdate(){
    if (this.state.progressStatus == 100){
        this.navigateToNextPage();
    }
  }
 
  componentWillUnmount = () => {
    this.state.anim.removeAllListeners();
    this.onAnimateStop();
    this.resetState();
  }

  navigateToNextPage = () => {
    const { navigation } = this.props;
    navigation.replace('Login');
  }

  onAnimate = () => {
    const anim_state = this.state.anim;

    anim_state.addListener(({value})=> {  
      this.setState({ progressStatus: parseInt(value,10) });  
    });  
    Animated.timing(anim_state, {  
          toValue         : 100,  
          duration        : 2000, 
          useNativeDriver : true
    }).start();  
  }

  onAnimateStop = () => {  
    Animated.timing(this.state.anim).stop();  
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>

        <StatusBar translucent backgroundColor='#348EF4'/>

        <ImageBackground source={backgroundLogo} resizeMode='cover' style={styles.imageBackground}>
            <Image source={logoPurity} style={styles.image}/>
        </ImageBackground>

        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>Clean Water, Clean Future</Text>
        </View>

        <Animated.View
            style={[  
                styles.progressbar,{width: this.state.progressStatus +"%"},  
            ]}
        />      
      </SafeAreaView>
    )
  }

}