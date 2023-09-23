import React from 'react'
import Splash from '../screen/Splash/index.js'
import Login from '../screen/Login/index.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

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
        </Stack.Navigator>
    )
}