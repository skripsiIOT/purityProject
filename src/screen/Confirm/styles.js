import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        height:'100%',
        width:"100%",
        backgroundColor : '#fff',
        justifyContent : 'center',
        alignItems : 'center'
    },
    imageContainer: {
        marginBottom: 36,
        width: '80%',
        justifyContent : 'center',
        alignItems : 'center'
    },
    descriptionContainer: {
        width: '80%',
        marginBottom: 36
    },
    description: {
        textAlign: 'center'
    },
    checkBoxContainer: {
        marginBottom: 36,
        width: "80%",
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkBox: {
        marginRight: 8
    },
    checkBoxText: {
        fontWeight: "500",
        flexShrink: 1
    },
    confirmBtn: {
        backgroundColor: '#348EF4',
        color: '#fff',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: '80%'
    },
    confirmText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '700',
    },


    inputViewContainer: {
        width: '80%',
        height: 55,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        borderRadius: 10,
    },
    inputViewContainerError: {
        width: '80%',
        height: 55,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor : '#FF0000',
        borderBottomWidth : 1,
    },
    inputView: {
        fontSize: 18,
        paddingLeft: 20,
    },
    marginBottomInputValid : {
        marginBottom:20,
    },
    validInput : {
        display:'none',
        fontSize:12,
        color:'#D64933',
        marginTop:5,
        marginBottom:20,
    },
    notValidInput:{
        fontSize:12,
        color:'#D64933',
        marginTop:5,
        marginBottom:20,
    },

});

export default styles;