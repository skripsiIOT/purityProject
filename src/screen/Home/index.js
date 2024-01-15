import React, { Component } from "react";
import { View, Text, SafeAreaView, ScrollView, Pressable, onPress, TouchableOpacity } from "react-native";
import styles from "./styles";
import { getDocs, collection, orderBy, limit, QuerySnapshot } from 'firebase/firestore';
import { db } from "../../../database/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    getParamsPH = (paramsPH) => {
        if (paramsPH >= 6.5 && paramsPH <= 8.5) {
          return '#2FBF71'; // Safe
        } else if (paramsPH < 6.5 && paramsPH >= 6.0 || paramsPH > 8.5 && paramsPH <= 9) {
          return '#F4D35E'; // Warning
        } else {
          return '#D64933'; // Danger
        }
    };

    getParamsTDS = (paramsTDS) => {
        if (paramsTDS <= 500) {
            return '#2FBF71'; // Safe
        } else if (paramsTDS > 500 && paramsTDS <= 1000) {
            return '#F4D35E'; // Warning
        } else {
            return '#D64933'; // Danger
        }
    }

    getParamsTurbidity = (paramsTurbidity) => {
        if (paramsTurbidity <= 1) {
            return '#2FBF71'; // Safe
        } else if (paramsTurbidity > 1 && paramsTurbidity <= 5) {
            return '#F4D35E'; // Warning
        } else {
            return '#D64933'; // Danger
        }
    }

    getOverallScore = (paramsPH, paramsTDS, paramsTurbidity) => {
        let scalePH = ((paramsPH - 6.5) / (8.5 - 6.5)) * 100
        let scaleTDS = 100 - (paramsTDS/1000) * 100
        let scaleTurbidity = 100 - (paramsTurbidity/5) * 100

        if (scalePH < 0 ) {
            scalePH = 0
        } else if (scalePH > 100) {
            scalePH = 0
        }

        if (scaleTDS < 0 ) {
            scaleTDS = 0
        } else if (scaleTDS > 100) {
            scaleTDS = 0
        }

        if (scaleTurbidity < 0 ) {
            scaleTurbidity = 0
        } else if (scaleTurbidity > 100) {
            scaleTurbidity = 100
        }

        console.log(scalePH)
        console.log(scaleTDS)
        console.log(scaleTurbidity)

        return ((scalePH + scaleTDS + scaleTurbidity)/3).toFixed(0)
    }

    getOverallGrade = (overallScore) => {

        if (overallScore >= 0 && overallScore <= 20) {
            return 'Poor';
          } else if (overallScore > 20 && overallScore <= 40) {
            return 'Subpar';
          } else if (overallScore > 40 && overallScore <= 60) {
            return 'Average';
          } else if (overallScore > 60 && overallScore <= 80) {
            return 'Good';
          } else if (overallScore > 80 && overallScore <= 100) {
            return 'Excellent';
          } else {
            return 'Invalid Score'; // Handle scores outside the expected range
          }
    }

    getOverallColor = (overallScore) => {
        if (overallScore >= 0 && overallScore <= 20) {
            return '#D64933';
          } else if (overallScore > 20 && overallScore <= 40) {
            return '#F97316';
          } else if (overallScore > 40 && overallScore <= 60) {
            return '#F4D35E';
          } else if (overallScore > 60 && overallScore <= 80) {
            return '#2FBF71';
          } else if (overallScore > 80 && overallScore <= 100) {
            return '#348EF4';
          } else {
            return '#F7F7F7'; // Handle scores outside the expected range
          }
    }

    render() {
        const { data, isLoading } = this.state;

        return(
            
            <SafeAreaView style={styles.container}>
                <View style={[styles.containerScore, {backgroundColor: (isLoading ? '#F7F7F7' : this.getOverallColor(this.getOverallScore(data[0].PH, data[0].ppm, data[0].ntu)))}]}>
                    <Text style={styles.scoreValue}>{isLoading ? "0" : this.getOverallScore(data[0].PH, data[0].ppm, data[0].ntu)}</Text>
                    <View style={styles.subContainerScore}>
                        <Text style={styles.scoreTitle}>Water Quality Score</Text>
                        <Text style={styles.scoreGrade}>{isLoading ? "Calculating..." : this.getOverallGrade(this.getOverallScore(data[0].PH, data[0].ppm, data[0].ntu))}</Text>
                    </View>
                </View>
                <View style={styles.containerSection}>
                    <View>
                    <Text style={styles.sectionTitle}>Sensor Insights</Text>
                    <Text style={styles.sectionSubtitle}>Last update: 10 minutes ago</Text>
                    </View>
                    <View style={styles.syncBtnContainer}>
                    <TouchableOpacity style={styles.syncBtn} onPress = {() => this.getHistoryFirestoreCollection()}>
                        <Text style={styles.syncText}>Sync Data</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                <View style={[styles.containerParams, {borderLeftColor: (isLoading ? '#737373' : '#2FBF71')}]}>
                        <Text style={styles.paramsTitle}>Water Level</Text>
                        <Text style={styles.paramsValue}>{isLoading ? "Loading..." : (data.length > 0 ? data[0].cm.toFixed(2): "N/A") + " cm"}</Text>
                    </View>
                    <View style={[styles.containerParams, {borderLeftColor: (isLoading ? '#737373' : '#2FBF71')}]}>
                        <Text style={styles.paramsTitle}>Water Temperature</Text>
                        <Text style={styles.paramsValue}>{isLoading ? "Loading..." : (data.length > 0 ? data[0].C.toFixed(1) : "N/A") + "°C"}</Text>
                    </View>
                    <View style={[styles.containerParams, {borderLeftColor: (isLoading ? '#737373' : this.getParamsTDS(data[0].ppm) )}]}>
                        <Text style={styles.paramsTitle}>Total Dissolved Solids</Text>
                        <Text style={styles.paramsValue}>{isLoading ? "Loading..." : (data.length > 0 ? data[0].ppm.toFixed(2) : "N/A") + " ppm"}</Text>
                    </View>
                    <View style={[styles.containerParams, {borderLeftColor: (isLoading ? '#737373' : this.getParamsPH(data[0].PH) )}]}>
                        <Text style={styles.paramsTitle}>pH Level</Text>
                        <Text style={styles.paramsValue}>{isLoading ? "Loading..." : (data.length > 0 ? data[0].PH.toFixed(2): "N/A")}</Text>
                    </View>
                    <View style={[styles.containerParams, {borderLeftColor: (isLoading ? '#737373' : this.getParamsTurbidity(data[0].ntu) )}]}>
                        <Text style={styles.paramsTitle}>Turbidity</Text>
                        <Text style={styles.paramsValue}>{isLoading ? "Loading..." : (data.length > 0 ? data[0].ntu.toFixed(2) : "N/A") + " NTU"}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}