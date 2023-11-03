import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image } from 'react-native';
import CharacterDetail from '../../../screen/CharacterDetail/CharacterDetail';
import Favoritos from '../../../screen/Favoritos';

export default function StackFavoritos() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName='Favoritos'>
            <Stack.Screen
                name='Favoritos'
                component={Favoritos}
                options={{
                    title: '',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name='Detail'
                component={CharacterDetail}
                options={{
                    title: '',
                    headerTransparent: true,
                    headerBackImage: () => (
                        <Image source={require('../../../assets/rick4.png')} />
                    ),
                    headerLeftContainerStyle: {
                        marginTop: 90,
                    },
                }}
            />
        </Stack.Navigator>
    );
}
