import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Card, List, IconButton } from 'react-native-paper';

const ComidaRapidaScreen = ({ navigation }) => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        getRestaurants();
    }, []);

    const getRestaurants = async () => {
        try {
            const apiKey = 'AIzaSyAxT9y1e41YVMLKKluEKxjS2ctQ1PzlAEw';
            const location = '20.5881,-100.3893'; 
            const radius = 5000;
            const type = 'restaurant';
            const keyword = 'comida rápida'; // Palabras clave relacionadas con comida rápida

            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&keyword=${keyword}&key=${apiKey}`
            );

            if (response.data && response.data.results) {
                setRestaurants(response.data.results);
            }
        } catch (error) {
            console.error('Error al obtener restaurantes de comida rápida:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {restaurants.map((restaurant) => (
                <TouchableOpacity
                    key={restaurant.place_id}
                    onPress={() => {
                        // Agrega la lógica para navegar a la pantalla de detalles del restaurante
                        // Pasando la información del restaurante como parámetro, por ejemplo:
                        navigation.navigate('DetallesRestaurante', { restaurant });
                    }}
                >
                    <Card style={styles.card}>
                        <Card.Content style={styles.cardContent}>
                            <List.Item
                                title={restaurant.name}
                                titleStyle={styles.title}
                                description={`${restaurant.vicinity}\n${restaurant.formatted_address}`}
                                descriptionStyle={styles.description}
                                left={() => (
                                    <View style={styles.iconContainer}>
                                        <Image
                                            source={{ uri: restaurant.icon }}
                                            style={{ width: 50, height: 50 }}
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
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#E0E0E0',
    },
    card: {
        marginBottom: 16,
        width: '100%', // Ocupa el ancho completo
    },
    cardContent: {
        paddingVertical: 0, // Ajusta el espacio vertical del card content
    },
    iconContainer: {
        backgroundColor: '#DAE4F1',
        borderRadius: 10,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center', // Centra el contenido en el icon container
        marginRight: 10, // Ajusta el espacio a la derecha del icon container
        marginBottom: 0, // Ajusta el espacio debajo del icon container
    },
    title: {
        color: '#000',
        fontWeight: 'bold',
        marginTop: -5, // Ajusta el espacio encima del título
    },
    description: {
        color: '#000',
        marginBottom: -5, // Ajusta el espacio debajo de la descripción
    },
    flecha: {
        start: 25,
        marginTop: -25,
    },
});

export default ComidaRapidaScreen;
