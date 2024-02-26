import React, { Component, useState } from 'react'
import { SafeAreaView, View, TextInput, Text, TouchableOpacity, Alert, StatusBar } from 'react-native';
import styles from './styles.js';
import { authApp } from '../../../database/app.js';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        username: "",
        isUsernameEmpty: false,
        isNotmatchUsername : false,
        password: "",
        isPasswordEmpty: false,
    });

    // checkForm = (text , type) => {
    //     //set state username and password
    //     if(type == 'username'){
    //         this.setState({username:text});
    //     }else if (type == 'password'){
    //         this.setState({password:text});
    //     }

    //     //set logic for border color form
    //     this.setState({ isUsernameEmpty : false , isPasswordEmpty : false });
    //     if (text == '' && text==null && text==' ' && type == 'username'){
    //         this.setState({ isUsernameEmpty : true });
    //     } else if (text == '' && text==null && text==' ' && type == 'password'){
    //         this.setState({ isPasswordEmpty : true });
    //     }
    // };

    checkFormUsername = (username) => {
        const regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if(username== '' || username==null || username==' '){
            this.setState({isUsernameEmpty: true, isNotmatchUsername: false, username: ""});
        } else {
            username.match(regex) == null ? this.setState({isUsernameEmpty: false, isNotmatchUsername:true, username: username}) : this.setState({isUsernameEmpty: false, isNotmatchUsername:false, username:username});
        }
    }

    checkFormPassword = (password) => {
        this.setState({isPasswordEmpty:true, password: ""});

        if(password== '' || password==null || password==' '){
            this.setState({isPasswordEmpty: true, password: ""});
        } else {
            password.length < 6 ? this.setState({isPasswordEmpty:true, password:password}) : this.setState({isPasswordEmpty:false, password:password});
        }
    }

    navigateConfirm = (res) => {
        this.props.navigation.navigate('Confirm', {
            uid: res.user.uid,
        });
    }
    // navigateConfirm2 = (res) => {
    //     this.props.navigation.navigate('Confirm', {
    //         uid: "1234",
    //     });
    // }

    registerProcess = () => {
        const { navigation } = this.props;

        createUserWithEmailAndPassword(authApp, this.state.username, this.state.password)
            .then((res) => {
                console.log('User account created & signed in!');
                if(res.user.uid != "" && res.user.uid != null) {
                    Alert.alert("Yeay, your account has already registered.", "Click continue to get the next step!", [
                        {
                            text: 'Continue',
                            onPress: () => this.navigateConfirm(res),
                        }
                    ])
                }
            })
            .catch(error => {
                if (error.code === 'auth/missing-email') {
                    Alert.alert("Please fill the username!")
                }
                if (error.code === 'auth/missing-password') {
                    Alert.alert("Please fill the password!")
                }
                if (error.code === 'auth/invalid-email') {
                    Alert.alert("That email address is invalid!")
                }
                if (error.code === 'auth/weak-password') {
                    Alert.alert("Password should be at least 6 characters!")
                }
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert("That email address is already in use!")
                }

                console.error(error);
            });
    }

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>

                <StatusBar translucent backgroundColor='#FFFFFF' barStyle={'dark-content'}/>

                <View style={styles.title}>
                    <Text style={styles.titleText}>Register</Text>
                </View>

                <View style={this.state.isUsernameEmpty || this.state.isNotmatchUsername ? styles.inputViewContainerError : [styles.inputViewContainer, styles.marginBottomInputValid]}>
                    <TextInput
                        style={styles.inputView}
                        placeholder='email@example.com'
                        keyboardType='email-address'
                        onChangeText={text => 
                            this.checkFormUsername(text)
                        }/>
                </View>
                <Text style={this.state.isUsernameEmpty && !this.state.isNotmatchUsername ? styles.notValidInput : styles.validInput}>Username cannot be empty.</Text>
                <Text style={!this.state.isUsernameEmpty && this.state.isNotmatchUsername ? styles.notValidInput : styles.validInput}>Not valid email address. ex:purityproject@gmail.com</Text>

                <View style={this.state.isPasswordEmpty ? styles.inputViewContainerError : [styles.inputViewContainer, styles.marginBottomInputValid]}>
                    <TextInput
                        style={styles.inputView}
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={text => 
                            this.checkFormPassword(text)
                        }/>
                </View>
                <Text style={this.state.isPasswordEmpty ? styles.notValidInput : styles.validInput}>Password must have more than 6 characters.</Text>

                <TouchableOpacity style = {styles.registerBtn} onPress = {() => 
                    this.registerProcess()
                    // this.navigateConfirm2()
                }>
                    <Text style = {styles.registerText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.loginBtn} onPress = {() => navigation.replace('Login')}>
                    <Text style = {styles.loginText}>Login Instead</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}