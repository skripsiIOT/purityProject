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

    registerProcess = () => {
        const { navigation } = this.props;

        createUserWithEmailAndPassword(authApp, this.state.username, this.state.password)
            .then(() => {
                console.log('User account created & signed in!');
                navigation.replace('Login');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }

    render() {
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

                <TouchableOpacity style = {styles.loginBtn} 
                onPress = {() => this.registerProcess()}
                >
                    <Text style = {styles.loginText}>Sign In</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}