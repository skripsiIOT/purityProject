import React, { Component } from "react";
import { View, Text, FlatList,TouchableOpacity } from "react-native";
import { getDocs, collection } from 'firebase/firestore';
import { db } from "../../../database/app";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class History extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        this.getLocalDataStorage();
    }

    getInitialState = () => ({
        data: [],
        isLoading: true,
        token: ''
    })

    getLocalDataStorage = async() => {
        const token = await AsyncStorage.getItem('uid');

        if(token != null) {
            this.setState({token : token})
            this.getHistoryFirestoreCollection()
        } else {
            navigation.replace('Login');
        }
    }

    getHistoryFirestoreCollection = () => {
        const history = [];
        const collectionId = collection(db, this.state.token);
        const query = getDocs(collectionId);
        query.then((querySnapshot) => {
            querySnapshot.forEach((element) => {
                const { tdsValue, ntu, distanceValue } = element.data();
                history.push({
                    key: element.id,
                    // ph: ph,
                    tdsValue: tdsValue,
                    // temperature: temperature,
                    distanceValue: distanceValue,
                    ntu: ntu
                });
                this.setState({
                    isLoading: false,
                    data: history
                })
            });
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.containerTitlePageText}>
                    <View style={styles.row}>
                        <Text style={styles.titlePageText}>History</Text>
                        <TouchableOpacity style = {styles.buttonRefresh} 
                        onPress = {() => this.getHistoryFirestoreCollection()}
                        >
                            <Icon name="refresh" size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.containerContentPage}>
                    {
                        this.state.isLoading ? 
                        <Text>Loading...</Text> :
                        this.state.data.length < 1 ?
                            <Text>No data history.</Text> :
                            <FlatList
                                data={this.state.data}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) => (
                                    <View style={[styles.itemFlatList, styles.elevation]}>
                                        <View style={styles.listTitle}>
                                            <Text style={styles.title}>{moment(item.key).format('MMM DD YYYY, hh:mm:ss a')}</Text>
                                        </View>
                                        <View style={styles.listContent}>
                                            {/* <Text>pH : {item.}</Text> */}
                                            <Text style={styles.descriptionParameter}>Turbidity : {item.ntu} ntu</Text>
                                            <Text style={styles.descriptionParameter}>Water level : {item.distanceValue} {item.distanceValue > 1 ? "liters" : "liter"}</Text>
                                            <Text style={styles.descriptionParameter}>TDS : {item.tdsValue} ppm</Text>
                                            {/* <Text>Temperature : {item.temperature}</Text> */}
                                        </View>
                                    </View>
                            )}/>
                    }
                </View>
            </View>
        )
    }
}