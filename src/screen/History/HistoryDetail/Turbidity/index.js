import React, { Component } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import styles from './style';
import moment from "moment";

export default class Turbidity extends Component {
    
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        isLoading: true,
        data:[],
        averageScore:null,
        selectedDate:"",
    })

    componentDidMount = () => {
        this.initializeComponent();
    }

    initializeComponent = () =>{
        const selectedData = this.props.route.params.selectedData;
        const averageScore = this.props.route.params.averageScore;
        const selectedDate = this.props.route.params.selectedDate;

        this.setState({
            data: selectedData,
            averageScore: averageScore,
            selectedDate: selectedDate,
            isLoading: false
        });
    }

    reducedigit = (digit) => {
        return Math.floor(digit * 100) / 100;
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {
                    this.state.isLoading ? 
                        <View>
                            <Text>Loading....</Text>
                        </View>
                        :
                        <>
                            <View style={[styles.row, styles.containerDetail]}>
                                <View>
                                    <Text style={styles.textTitleDetail}>Date</Text>
                                    <Text style={styles.textDescDetail}>{moment(this.state.selectedDate).format("DD MMMM YYYY")}</Text>
                                </View>
                                <View>
                                    <Text style={[styles.textTitleDetail, styles.textAlignRight]}>Average Score</Text>
                                    <Text style={[styles.textDescDetail, styles.textAlignRight]}>{this.state.averageScore.turbidity} NTU</Text>
                                </View>
                            </View>

                            <View style={[styles.row, styles.containerHeaderFlatList]}>
                                <View style={styles.withList}>
                                    <Text style={[styles.textAlignLeft, styles.textHeaderFlatlist]}>Time</Text>
                                </View>
                                <View style={styles.withList}>
                                    <Text style={[styles.textAlignLeft, styles.textHeaderFlatlist]}>Score</Text>
                                </View>
                                <View style={styles.withList}>
                                    <Text style={[styles.textAlignLeft, styles.textHeaderFlatlist]}>Description</Text>
                                </View>
                            </View>


                            <FlatList
                                data={this.state.data}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item, index}) => (
                                    <View style={[styles.row, styles.flatListItem, index%2 == 0 ? styles.backgroundEven : styles.backgroundOdd]}>
                                        <View style={styles.withList}>
                                            <Text style={[styles.textAlignLeft, styles.textListItem]}>
                                                {moment(item.key).format("HH:mm")}
                                            </Text>
                                        </View>
                                        <View style={styles.withList}>
                                            <Text style={[styles.textAlignLeft, styles.textListItem]}>{this.reducedigit(item.turbidity)}</Text>
                                        </View>
                                        <View style={styles.withList}>
                                            <Text style={[styles.textListItem, styles.textAlignLeft]}>{
                                                item.turbidity < 4 ? "Excellent":
                                                    item.turbidity < 6 ? "Fair" : "Poor" 
                                            }</Text>
                                        </View>
                                    </View>
                            )}/>
                        </>
                }
            </SafeAreaView>
        )
    }
}