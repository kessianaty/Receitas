import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/index';
import Cadastrar from '../pages/add.recipe';

const Stack = createStackNavigator();

export default function RotasMain() {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Cadastrar">
            <Stack.Screen name="Cadastrar"        component={Cadastrar}  options={{headerTintColor: '#9ac234', title: 'Cadastro do dia'}}    />
            <Stack.Screen name="Home"             component={Home}       options={{headerTintColor: '#9ac234'}}/>
        </Stack.Navigator>
    );
}