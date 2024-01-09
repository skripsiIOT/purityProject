import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        backgroundColor: '#fff'
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
    row: {
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    listTitle: {
        marginBottom:8,
    },
    title: {
        fontSize:17,
        fontWeight:'700',
    },
    elevation: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
    },
    descriptionParameter: {
        fontSize:15
    },
})

export default styles;