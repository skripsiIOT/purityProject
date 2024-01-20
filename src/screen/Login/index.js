import React, { Component } from 'react'
import { SafeAreaView, View, TextInput, Text, TouchableOpacity, Alert, StatusBar } from 'react-native';
import styles from './styles.js';
import { authApp, db } from '../../../database/app.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setDeviceID, setUID } from '../../storage/index.js';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';

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
        } else if (text == '' && type == 'password'){
            this.setState({ isPasswordEmpty : true });
        }
    };

    loginProcess = () => {
        if(this.state.username != '' && this.state.password !='' ) {
            const dataAPI = {
                username : this.state.username,
                password : this.state.password,
            }

            signInWithEmailAndPassword(authApp, dataAPI.username, dataAPI.password)
            .then((res) => {
                if(res != undefined) {
                    this.getDeviceIDUser(res.user.uid);
                    // setUID(res.user.uid)
                    // navigation.replace('HomeTab');
                }
            })
            .catch((err) => {
                console.log(err)
                Alert.alert("Account not found.")
            })
        } 
        else {
            this.setState({isUsernameEmpty : true,isPasswordEmpty: true});
            Alert.alert("Email and/or Password is Empty.");
        }
    }

    getDeviceIDUser = (uid) => {
        const collectionID = doc(db, 'device', uid);
        const documentID = getDoc(collectionID);

        documentID.then((res)=>{
            const data = res.data();
            setDeviceID(data.deviceID);
        }).then(() => {
            this.navigationHomeTab(uid);
        })
    }

    navigationHomeTab = (uid) => {
        const { navigation } = this.props;
        setUID(uid)
        navigation.replace('HomeTab');
    }

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>

                <StatusBar translucent backgroundColor='#FFFFFF' barStyle={'dark-content'}/>

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

                <TouchableOpacity style = {styles.registerBtn} 
                onPress = {() => navigation.replace('Register')}
                >
                    <Text style = {styles.registerText}>Create an Account</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}