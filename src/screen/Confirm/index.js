import React, { Component, useState } from "react";
import { View, Image, Text, SafeAreaView, ScrollView, Pressable, onPress, TouchableOpacity } from "react-native";
import styles from "./styles";
import CheckBox from "@react-native-community/checkbox";
import imageConfirm from '../../../assets/image/confirm.png'

export default class Confirm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        toggleCheckBox: false,
      };
    }
  
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={imageConfirm}>

                    </Image>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>
                    To access the value parameter of the IoT sensor, please reach out to the administrator in your vicinity to configure your IoT device using the email you previously registered.
                    </Text>
                </View>
            <View style={styles.checkBoxContainer}>
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
            </View>

                <TouchableOpacity
                    style={[
                        styles.confirmBtn,
                        // Disable the button if toggleCheckBox is false
                        { opacity: this.state.toggleCheckBox ? 1 : 0.5 },
                    ]}
                    onPress={() => this.state.toggleCheckBox && navigation.replace('Login')}
                    disabled={!this.state.toggleCheckBox}
                    >
                    <Text style={styles.confirmText}>Confirm</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
     }
  }