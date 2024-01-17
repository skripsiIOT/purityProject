import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    containerScore: {
        margin: 20,
        padding: 20,
        borderRadius: 16,
        backgroundColor: '#348EF4',
        flexDirection: 'row',
        alignItems: 'center'
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    subContainerScore: {
        paddingLeft: 20
    },
    scoreValue: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: '500',
        color: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50, // Make it half of the width/height to create a circle
        borderWidth: 4, // Add a border width
        borderColor: '#fff', // Set the border color
        width: 80, // Set the width
        height: 80, // Set the height
        textAlign: 'center', // Center the text horizontally
        lineHeight: 80, // Center the text vertically
    },
    scoreTitle: {
        textAlign: 'left',
        fontSize: 16,
        fontWeight: '500',
        color: '#F5F5F5'
    },
    scoreGrade: {
        textAlign: 'left',
        fontSize: 32,
        fontWeight: '700',
        color: '#F5F5F5'
    },
    syncBtnContainer: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 20
    },
    syncBtn: {
        backgroundColor: '#348EF4',
        padding: 10,
        borderRadius: 8,
        alignItems: 'flex-end'
    },
    syncText: {
        color: '#fff'
    },
    containerSection: {
        paddingLeft: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    sectionTitle: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 5
    },
    sectionSubtitle: {
        textAlign: 'left',
        fontSize: 12,
        fontWeight: '500',
    },
    containerParams: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        padding: 20,
        borderRadius: 16,
        borderLeftWidth: 5,
        borderLeftColor: '#2FBF71',
        backgroundColor: '#FFF'
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    paramsTitle: {
        textAlign: 'left',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5
    },
    paramsValue: {
        textAlign: 'left',
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 5
    },
    
})

export default styles;