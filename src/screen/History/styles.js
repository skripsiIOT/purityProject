
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff'
    },
    calendar: {
        paddingBottom:10,
        borderBottomEndRadius:10,
        borderBottomStartRadius:10
    },
    containerSelectedDateTitle:{
       paddingLeft:16,
       paddingTop:25,
    },
    selectedDateTitle: {
        fontWeight:'700',
        fontSize:20,
        color:'#404040',
        marginBottom:4,
    },
    averageScoreInsight: {
        color:'#737373',
    },
    textStatusFetch:{
        fontSize:20,
        fontWeight:'700',
    },
    childContainerDetail: {
        paddingLeft:16,
        paddingRight:16,
        paddingTop:25,
    },
    row: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    lastContainerParameter: {
        marginBottom:20,
    },
    averageContainer:{
        width:175,
        maxWidth:175,
        backgroundColor:'#348EF4',
        borderRadius:10,
        padding:16
    },
    averageTitle: {
        color:'#ffffff',
        fontSize:10,
        fontWeight:'700'
    },
    averageValue: {
        color:'#ffffff',
        fontSize:22,
        fontWeight:'700'
    },
    parameterContainer: {
        width:175,
        maxWidth:175,
        backgroundColor:'#ffffff',
        borderRadius:10,
        padding:16
    },
    parameterTitle: {
        fontSize:10,
        fontWeight:'700',
        color:'#404040'
    },
    parameterValue: {
        fontSize:22,
        fontWeight:'700',
        color:'#404040'
    },
    valueYellow: {
        borderLeftColor:'#F4D35E',
        borderLeftWidth:5,
    },
    valueRed: {
        borderLeftColor:'#D64933',
        borderLeftWidth:5,
    },
    valueGreen: {
        borderLeftColor:'#2FBF71',
        borderLeftWidth:5,
    },





    containerTitlePageText: {
        paddingRight:25,
        paddingLeft:25,
        paddingTop:20,
        paddingBottom:20,
        backgroundColor:'#348EF4',
    },
    titlePageText: {
        textAlign: 'left',
        fontSize: 25,
        fontWeight: '700',
        color:'#FFF',
    },
    containerContentPage: {
        padding:25
    },
    itemFlatList: {
        marginTop:10,
        marginBottom:10,
        padding:8,
        borderRadius:8,
        backgroundColor:'#ffffff'
    },
    listTitle: {
        marginBottom:8,
    },
    title: {
        fontSize:17,
        fontWeight:'700',
    },
    elevation: {
        shadowOffset: {width: -2, height: 4},  
        shadowColor: '#171717',  
        shadowOpacity: 0.8,  
        shadowRadius: 5, 
        elevation:8,
    },
    descriptionParameter: {
        fontSize:15
    },
})

export default styles;