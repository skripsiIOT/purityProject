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
        marginBottom: 60,
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
        marginBottom: 20,
    },
    inputViewContainerError: {
        width: '80%',
        height: 55,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor : '#FF0000',
        borderBottomWidth : 1,
        marginBottom: 20,
    },
    inputView: {
        fontSize: 18,
        paddingLeft: 20,
    },
    loginBtn: {
        backgroundColor: '#348EF4',
        color: '#fff',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        borderRadius: 10,
    },
    loginText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '700',
    },
    registerBtn: {
        marginTop: 20
    },
    registerText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
        color: '#348EF4'
    }
});

export default styles;