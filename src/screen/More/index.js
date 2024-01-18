import React, { Component } from "react";
import styles from "./style";
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { removeData } from "../../storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class More extends Component {
    constructor(props) {
        super(props);
    }

    navigateTipsNTrick = () => {
        const context = this.state;
        this.props.navigation.navigate('TipsNTrick')
    }

    logOut = async() => {
        const token = await AsyncStorage.getItem('uid');
        if(token != null) {
            removeData('uid') ? 
            this.props.navigation.navigate('Login')
            : ""; 
        }
    }

    confirmLogOut = () => {
        Alert.alert('Are You Sure To Log Out?','', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => this.logOut()},
        ]);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={() => this.navigateTipsNTrick()}>
                    <View style={[styles.row, styles.containerMenu]}>
                        <MaterialIcon name="star" style={{fontSize: 30, color: '#348EF4'}}/>
                        <Text style={styles.titleMenu}>Insight</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.confirmLogOut()}>
                    <View style={[styles.row, styles.containerMenu]}>
                        <MaterialIcon name="logout" style={{fontSize: 30, color: '#348EF4'}}/>
                        <Text style={styles.titleMenu}>Log Out</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}