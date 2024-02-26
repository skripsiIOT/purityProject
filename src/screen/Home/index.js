import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDocs, collection } from 'firebase/firestore';
import { db } from "../../../database/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

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
        const { navigation } = this.props;
    
        if (token != null) {
          // this.setState({ token: 'omTmbAHDyXXl3li8HdEvgXARNJA3' });
          this.setState({ token: token });
          this.getHistoryFirestoreCollection();
        } else {
          navigation.replace('Login');
        }
    };

    getHistoryFirestoreCollection = async() => {
    // const { token } = this.state;
    const token = await AsyncStorage.getItem('deviceID');
    const collectionId = collection(db, token);
    const query = getDocs(collectionId);
    const dataCount = [];

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
      });

      // const latestDocument = querySnapshot.docs[dataCount.length - 1]?.data();
      const latestDocument = dataCount[dataCount.length - 1];
      const { C, PH, cm, ntu, ppm } = latestDocument || {};

      this.setState({
        isLoading: false,
        data: latestDocument
          ? [
              {
                key: querySnapshot.docs[0].id,
                C,
                PH,
                cm,
                ntu,
                ppm
              }
            ]
          : []
      });
    });
  };

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

        // console.log(scalePH)
        // console.log(scaleTDS)
        // console.log(scaleTurbidity)

        return ((scalePH + scaleTDS + scaleTurbidity)/3).toFixed(0)
    }

    getOverallGrade = (overallScore) => {

        if (overallScore >= 0 && overallScore <= 20) {
            return 'Poor';
          } else if (overallScore > 20 && overallScore <= 40) {
            return 'Low-grade';
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
              {/* {console.log(data)} */}
                <StatusBar translucent backgroundColor='#FFFFFF' barStyle={'dark-content'}/>
                <View style={[
                    styles.containerScore, 
                    {backgroundColor: 
                      (
                        isLoading ? 
                          '#737373' : 
                          data.length > 0 ?
                          this.getOverallColor(this.getOverallScore(data[0].PH, data[0].ppm, data[0].ntu)) : '#737373'
                    )}]}>
                    <Text style={styles.scoreValue}>
                      {
                        isLoading ? 
                          "N/A" : 
                          data.length > 0 ? 
                          this.getOverallScore(data[0].PH, data[0].ppm, data[0].ntu) : "N/A"
                      }
                    </Text>
                    <View style={styles.subContainerScore}>
                        <Text style={styles.scoreTitle}>Average Water Quality Score</Text>
                        <Text style={styles.scoreGrade}>
                          {
                            isLoading ?
                              "Calculating..." : 
                              data.length > 0 ?
                              this.getOverallGrade(this.getOverallScore(data[0].PH, data[0].ppm, data[0].ntu)) : "No Data"
                          }
                        </Text>
                    </View>
                </View>

                <View style={styles.containerSection}>
                    <View>
                    <Text style={styles.sectionTitle}>Sensor Insights</Text>
                    <Text style={styles.sectionSubtitle}>{"Last update: "}
                     { isLoading == false && data.length > 0 ? moment(data[0].key).format("DD MMM YYYY") : "" }
                     </Text>
                    </View>
                    <View style={styles.syncBtnContainer}>
                    <TouchableOpacity 
                      style={[styles.syncBtn, { opacity: isLoading ? 0.5 : 1 }]} 
                      onPress = {() => this.getHistoryFirestoreCollection()} disabled={isLoading}>
                        <Text style={styles.syncText}>Sync Data</Text>
                    </TouchableOpacity>
                    </View>
                </View>

                <ScrollView>

                  <View style={[styles.containerParams, {borderLeftColor: (isLoading ? '#737373' : data ? '#2FBF71' : '#737373')}]}>
                      <Text style={styles.paramsTitle}>Water Level</Text>
                      <Text style={styles.paramsValue}>
                        {
                          isLoading ? 
                            "Loading..." : 
                            (data.length > 0 ? data[0].cm.toFixed(2) + "cm": "No Data")
                        }
                      </Text>
                  </View>

                  <View style={[styles.containerParams, {borderLeftColor: (isLoading ? '#737373' : data ? '#2FBF71' : '#737373')}]}>
                      <Text style={styles.paramsTitle}>Water Temperature</Text>
                      <Text style={styles.paramsValue}>
                        {
                          isLoading ? "Loading..." : 
                          (data.length > 0 ? data[0].C.toFixed(1) + "°C": "No data")
                        }
                      </Text>
                  </View>

                  <View style={[styles.containerParams, {borderLeftColor: (isLoading ? '#737373' : data.length > 0 ? this.getParamsTDS(data[0].ppm) : "#737373" )}]}>
                      <Text style={styles.paramsTitle}>Total Dissolved Solids</Text>
                      <Text style={styles.paramsValue}>
                        {
                          isLoading ? 
                            "Loading..." : 
                            (data.length > 0 ? data[0].ppm.toFixed(2) + " ppm" : "No Data")
                        }
                      </Text>
                  </View>

                  <View style={[styles.containerParams, {borderLeftColor: (isLoading ? '#737373' : data.length > 0 ? this.getParamsPH(data[0].PH) : '#737373' )}]}>
                      <Text style={styles.paramsTitle}>pH Level</Text>
                      <Text style={styles.paramsValue}>
                        {
                          isLoading ? 
                            "Loading..." : 
                            (data.length > 0 ? data[0].PH.toFixed(2): "No Data")
                        }
                      </Text>
                  </View>

                  <View style={[styles.containerParams, {borderLeftColor: (isLoading ? '#737373' : data.length > 0 ? this.getParamsTurbidity(data[0].ntu) : '#737373' )}]}>
                      <Text style={styles.paramsTitle}>Turbidity</Text>
                      <Text style={styles.paramsValue}>
                        {
                          isLoading ? 
                            "Loading..." : 
                            (data.length > 0 ? data[0].ntu.toFixed(2) + " NTU" : "No Data")
                        }
                      </Text>
                  </View>

                </ScrollView>

            </SafeAreaView>
        )
    }
}