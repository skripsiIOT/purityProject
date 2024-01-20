import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        height:'100%',
        width:"100%",
        backgroundColor : '#fff',
        // justifyContent : 'center',
        alignItems : 'center'
    },
    title: {
        top: 0,
        marginTop: 200,
        marginBottom: 57,
    },
    titleText: {
        fontSize: 35,
        fontWeight: '800',
        color: 'black'
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
    registerBtn: {
        backgroundColor: '#348EF4',
        color: '#fff',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        borderRadius: 10,
    },
    registerText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '700',
    },
    loginBtn: {
        marginTop: 20
    },
    loginText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
        color: '#348EF4'
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
    marginBottomInputValid : {
        marginBottom:20,
    }
});

export default styles;