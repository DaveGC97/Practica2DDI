import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const Stack = createNativeStackNavigator();

const StackMapa = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MapaScreen"
        component={MapaScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MapaScreen = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapViewRef = useRef(null);

  // Función para obtener la ubicación actual
  const getCurrentLocation = async () => {
    try {
      // Solicita permisos de ubicación
      const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== 'granted') {
        console.warn('Permiso de ubicación denegado');
        return;
      }

      // Obtiene la ubicación actual
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    } catch (error) {
      console.error('Error al obtener la ubicación actual:', error);
    }
  };

  useEffect(() => {
    // Obtén la ubicación actual al cargar la pantalla
    getCurrentLocation();
  }, []);

  const handlePlaceSelection = (data, details = null) => {
    console.log('Pressed', data, details);
    const selectedCoordinates = details?.geometry?.location;

    setSelectedPlace({
      name: data.description,
      coordinates: selectedCoordinates,
      place_id: details?.place_id,
    });

    // Centrar el mapa en las coordenadas del lugar seleccionado
    if (selectedCoordinates && mapViewRef.current) {
      mapViewRef.current.animateToRegion({
        latitude: selectedCoordinates.lat,
        longitude: selectedCoordinates.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder="Busca un lugar..."
        onPress={handlePlaceSelection}
        query={{
          key: 'AIzaSyAxT9y1e41YVMLKKluEKxjS2ctQ1PzlAEw',
          language: 'es',
          location: `${currentLocation?.latitude},${currentLocation?.longitude}`,
          radius: 10000,
          origin: `${currentLocation?.latitude},${currentLocation?.longitude}`,
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

      <MapView
        ref={mapViewRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation?.latitude || 20.5881,
          longitude: currentLocation?.longitude || -100.3899,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Ubicación Actual"
            description="Tu ubicación actual"
          />
        )}

        {selectedPlace && selectedPlace.coordinates && (
          <Marker
            coordinate={{
              latitude: selectedPlace.coordinates.lat,
              longitude: selectedPlace.coordinates.lng,
            }}
            title={selectedPlace.name}
            description="Lugar de búsqueda"
          />
        )}
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
