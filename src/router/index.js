import React, { Component } from 'react'
import { Text } from 'react-native'
import Splash from '../screen/Splash/index.js'
import Login from '../screen/Login/index.js'
import Home from '../screen/Home/index.js'
import History from '../screen/History/index.js'
import Register from '../screen/Register/index.js'
import Temperature from '../screen/History/HistoryDetail/Temperature/index.js'
import PH from '../screen/History/HistoryDetail/PH/index.js'
import TDS from '../screen/History/HistoryDetail/TDS/index.js'
import Turbidity from '../screen/History/HistoryDetail/Turbidity/index.js'
import WaterLevel from '../screen/History/HistoryDetail/WaterLevel/index.js'
import More from '../screen/More/index.js'
import TipsNTrick from '../screen/More/TipsNTrick/index.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { gray, white, black, colorPrimary } from '../component/color/index.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Confirm from '../screen/Confirm/index.js'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default class BottomTabNavigator extends Component {
    render() {
        return (
            <Tab.Navigator
                screenOptions={{
                    activeTintColor: white,
                    inactiveTintColor: gray,
                }}>
                    <Tab.Screen
                        name='Home'
                        component={Home}
                        options={(route) => ({
                            headerShown: false,
                            tabBarLabel: ({focused}) => {
                                return <Text
                                    style={{
                                        fontSize: (focused) ? 18 : 15,
                                        color: (focused) ? colorPrimary : gray,
                                    }}>  {'Home'}
                                </Text>
                            },
                            tabBarIcon: ({ focused, color, size }) => (
                                <Icon name="home" style={{
                                    fontSize: (focused) ? 23 : 18,
                                    color: (focused) ? colorPrimary : gray,
                                }}/>
                            )
                        })}/>
                    <Tab.Screen
                        name="HistoryBottomNav"
                        component={HistoryStack}
                        options={(route) => ({
                            headerShown: false,
                            tabBarLabel: ({focused}) => {
                                return <Text
                                    style={{
                                        fontSize: (focused) ? 18 : 15,
                                        color: (focused) ? colorPrimary : gray,
                                    }}>  {'History'}
                                </Text>
                            },
                            tabBarIcon: ({ focused,color, size }) => (
                                <Icon name="history" style={{
                                    fontSize: (focused) ? 23 : 18,
                                    color: (focused) ? colorPrimary : gray,
                                }}/>
                            )
                        })}/>
                    <Tab.Screen
                        name="MoreStack"
                        component={MoreStack}
                        options={(route) => ({
                            headerShown: false,
                            tabBarLabel: ({focused}) => {
                                return <Text
                                    style={{
                                        fontSize: (focused) ? 18 : 15,
                                        color: (focused) ? colorPrimary : gray,
                                    }}>  {'More'}
                                </Text>
                            },
                            tabBarIcon: ({ focused,color, size }) => (
                                <FeatherIcon name="more-horizontal" style={{
                                    fontSize: (focused) ? 23 : 18,
                                    color: (focused) ? colorPrimary : gray,
                                }}/>
                            )
                        })}/>
            </Tab.Navigator>
        )
    }
}

export const MoreStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="more"
                component={More}
                options={{headerShown: false}}/>
            <Stack.Screen
                name="TipsNTrick"
                component={TipsNTrick}
                options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export const HistoryStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="History"
                component={History}
                options={{headerShown:false}}/>
            <Stack.Screen
                name='Turbidity'
                component={Turbidity}
                options={{
                    headerShown:true, 
                    headerTitle: 'Turbidity', 
                    headerTintColor:'#ffffff',
                    headerStyle:{
                        backgroundColor:'#348EF4',
                    },
                    headerTitleStyle: {
                        color:'#ffffff',
                        fontSize:22,
                        fontWeight:'700',
                    },
                    headerTitleAlign:'center',
                }}/>
            <Stack.Screen
                name='PH'
                component={PH}
                options={{
                    headerShown:true, 
                    headerTitle: 'PH', 
                    headerTintColor:'#ffffff',
                    headerStyle:{
                        backgroundColor:'#348EF4',
                    },
                    headerTitleStyle: {
                        color:'#ffffff',
                        fontSize:22,
                        fontWeight:'700',
                    },
                    headerTitleAlign:'center',
                    // headerLeft: () => (
                    //     <MaterialIcon name="navigate-before" style={{fontSize: 22, color: '#FFFFFF'}}/>
                    // ),
                    // headerBackImageSource: () => (
                    //     <MaterialIcon name="navigate-before" style={{fontSize: 22, color: '#FFFFFF'}}/>
                    // ),
                }}/>
            <Stack.Screen
                name='TDS'
                component={TDS}
                options={{
                    headerShown:true, 
                    headerTitle: 'TDS', 
                    headerTintColor:'#ffffff',
                    headerStyle:{
                        backgroundColor:'#348EF4',
                    },
                    headerTitleStyle: {
                        color:'#ffffff',
                        fontSize:22,
                        fontWeight:'700',
                    },
                    headerTitleAlign:'center',
                }}/>
            <Stack.Screen
                name='Temperature'
                component={Temperature}
                options={{
                    headerShown:true, 
                    headerTitle: 'Temperature', 
                    headerTintColor:'#ffffff',
                    headerStyle:{
                        backgroundColor:'#348EF4',
                    },
                    headerTitleStyle: {
                        color:'#ffffff',
                        fontSize:22,
                        fontWeight:'700',
                    },
                    headerTitleAlign:'center',
                }}/>
            <Stack.Screen
                name='WaterLevel'
                component={WaterLevel}
                options={{
                    headerShown:true, 
                    headerTitle: 'Water Level', 
                    headerTintColor:'#ffffff',
                    headerStyle:{
                        backgroundColor:'#348EF4',
                    },
                    headerTitleStyle: {
                        color:'#ffffff',
                        fontSize:22,
                        fontWeight:'700',
                    },
                    headerTitleAlign:'center',
                }}/>
        </Stack.Navigator>
    )
}

export const Router = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Splash" 
                component={Splash} 
                options={{headerShown: false}}/>
            <Stack.Screen 
                name="Register" 
                component={Register} 
                options={{headerShown: false}}/>
            <Stack.Screen 
                name="Confirm" 
                component={Confirm} 
                options={{headerShown: false}}/>
            <Stack.Screen 
                name="Login" 
                component={Login} 
                options={{headerShown: false}}/>
            <Stack.Screen
                name='HomeTab'
                component={BottomTabNavigator}
                options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}