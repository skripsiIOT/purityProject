import React, { Component } from 'react'
import { Text } from 'react-native'
import Splash from '../screen/Splash/index.js'
import Login from '../screen/Login/index.js'
import Home from '../screen/Home/index.js'
import History from '../screen/History/index.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { gray, white, black, colorPrimary } from '../component/color/index.js';
import Icon from 'react-native-vector-icons/FontAwesome';

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
                        name="History"
                        component={History}
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
            </Tab.Navigator>
        )
    }
}

export const Router = () => {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen 
                name="Splash" 
                component={Splash} 
                options={{headerShown: false}}/> */}
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