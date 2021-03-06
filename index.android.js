/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Clipboard,
  Dimensions,
  KeyboardAvoidingView,
  ToastAndroid
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import nextFrame from 'next-frame';
import {
  Button, SocialIcon, Icon, FormLabel, FormInput
} from 'react-native-elements'

import generatePassword from './core/v2'

const options = {
    counter: 1,
    length: 16,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
    iterations: 100000
};    

export default class phone extends Component {

  constructor (props) {
    super(props)
    this.state = { 
          generatedPass: '',
          login: '',
          site: '',
          masterPass: '',
          generating: false
        }
  }

  componentDidMount() {
      // do anything while splash screen keeps, use await to wait for an async task.
      SplashScreen.hide()
  }

  render() {

    const onGenerateButtonPress = () => {                    
      
      if (this.state.login === '' || this.state.masterPassword === '' || this.state.site === '')
       return

      this.setState({ ...this.state, generating: true})

      nextFrame()
        .then(() => generatePassword(this.state.site, this.state.login, this.state.masterPassword, options))  
        .then(generatedPassword => {
            this.setState({ 
              generatedPass: generatedPassword,
              generating: false
            })  

            onCopyButtonPress()
        })
    }

    const onCopyButtonPress = () => {
      Clipboard.setString(this.state.generatedPass)
      ToastAndroid.show('Generated pass is copied to the clipboard', ToastAndroid.SHORT)
    }

    const shouldActivateGenerateButton = () => {
      if (this.state.login == '' || this.state.masterPassword == ''  || !this.state.site == '' ) {
        return false
      }

      return true
    }

    return (
      <View style={styles.container}>       
        <View style={styles.headerViewStyle}>
          <Icon name='vpn-key' size={40} iconStyle={styles.headerIconStyle}/>
          <Text style={{fontSize: 40, color: 'white'}}>LessPass</Text>
        </View>
        <KeyboardAvoidingView behaviour='padding' style={styles.avoidingViewStyle}> 
          <View style={styles.inputView} >          
            <FormInput
              inputStyle={styles.inputStyle}
              placeholder={'Site'}
              keyboardType={'url'}
              underlineColorAndroid = 'transparent'
              onChangeText={(value) => this.setState({...this.state, site: value})}
              value={this.state.site}
              />          
            <FormInput
              inputStyle={styles.inputStyle}
              placeholder={'Login'}
              autoCapitalize={'none'}
              autoCorrect ={false}
              underlineColorAndroid = 'transparent'
              onChangeText={(value) => this.setState({...this.state, login: value})}
              value={this.state.login}
              />          
            <FormInput
              containerStyle={styles.inputStyleContainer}
              inputStyle={styles.inputStyle}
              placeholder={'Master password'}
              autoCapitalize={'none'}
              autoCorrect = {false}
              secureTextEntry = {true}
              underlineColorAndroid = 'transparent'
              onChangeText={(value) => this.setState({...this.state, masterPassword: value})}
              value={this.state.masterPassword}
            />
        </View>
        <View style={styles.generatedPassView}>
            <FormInput
              containerStyle={styles.generatedPassContainer}
              inputStyle={styles.generatedPassInputStyle}
              placeholder={'Generated Pass'}
              editable={false}
              underlineColorAndroid = 'transparent'
              value={this.state.generatedPass}
              />           
              <Button
                onPress = {() => onCopyButtonPress()}
                icon={{ name: 'content-copy', color: 'grey' }}
                buttonStyle={styles.copyButtonStyle} />
        </View>
       </KeyboardAvoidingView>
       <View style={styles.generateButtonStyle}>
          <Button   
            onPress = {() => onGenerateButtonPress()}      
            icon={{ name: 'cached', color: 'grey'}}
            color='grey'
            backgroundColor='white'            
            borderRadius={7}
            fontSize = {55}            
            disabled={this.state.generating}
            title={this.state.generating ? 'In process....' : 'GENERATE'} />
          </View>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008ed6'    
  },
  headerViewStyle: {            
    flex: 1,      
    paddingTop: 25,
    paddingBottom: 10,
    flexDirection: 'row',    
    alignItems: 'center',
    justifyContent: 'center'    
  },
  headerIconStyle: {
    color: 'white',
    transform: [{rotate: '90deg'}]
  },
  labelStyle: {
    fontSize: 30,
  },
  inputView: {
    flex: 2,    
    flexDirection: 'column',
    justifyContent: 'space-around' 
  },
  inputStyle: { 
    paddingLeft: 10,       
    fontSize: 25,    
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,
    textDecorationLine: 'none',
    height: 50    
  },  
  inputStyleContainer: {    
    
  },
  generatedPassContainer: {
    flex: 8,
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent'
  },
  generatedPassInputStyle: {
    paddingLeft: 10,       
    fontSize: 25,    
    backgroundColor: '#eceeef',
    borderColor: '#eceeef',
    color: '#55595c',
    borderWidth: 1,
    borderRadius: 7,
    textDecorationLine: 'none',
    textDecorationColor: 'transparent',
    height: 50,     
    margin: 0
  },
  copyButtonStyle: {
    flex: 1,    
    height: 50,    
    borderRadius: 7,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 0,
    paddingLeft: 20    
  },
  generatedPassView: {
    flex: 1,  
    flexDirection: 'row',
    marginTop: 15       
  },
  generateButtonStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 25 
  },
  avoidingViewStyle: {
    flex: 2
  }
});

AppRegistry.registerComponent('phone', () => phone);
