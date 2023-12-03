import React, { Component } from 'react'
import { SafeAreaView, View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './styles.js';
import { authApp } from '../../../database/app.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setUID } from '../../storage/index.js';

export default class Login extends Component {
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
        }else if (text == '' && type == 'password'){
            this.setState({ isPasswordEmpty : true });
        }
    };

    loginProcess = () => {
        const { navigation } = this.props;
        
        if(this.state.username != '' && this.state.password !='' ) {
            const dataAPI = {
                username : this.state.username,
                password : this.state.password,
            }

            signInWithEmailAndPassword(authApp, dataAPI.username, dataAPI.password)
            .then((res) => {
                if(res != undefined) {
                    //    Alert.alert("Successfully sign in app!");
                    setUID(res._tokenResponse.uid)
                    navigation.replace('Login');
                }
            })
            .catch((err) => {
                Alert.alert("The email address or password is incorrect.")
            })
        } 
        else {
            this.setState({isUsernameEmpty : true,isPasswordEmpty: true});
            Alert.alert("Enter data to sign in!");
        }
        // if(this.state.username != '' && this.state.password !='' ) {
        //     navigation.replace('HomeTab');
        // }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Login</Text>
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
                onPress = {() => this.loginProcess()}
                >
                    <Text style = {styles.loginText}>Sign In</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}