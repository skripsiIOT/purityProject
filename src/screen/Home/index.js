import React, { Component } from "react";
import { View, Text, SafeAreaView, ScrollView, Pressable, onPress, TouchableOpacity } from "react-native";
import styles from "./styles";
import { getDocs, collection, orderBy, limit, QuerySnapshot } from 'firebase/firestore';
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
            this.setState({ token: 'omTmbAHDyXXl3li8HdEvgXARNJA3' });
            this.getHistoryFirestoreCollection();
        } else {
            navigation.replace('Login');
        }
    }

    getHistoryFirestoreCollection = () => {
        const collectionId = collection(db, this.state.token);
        const query = getDocs(collectionId);
        const dataCount = []
    
        query.then((querySnapshot) => {
            querySnapshot.forEach((element) => {
                const { C, PH, cm, ntu, ppm } = element.data();
                dataCount.push({
                    key: element.id,
                    C,
                    PH,
                    cm,
                    ntu,
                    ppm
                });
                this.setState({
                    isLoading: false,
                    data: dataCount
                })
            });

            console.log(dataCount.length)

            if (!querySnapshot.empty) {
                const latestDocument = querySnapshot.docs[dataCount.length - 1].data();
    
                const { C, PH, cm, ntu, ppm } = latestDocument;

                this.setState({
                    isLoading: false,
                    data: [{
                        key: querySnapshot.docs[0].id,
                        C,
                        PH,
                        cm,
                        ntu,
                        ppm
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
                    <TouchableOpacity style={styles.button} onPress = {() => this.getHistoryFirestoreCollection()}>
                        <Text style={styles.text}>Sync Data</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                <View style={styles.containerParams}>
                        <Text style={styles.paramsTitle}>Water Level</Text>
                        <Text style={styles.paramsValue}>{isLoading ? "Loading..." : (data.length > 0 ? data[0].cm.toFixed(2): "N/A") + " cm"}</Text>
                    </View>
                    <View style={styles.containerParams}>
                        <Text style={styles.paramsTitle}>Water Temperature</Text>
                        <Text style={styles.paramsValue}>{isLoading ? "Loading..." : (data.length > 0 ? data[0].C.toFixed(1) : "N/A") + "°C"}</Text>
                    </View>
                    <View style={styles.containerParams}>
                        <Text style={styles.paramsTitle}>Total Dissolved Solids</Text>
                        <Text style={styles.paramsValue}>{isLoading ? "Loading..." : (data.length > 0 ? data[0].ppm.toFixed(2) : "N/A") + " ppm"}</Text>
                    </View>
                    <View style={styles.containerParams}>
                        <Text style={styles.paramsTitle}>pH Level</Text>
                        <Text style={styles.paramsValue}>{isLoading ? "Loading..." : (data.length > 0 ? data[0].PH.toFixed(2): "N/A")}</Text>
                    </View>
                    <View style={styles.containerParams}>
                        <Text style={styles.paramsTitle}>Turbidity</Text>
                        <Text style={styles.paramsValue}>{isLoading ? "Loading..." : (data.length > 0 ? data[0].ntu.toFixed(2) : "N/A") + " NTU"}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}