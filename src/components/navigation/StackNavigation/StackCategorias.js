import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import StackAccount from '../StackNavigation/StackAccount';
import { Card, List, IconButton } from 'react-native-paper';
import ComidaRapidaScreen from './ComidaRapidaScreen';
import LocalesScreen from './LocalesScreen';
import BuffetScreen from './BuffetScreen';

const StackCategorias = ({ navigation }) => {
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
                                backgroundColor: '#24EF2C',
                                borderRadius: 23,
                                padding: 2,
                                marginRight: 3,
                            }}
                        >
                            <Image
                                source={require('../../../assets/person1.jpeg')}
                                style={{
                                    width: 45,
                                    height: 45,
                                    borderRadius: 20,
                                    overflow: 'hidden',
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                ),
                headerStyle: {
                    backgroundColor: '#E0E0E0',
                },
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                name='Categorias'
                component={CategoriasScreen}
                options={{
                    headerTitle: '',
                }}
            />
            <Stack.Screen
                name='ComidaRapidaScreen'
                component={ComidaRapidaScreen}
                options={{
                    title: 'Comida Rápida',
                }}
            />
            <Stack.Screen
                name='LocalesScreen'
                component={LocalesScreen}
                options={{
                    title: 'Locales',
                }}
            />
            <Stack.Screen
                name='BuffetScreen'
                component={BuffetScreen}
                options={{
                    title: 'Buffet',
                }}
            />
        </Stack.Navigator>
    );
};

const CategoriasScreen = ({ navigation }) => {
    const categories = [
        {
            title: 'Comida Rápida',
            screen: 'ComidaRapidaScreen',
            description: 'Descripción de comida rápida',
            leftIcon: 'hamburger',
        },
        {
            title: 'Locales',
            screen: 'LocalesScreen',
            description: 'Descripción de locales',
            leftIcon: 'store',
        },
        {
            title: 'Buffet',
            screen: 'BuffetScreen',
            description: 'Descripción de buffet',
            leftIcon: 'food-fork-drink',
        },
    ];

    return (
        <View style={styles.container}>
            {categories.map((category) => (
                <Card
                    key={category.title}
                    style={styles.card}
                    onPress={() => navigation.navigate(category.screen)}
                >
                    <Card.Content>
                        <List.Item
                            title={category.title}
                            titleStyle={styles.title}
                            descriptionStyle={styles.description}
                            left={() => (
                                <View style={styles.iconContainer}>
                                    <IconButton
                                        icon={category.leftIcon}
                                        color='#969696'
                                        size={60}
                                        style={styles.icon}
                                    />
                                </View>
                            )}
                            right={() => (
                                <List.Icon
                                    icon='chevron-right'
                                    color='#000'
                                    style={styles.flecha}
                                />
                            )}
                        />
                    </Card.Content>
                </Card>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E0E0E0',
        padding: 16,
    },
    card: {
        marginBottom: 15,
        width: '100%', // Ocupa el ancho completo
        height: 80,
    },
    iconContainer: {
        backgroundColor: '#DAE4F1',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        width: 80,
        height: 80,
        justifyContent: 'center',
        marginRight: 5,
        marginTop: -30,
        marginLeft: -20,
        paddingVertical: 5,
    },
    icon: {
        start: -4,
    },
    flecha: {
        start: 25,
        marginTop: -25,
    },
    title: {
        color: '#000',
        marginTop: -35,
        fontWeight: 'bold',
    },
    description: {
        color: '#E0E0E0',
    },
});

export default StackCategorias;
