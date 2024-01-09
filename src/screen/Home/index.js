import React, { Component } from "react";
import { View, Text, SafeAreaView, ScrollView, Pressable, onPress } from "react-native";
import styles from "./styles";

export default class Home extends Component {
    render() {
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.containerScore}>
                    <Text style={styles.scoreValue}>100</Text>
                    <View style={styles.subContainerScore}>
                        <Text style={styles.scoreTitle}>Water Quality Score</Text>
                        <Text style={styles.scoreGrade}>Excellent</Text>
                    </View>
                </View>
                <View style={styles.containerSection}>
                    <View>
                    <Text style={styles.sectionTitle}>Sensor Insights</Text>
                    <Text style={styles.sectionSubtitle}>Last sync’d: 10 minutes ago</Text>
                    </View>
                    <Pressable style={styles.button} onPress={onPress}>
                        <Text style={styles.text}>Save</Text>
                    </Pressable>
                </View>
                <ScrollView>
                    <View style={styles.containerParams}>
                        <Text style={styles.paramsTitle}>Water Quality</Text>
                        <Text style={styles.paramsValue}>100</Text>
                    </View>
                    <View style={styles.containerParams}>
                        <Text style={styles.paramsTitle}>Water Temperature</Text>
                        <Text style={styles.paramsValue}>100</Text>
                    </View>
                    <View style={styles.containerParams}>
                        <Text style={styles.paramsTitle}>Total Dissolved Solids</Text>
                        <Text style={styles.paramsValue}>100</Text>
                    </View>
                    <View style={styles.containerParams}>
                        <Text style={styles.paramsTitle}>Turbidity</Text>
                        <Text style={styles.paramsValue}>100</Text>
                    </View>
                    <View style={styles.containerParams}>
                        <Text style={styles.paramsTitle}>pH Level</Text>
                        <Text style={styles.paramsValue}>100</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}