import React, { Component } from "react";
import { View, Image, Text, SafeAreaView, TouchableOpacity, TextInput, Alert } from "react-native";
import styles from "./styles";
import imageConfirm from '../../../assets/image/confirm.png';
import { doc, setDoc } from 'firebase/firestore';
import { db } from "../../../database/app";
import { setDeviceID, setUID } from "../../storage";

export default class Confirm extends Component {
    constructor(props) {
      super(props);
      this.state = this.getInitialState();
    }

    getInitialState = () => ({
        deviceID:'',
        isDeviceIDEmpty: false,
        confirmButton: false,
    });

    checkFormDeviceID = (deviceID) => {
        if(deviceID=='' || deviceID==null || deviceID==' '){
            this.setState({isDeviceIDEmpty: true, confirmButton:false});
        } else {
            this.setState({isDeviceIDEmpty: false, deviceID:deviceID, confirmButton: true});
        }
    };

    navigateToHomePage = () => {
        this.props.navigation.navigate('HomeTab');
    };

    createDeviceIDFirebase = () => {
        const token = this.props.route.params.uid;
        const collectionID = doc(db, "device", token);
        setDoc(collectionID, {
            deviceID: this.state.deviceID,
        })
        .then(() => {
            setUID(token);
            setDeviceID(this.state.deviceID);
            Alert.alert("Your device is successfully connected!","", [
                {
                    text: 'Continue',
                    onPress: () => this.navigateToHomePage(),
                }
            ]);
        })
        .catch((err) => {
            console.log(err);
        })
    };
  
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={imageConfirm}/>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>
                        Please input the deviceID that you get from the admin to pairing your cellphone to the device monitoring IoT. 
                    </Text>
                </View>
            {/* <View style={styles.checkBoxContainer}>
                <CheckBox
                    style={styles.checkBox}
                    tintColors={{ true: '#348EF4', false: 'black' }}
                    disabled={false}
                    value={this.state.toggleCheckBox}
                    onValueChange={(newValue) =>
                    this.setState({ toggleCheckBox: newValue })
                }
                />

                <Text style={styles.checkBoxText}>
                Verify whether the admin has successfully linked your email to the IoT device.
                </Text>
            </View> */}

                <View style={this.state.isDeviceIDEmpty ? styles.inputViewContainerError : [styles.inputViewContainer, styles.marginBottomInputValid]}>
                    <TextInput
                        style={styles.inputView}
                        placeholder='Device ID'
                        onChangeText={text => 
                            this.checkFormDeviceID(text)
                        }/>
                </View>
                <Text style={this.state.isDeviceIDEmpty ? styles.notValidInput : styles.validInput}>Device ID cannot be empty.</Text>

                <TouchableOpacity
                    style={[
                        styles.confirmBtn,
                        // Disable the button if toggleCheckBox is false
                        { opacity: this.state.confirmButton ? 1 : 0.5 },
                    ]}
                    onPress={() => this.createDeviceIDFirebase()}
                    disabled={!this.state.confirmButton}
                    >
                    <Text style={styles.confirmText}>Confirm</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
     }
  }