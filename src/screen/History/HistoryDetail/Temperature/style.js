import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    withList: {
        width:'33%',
        maxWidth:'33%',
    },
    textAlignLeft: {
        textAlign:'left'
    },
    textAlignRight: {
        textAlign:'right',
    },
    containerDetail: {
        backgroundColor:'#348EF4',
        paddingLeft:16,
        paddingRight:16,
        paddingTop:8,
        paddingBottom:8,
    },
    textTitleDetail : {
        fontSize:15,
        color:'#FFFFFF',
    },
    textDescDetail : {
        fontSize:20,
        color:'#FFFFFF',
        fontWeight:'700',
    },
    containerHeaderFlatList : {
        backgroundColor:'#348EF4',
        padding:16,
    },
    textHeaderFlatlist:{
        fontSize:15,
        color:'#FFFFFF'
    },
    flatListItem: {
        padding: 16
    },
    textListItem: {
        fontSize:15,
        color:'#404040',
    },
    backgroundOdd: {
        backgroundColor: 'rgba(100, 169, 247, 0.25)'
    },
    backgroundEven: {
        backgroundColor:'#FFFFFF'
    },
    border: {
        borderColor:'#000',
        borderWidth: 1,
    }
});

export default styles;