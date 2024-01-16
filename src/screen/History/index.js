import React, { Component } from "react";
import { View, Text, FlatList,TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { getDocs, collection } from 'firebase/firestore';
import { db } from "../../../database/app";
import { Calendar } from "react-native-calendars";
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
        token: '',
        selectedDate: "",
        markedDates: {},
        selectedData:[],
        averageScore:null,
    })

    getLocalDataStorage = async() => {
        const token = await AsyncStorage.getItem('uid');

        if(token != null) {
            this.setState({token : token})
            this.getHistoryFirestoreCollection();
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
                const { C, PH, cm, ntu, ppm } = element.data();
                history.push({
                    key: element.id,
                    temperature: C,
                    ph: PH,
                    water_level: cm,
                    tds: ppm,
                    turbidity: ntu
                });
                this.setState({
                    data: history,
                }, (()=>this.handleRefresh()));
            });
        })
    }

    calculateAverage = (arr) => {
        const dataLength = arr.length;
        let totalValue = 0;
        let ph = 0;
        let temperature = 0;
        let turbidity = 0;
        let water_level = 0;
        let tds = 0;
        const reducedigit = (digit) => {
            return Math.floor(digit * 100) / 100;
        }

        arr.map((item) => {
            ph= ph + parseFloat(item.ph);
            temperature = temperature + parseFloat(item.temperature);
            turbidity = turbidity + parseFloat(item.turbidity);
            tds = tds + parseFloat(item.tds);
            water_level = water_level + parseFloat(item.water_level);
        })

        ph = reducedigit(ph/dataLength);
        temperature = reducedigit(temperature/dataLength);
        turbidity = reducedigit(turbidity/dataLength);
        tds = reducedigit(tds/dataLength);
        water_level = reducedigit(water_level/dataLength);

        totalValue = ((ph + temperature + turbidity + tds + water_level) / 5) * 0.1;
        const average = {
            "totalValue" : reducedigit(totalValue),
            "ph": ph,
            "temperature": temperature,
            "water_level": water_level,
            "tds": tds,
            "turbidity": turbidity
        }

        this.setState({
            averageScore: average,
            isLoading:false
        })
    }
    
    filterDataHistory = () => {
        const context = this.state;
        const arr = [];

        context.data.map((item) => {
            if(moment(item.key).format('YYYY-MM-DD') == context.selectedDate){
                arr.push(item);
            }
        })

        if(arr.length > 0){
            this.calculateAverage(arr);
        } else {
            this.setState({
                selectedData:[],
                averageScore:null,
                isLoading:false
            });
        }
    }

    handleRefresh = () => {
        this.setState({isLoading:true});
        if(this.state.selectedDate == '' || this.state.selectedDate == null) {
            this.setState({
                selectedDate: moment().format("YYYY-MM-DD")
            })
        }
        
        this.filterDataHistory();
    }

    getSelectedDayEvents = (date) => {
        let markedDates = {};
        markedDates[date] = { selected: true, color: '#64A9F7', textColor: '#FFFFFF' };
        let serviceDate = moment(date);
        serviceDate = serviceDate.format("YYYY-MM-DD");
        this.setState({
            selectedDate: serviceDate,
            markedDates: markedDates
        }, (() => this.handleRefresh()));
    }

    render() {
        return(
            <SafeAreaView style={styles.container}>
                <Calendar
                    style={styles.calendar}
                    onDayPress={(day) => {
                        //{"dateString": "2024-01-25", "day": 25, "month": 1, "timestamp": 1706140800000, "year": 2024}
                        this.getSelectedDayEvents(day.dateString);
                    }}
                    markedDates={this.state.markedDates}
                    theme={{
                        backgroundColor: '#348EF4',
                        calendarBackground: '#348EF4',
                        todayTextColor:'#000',
                        selectedDayBackgroundColor:'#64A9F7',
                        selectedDayTextColor: '#ffffff',
                        selectedDotColor:'#ffffff',
                        dayTextColor:'#ffffff',
                        monthTextColor:'#ffffff',
                        arrowColor:'#ffffff',
                    }}
                />

                <View style={styles.containerSelectedDateTitle}>
                    <Text style={styles.selectedDateTitle}>
                        {
                            this.state.selectedDate != '' && this.state.selectedDate !=null ?
                            moment(this.state.selectedDate).format('DD MMMM YYYY') : "Loading..."
                        }
                    </Text>
                    <Text style={styles.averageScoreInsight}>Average Sensor Insight</Text>
                </View>

                <ScrollView>
                    {
                        this.state.isLoading ?
                            <View style={styles.childContainerDetail}>
                                <Text style={styles.textStatusFetch}>Loading....</Text> 
                            </View> :
                            this.state.averageScore != null?
                                <>
                                    <View style={[styles.row, styles.childContainerDetail]}>
                                        <TouchableOpacity onPress={() => {}}>
                                            <View style={styles.averageContainer}>
                                                <Text style={styles.averageTitle}>Average Score</Text>
                                                <Text style={styles.averageValue}>{this.state.averageScore.totalValue}</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {}}>
                                            <View style={[styles.parameterContainer, styles.elevation, this.state.averageScore.water_level>1000 ? styles.valueGreen : this.state.averageScore.water_level>500 ? styles.valueYellow : styles.valueRed ]}>
                                                <Text style={styles.parameterTitle}>Water Level</Text>
                                                <Text style={styles.parameterValue}>{parseInt(this.state.averageScore.water_level)} l</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[styles.row, styles.childContainerDetail]}>
                                        <TouchableOpacity onPress={() => {}}>
                                            <View style={[styles.parameterContainer, styles.elevation, this.state.averageScore.temperature < 25 && this.state.averageScore.temperature > 20 ? styles.valueGreen : styles.valueRed ]}>
                                                <Text style={styles.parameterTitle}>Temperature</Text>
                                                <Text style={styles.parameterValue}>{parseInt(this.state.averageScore.temperature)} &deg;C</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {}}>
                                            <View style={[styles.parameterContainer, styles.elevation, this.state.averageScore.tds < 100 ? styles.valueGreen : this.state.averageScore.tds < 400 ? styles.valueYellow : styles.valueRed ]}>
                                                <Text style={styles.parameterTitle}>TDS</Text>
                                                <Text style={styles.parameterValue}>{this.state.averageScore.tds} ppm</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[styles.row, styles.childContainerDetail, styles.lastContainerParameter]}>
                                        <TouchableOpacity onPress={() => {}}>
                                            <View style={[styles.parameterContainer, styles.elevation, this.state.averageScore.ph == 7 ? styles.valueGreen : this.state.averageScore.ph < 8.5 && this.state.averageScore.ph > 6.5 ? styles.valueYellow : styles.valueRed]}>
                                                <Text style={styles.parameterTitle}>ph Level</Text>
                                                <Text style={styles.parameterValue}>{this.state.averageScore.ph}</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {}}>
                                            <View style={[styles.parameterContainer, styles.elevation, this.state.averageScore.turbidity < 4 ? styles.valueGreen : this.state.averageScore.turbidity < 6 ? styles.valueYellow : styles.valueRed]}>
                                                <Text style={styles.parameterTitle}>Turbidity</Text>
                                                <Text style={styles.parameterValue}>{this.state.averageScore.turbidity} NTU</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </>
                                :
                                <View style={styles.childContainerDetail}>
                                    <Text style={styles.textStatusFetch}>No Data Records Found</Text>
                                </View>
                    }
                </ScrollView>
                {/* {
                    this.state.isLoading ?
                        <View style={styles.containerLoading}>
                            <Text>Loading....</Text> 
                        </View>
                        :
                        this.state.selectedData.length == 0 ?
                            <View style={styles.containerLoading}>
                                <Text style={styles.noRecordsFound}>No Data Records Found</Text>
                            </View>
                            :
                            <FlatList
                                data={this.state.selectedData}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) => (
                                    <View>
                                        <View>
                                            <Text>{moment(item.key).format('MMM DD YYYY, hh:mm:ss a')}</Text>
                                        </View>
                                        <View>
                                            <Text>Temperature : {item.temperature} celcius</Text>
                                            <Text>Water level : {item.water_level} {item.water_level > 1 ? "liters" : "liter"}</Text>
                                            <Text>TDS : {item.tds} ppm</Text>
                                            <Text>Turbidity : {item.turbidity} ntu</Text>
                                            <Text>PH : {item.ph}</Text>
                                        </View>
                                    </View>
                            )}/>
                } */}
            </SafeAreaView>
        )
    }
}