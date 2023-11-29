import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Stack = createNativeStackNavigator();

const StackMapa = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='MapaScreen'
                component={MapaScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

const MapaScreen = () => {
    const [places, setPlaces] = useState([]);

    return (
        <View style={{ flex: 1 }}>
            <GooglePlacesAutocomplete
                placeholder='Search'
                onPress={(data, details = null) => {
                    console.log('Pressed', data, details);

                    fetch(
                        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${details.place_id}&key=AIzaSyAxT9y1e41YVMLKKluEKxjS2ctQ1PzlAEw`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            console.log('Details:', data);
                        })
                        .catch((error) =>
                            console.error('Error al obtener detalles:', error)
                        );

                    // Almacena los lugares en el estado
                    setPlaces([
                        {
                            name: data.description,
                            coordinates: details.geometry.location,
                            place_id: details.place_id,
                        },
                        ...places,
                    ]);
                }}
                query={{
                    key: 'AIzaSyAxT9y1e41YVMLKKluEKxjS2ctQ1PzlAEw',
                    language: 'es',
                }}
                styles={autocompleteStyles}
                fetchDetails={true}
                enablePoweredByContainer={false}
                textInputProps={{
                    placeholderTextColor: '#333',
                    autoCapitalize: 'none',
                    autoCorrect: false,
                }}
            />

            {/* Mapa */}
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 20.5881, // Coordenadas para Querétaro
                    longitude: -100.3899,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {/* Marcadores para cada lugar */}
                {places.map((place) => (
                    <Marker
                        key={place.place_id}
                        coordinate={place.coordinates}
                        title={place.name}
                        description='Lugar de búsqueda'
                    />
                ))}
            </MapView>
        </View>
    );
};

const autocompleteStyles = StyleSheet.create({
    container: {
        flex: 0,
    },
    textInput: {
        height: 50,
        color: '#5d5d5d',
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    predefinedPlacesDescription: {
        color: '#1faadb',
    },
});

export default StackMapa;
