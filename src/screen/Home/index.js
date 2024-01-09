import React, { Component } from "react";
import { View, Text, SafeAreaView, ScrollView, Pressable, onPress } from "react-native";
import styles from "./styles";
import { getDocs, collection, orderBy, limit } from 'firebase/firestore';
import { db } from "../../../database/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Icon from 'react-native-vector-icons/FontAwesome';
import { element } from "prop-types";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        this.getLocalDataStorage();
    }

    getInitialState = () => ({
        latestData: null,
        isLoading: true,
        token: ''
    })

    getLocalDataStorage = async () => {
        const token = await AsyncStorage.getItem('uid');

        if (token != null) {
            this.setState({ token: token });
            this.getHistoryFirestoreCollection();
        } else {
            navigation.replace('Login');
        }
    }

    getHistoryFirestoreCollection = () => {
        const collectionId = collection(db, this.state.token);
        const query = getDocs(collectionId);
    
        query.then((querySnapshot) => {
            if (!querySnapshot.empty) {
                const latestDocument = querySnapshot.docs[0].data();
    
                const { tdsValue, ntu, distanceValue } = latestDocument;

                this.setState({
                    isLoading: false,
                    data: [{
                        key: querySnapshot.docs[0].id,
                        tdsValue,
                        distanceValue,
                        ntu
                    }]
                });
            } else {
                this.setState({
                    isLoading: false,
                    data: []
                });
            }
        });
    }

    render() {
        const { data, isLoading } = this.state;
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
                        <Text style={styles.paramsTitle}>TDS Value</Text>
                        <Text style={styles.paramsValue}>{isLoading ? "Loading..." : (data.length > 0 ? data[0].tdsValue : "N/A")}</Text>
                    </View>
                    <View style={styles.containerParams}>
                        <Text style={styles.paramsTitle}>Distance Value</Text>
                        <Text style={styles.paramsValue}>{isLoading ? "Loading..." : (data.length > 0 ? data[0].distanceValue : "N/A")}</Text>
                    </View>
                    <View style={styles.containerParams}>
                        <Text style={styles.paramsTitle}>NTU</Text>
                        <Text style={styles.paramsValue}>{isLoading ? "Loading..." : (data.length > 0 ? data[0].ntu : "N/A")}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}