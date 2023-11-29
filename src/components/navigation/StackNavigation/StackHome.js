import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    TouchableOpacity,
    Image,
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import StackAccount from '../StackNavigation/StackAccount';
import { getPlaces, getPlaceDetails } from '../../../api/ApiGoogle';
import { List, Card } from 'react-native-paper';

const StackHome = ({ navigation }) => {
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
                name='Home'
                component={HomeScreen}
                options={{
                    headerTitle: '', // Esto quita el texto "Home"
                }}
            />
        </Stack.Navigator>
    );
};

const HomeScreen = () => {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const location = '20.65367776367199, -100.40503298430045';
        const radius = 1000;
        const types = 'restaurant';
        const query = 'food';
        const region = 'mx:qro';
        const maxResults = 10;

        const fetchData = async () => {
            try {
                const response = await getPlaces(
                    location,
                    radius,
                    types,
                    query,
                    region,
                    maxResults
                );

                const detailedPlaces = await Promise.all(
                    response.results.map(async (place, index) => {
                        const details = await getPlaceDetails(place.place_id);
                        return {
                            id: `${place.place_id}_${index}`,
                            name: place.name,
                            detail: details.formatted_address,
                            reviewCount: details.user_ratings_total,
                        };
                    })
                );

                setPlaces(detailedPlaces);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {places.map((place) => (
                <Card key={place.id} style={styles.card}>
                    <Card.Content style={styles.cardContent}>
                        <View style={styles.iconContainer}>
                            <List.Icon
                                icon='hamburger'
                                color='#000'
                                style={styles.hamburgerIcon}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <List.Item
                                title={place.name}
                                titleStyle={styles.title}
                                descriptionStyle={styles.description}
                                description={`Reseñas: ${place.reviewCount}`}
                            />
                            <Text style={styles.detail}>{place.detail}</Text>
                        </View>
                        <List.Icon
                            icon='chevron-right'
                            color='#000'
                            style={styles.rightArrowIcon}
                        />
                    </Card.Content>
                </Card>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        padding: 14,
    },
    card: {
        marginBottom: 15,
        height: 160,
        width: '100%',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: '#DAE4F1',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        width: 80,
        height: 160,
        justifyContent: 'center',
        marginRight: 5,
        marginTop: -16,
        marginLeft: -20,
        paddingVertical: 5,
    },
    hamburgerIcon: {
        color: 'white',
    },
    textContainer: {
        flex: 1,
        marginTop: -30,
    },
    title: {
        color: '#000',
        fontWeight: 'bold',
    },
    description: {
        color: '#000',
    },
    detail: {
        color: '#000',
    },
    rightArrowIcon: {
        marginLeft: 'auto',
    },
});

export default StackHome;
