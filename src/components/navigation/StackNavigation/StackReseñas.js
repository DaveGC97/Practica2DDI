import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import StackAccount from '../StackNavigation/StackAccount';

const StackReseñas = ({ navigation }) => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('StackAccount')}
                    >
                        <View
                            style={{
                                backgroundColor: '#24EF2C', // Fondo blanco
                                borderRadius: 23, // Borde redondeado
                                padding: 2, // Espaciado interno
                                marginRight: 3,
                            }}
                        >
                            <Image
                                source={require('../../../assets/person1.jpeg')}
                                style={{
                                    width: 45,
                                    height: 45,
                                    borderRadius: 20,
                                    overflow: 'hidden', // Oculta el contenido que se desborda
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                ),
                headerStyle: {
                    backgroundColor: '#E0E0E0', // Fondo blanco de la barra de navegación
                },
                headerShadowVisible: false, // Quitar la sombra
            }}
        >
            <Stack.Screen
                name='Reseñas'
                component={ReseñasScreen}
                options={{
                    headerTitle: '',
                }}
            />
        </Stack.Navigator>
    );
};

const ReseñasScreen = () => {
    return (
        <View
            style={{
                backgroundColor: '#E0E0E0',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text>Bienvenido a Reseñas</Text>
            {/* Tu contenido adicional aquí */}
        </View>
    );
};

export default StackReseñas;
