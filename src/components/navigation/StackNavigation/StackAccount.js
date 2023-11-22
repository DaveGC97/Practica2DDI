import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Account from '../../../screen/Account';
import ChangeProfile from '../../../screen/ChangeProfile';
import ChangeName from '../../../screen/ChangeName/ChangeName';
import ChangeEmail from '../../../screen/ChangeEmail/ChangeEmail';
import ChangeUsername from '../../../screen/ChangeUsername/ChangeUsername';
import ChangePassword from '../../../screen/ChangePassword/ChangePassword';

export default function StackAccount() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName='Account'>
            <Stack.Screen
                name='Account'
                component={Account}
                options={{
                    title: '',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name='ChangeProfile'
                component={ChangeProfile}
                options={{
                    title: 'Cambiar Datos',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name='ChangeName'
                component={ChangeName}
                options={{
                    title: 'Cambiar Nombre',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name='ChangeEmail'
                component={ChangeEmail}
                options={{
                    title: 'Cambiar Correo Electrónico',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name='ChangeUsername'
                component={ChangeUsername}
                options={{
                    title: 'Cambiar Nombre de Usuario',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name='ChangePassword'
                component={ChangePassword}
                options={{
                    title: 'Cambiar Contraseña',
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
}
