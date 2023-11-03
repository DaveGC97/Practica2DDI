import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Account from '../../../screen/Account';
import ChangeName from '../../../screen/ChangeName/ChangeName';
import ChangeEmail from '../../../screen/ChangeEmail/ChangeEmail';
import ChangeUsername from '../../../screen/ChangeUsername/ChangeUsername';
import ChangePassword from '../../../screen/ChangePassword/ChangePassword';

export default function StackAccount() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName='Account'>
            <Stack.Screen
                name='Acoount'
                component={Account}
                options={{
                    title: '',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name='ChangeName'
                component={ChangeName}
                options={{
                    title: '',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name='ChangeEmail'
                component={ChangeEmail}
                options={{
                    title: '',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name='ChangeUsername'
                component={ChangeUsername}
                options={{
                    title: '',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name='ChangePassword'
                component={ChangePassword}
                options={{
                    title: '',
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
}
