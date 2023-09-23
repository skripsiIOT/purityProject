import React, { Component } from 'react'
import { SafeAreaView, View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './styles.js';
import app from '../../../database/app.js'

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
        if(this.state.username != '' && this.state.password) {
            const dataAPI = {
                username : this.state.username,
                password : this.state.password,
            }

            app
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                console.log(res)
                console.log('User logged-in successfully!')
            })
        } else {
            Alert.alert("Enter data to sign in!");
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Login</Text>
                </View>

                <View style={styles.inputViewContainer}>
                    <TextInput
                        style={styles.inputView}
                        placeholder='Username'
                        keyboardType='email-address'
                        onChangeText={text => this.checkForm(text, 'username')}/>
                </View>

                <View style={styles.inputViewContainer}>
                    <TextInput
                        style={styles.inputView}
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={text => this.checkForm(text, 'password')}/>
                </View>

                <TouchableOpacity style = {styles.loginBtn} 
                // onPress = {() => this.loginProcess()}
                >
                    <Text style = {styles.loginText}>Sign In</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}