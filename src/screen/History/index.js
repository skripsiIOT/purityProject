import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export default class History extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.text}>History Page</Text>
            </View>
        )
    }
}