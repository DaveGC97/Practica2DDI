import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView , Image, TouchableOpacity} from 'react-native';
import axios from 'axios';

const BuffetScreen = () => {
    const [buffetPlaces, setBuffetPlaces] = useState([]);

    useEffect(() => {
        // Llama a la función para obtener lugares de buffet en Querétaro
        getBuffetPlaces();
    }, []);

    const getBuffetPlaces = async () => {
        try {
            const apiKey = 'AIzaSyAxT9y1e41YVMLKKluEKxjS2ctQ1PzlAEw';
            const city = 'Querétaro'; // Nombre de la ciudad

            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/place/textsearch/json?query=buffet+restaurants+in+${city}&key=${apiKey}`
            );

            if (response.data && response.data.results) {
                setBuffetPlaces(response.data.results);
            }
        } catch (error) {
            console.error('Error al obtener lugares de buffet:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>


            {buffetPlaces.map((place) => (
                <View key={place.place_id} style={styles.placeContainer}>
                    <Text style={styles.placeName}>{place.name}</Text>
                    <Text>{place.formatted_address}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#E0E0E0',
    },
    placeContainer: {
        marginBottom: 16,
    },
    placeName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default BuffetScreen;
