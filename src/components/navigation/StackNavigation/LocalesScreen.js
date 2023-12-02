import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const LocalesScreen = ({ route }) => {
    const [queretaroLocation, setQueretaroLocation] = useState({
        latitude: 20.5881, 
        longitude: -100.3899, 
    });
    const [localPlaces, setLocalPlaces] = useState([]);

    useEffect(() => {
        getNearbyLocalPlaces(queretaroLocation);
    }, []);

    const getNearbyLocalPlaces = async (location) => {
        try {
            const apiKey = 'AIzaSyAxT9y1e41YVMLKKluEKxjS2ctQ1PzlAEw';
            const radius = 5000; 
            const type = 'restaurant';
            const keywords = ['taqueria', 'gorditas', 'tortas', 'garnachas'];

            // Crea una promesa para realizar varias búsquedas con diferentes palabras clave
            const requests = keywords.map(async (keyword) => {
                const response = await axios.get(
                    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${radius}&type=${type}&keyword=${keyword}&key=${apiKey}`
                );
                return response.data.results;
            });

            // Espera a que todas las búsquedas estén completas
            const results = await Promise.all(requests);

            // Combina los resultados en una sola lista
            const combinedResults = results.reduce((acc, result) => acc.concat(result), []);

            // Elimina duplicados
            const uniqueResults = Array.from(new Set(combinedResults.map((place) => place.place_id))).map(
                (placeId) => combinedResults.find((place) => place.place_id === placeId)
            );

            setLocalPlaces(uniqueResults);
        } catch (error) {
            console.error('Error al obtener lugares locales:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>

            {localPlaces.map((place) => (
          <TouchableOpacity
          key={place.place_id}
          onPress={() => {
            // Agrega la lógica para navegar a la pantalla de detalles del restaurante
            // Pasando la información del restaurante como parámetro, por ejemplo:
            navigation.navigate('DetallesRestaurante', { place });
          }}
        >
          <View style={{ marginBottom: 16 }}>
            <Image
              source={{ uri: place.icon }}
              style={{ width: 50, height: 50, marginRight: 10 }}
            />
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                {place.name}
              </Text>
              <Text>{place.vicinity}</Text>
            </View>
          </View>
        </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default LocalesScreen;
