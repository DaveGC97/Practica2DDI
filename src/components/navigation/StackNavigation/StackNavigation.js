import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RickandMortyApi from '../../../api/rm';
import CharacterDetail from '../../../screen/CharacterDetail/CharacterDetail';

export default function () {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='RickandMortyApi'
                component={RickandMortyApi}
                options={{
                    title: '',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name='Detail'
                component={CharacterDetail}
                options={{
                    headerShown: false,
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
}
