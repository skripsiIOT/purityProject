import React, { Component, useState } from 'react'
import { SafeAreaView, View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
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
        password: "",
        isPasswordEmpty: false,
    });

    checkForm = (text , type) => {
        //set state username and password
        if(type == 'username'){
            this.setState({username:text});
        }else if (type == 'password'){
            this.setState({password:text});
        }

        //set logic for border color form
        this.setState({ isUsernameEmpty : false , isPasswordEmpty : false });
        if (text == '' && type == 'username'){
            this.setState({ isUsernameEmpty : true });
        } else if (text == '' && type == 'password'){
            this.setState({ isPasswordEmpty : true });
        }
    };

    navigateConfirm = (res) => {
        this.props.navigation.navigate('Confirm', {
            uid: res.user.uid,
        });
    }

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
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert("That email address is already in use!")
                }

                if (error.code === 'auth/invalid-email') {
                    Alert.alert("That email address is invalid!")
                }

                if (error.code === 'auth/missing-password') {
                    Alert.alert("Please fill the password!")
                }

                if (error.code === 'auth/missing-email') {
                    Alert.alert("Please fill the username!")
                }

                if (error.code === 'auth/weak-password') {
                    Alert.alert("Password should be at least 6 characters!")
                }

                console.error(error);
            });
    }

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Register</Text>
                </View>

                <View style={this.state.isUsernameEmpty ? styles.inputViewContainerError : styles.inputViewContainer}>
                    <TextInput
                        style={styles.inputView}
                        placeholder='Username'
                        keyboardType='email-address'
                        onChangeText={text => this.checkForm(text, 'username')}/>
                </View>

                <View style={this.state.isPasswordEmpty ? styles.inputViewContainerError : styles.inputViewContainer}>
                    <TextInput
                        style={styles.inputView}
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={text => this.checkForm(text, 'password')}/>
                </View>

                <TouchableOpacity style = {styles.registerBtn} 
                onPress = {() => this.registerProcess()}
                >
                    <Text style = {styles.registerText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.loginBtn} 
                onPress = {() => navigation.replace('Login')}
                >
                    <Text style = {styles.loginText}>Login Instead</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}