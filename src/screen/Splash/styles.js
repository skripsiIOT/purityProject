import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    progressbar: {  
        height: 5,  
        backgroundColor: '#0048BA',
        position: 'absolute',
        bottom: 0,
    },
    // imageContainer: {
    //     alignSelf: 'center', 
    //     justifyContent: 'center'
    // },
    imageBackground: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    image: {
        height:170, 
        resizeMode:'contain'
    },
    quoteContainer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        marginLeft: 100,
        marginBottom: 60,
    },
    quote: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center'
    },
});

export default styles;