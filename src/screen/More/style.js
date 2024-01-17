import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#FFFFFF',
        width:'100%',
        height:'100%'
    },
    row: {
        flexDirection:'row',
    },
    containerMenu:{
        paddingLeft:16,
        paddingTop:20,
        paddingBottom:20,
        borderBottomColor:'#ECECEC',
        borderBottomWidth:1
    },
    titleMenu:{
        color:'#404040',
        fontSize:22,
        fontWeight:'500',
        marginLeft: 15,
    }
});

export default styles;