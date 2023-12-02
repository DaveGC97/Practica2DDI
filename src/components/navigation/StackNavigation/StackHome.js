import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Image, View, Text, ScrollView } from 'react-native';
import StackAccount from '../StackNavigation/StackAccount';
import axios from 'axios';
import * as Location from 'expo-location';

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

const HomeScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Obtén la ubicación actual al cargar la pantalla
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      // Solicita permisos de ubicación
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.warn('Permiso de ubicación denegado');
        return;
      }

      // Obtiene la ubicación actual
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      // Si tienes la ubicación actual, realiza la solicitud de lugares cercanos
      if (location) {
        getNearbyRestaurants(location.coords);
      }
    } catch (error) {
      console.error('Error al obtener la ubicación actual:', error);
    }
  };

  const getNearbyRestaurants = async (location) => {
    try {
      const apiKey = 'AIzaSyAxT9y1e41YVMLKKluEKxjS2ctQ1PzlAEw';
      const radius = 5000; // Radio de búsqueda en metros
      const type = 'restaurant'; 

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${radius}&type=${type}&key=${apiKey}`
      );

      if (response.data && response.data.results) {
        setRestaurants(response.data.results);
      }
    } catch (error) {
      console.error('Error al obtener restaurantes:', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#E0E0E0', // Color de fondo principal
      }}
    >
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
          Restaurantes Cercanos
        </Text>

        {restaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.place_id}
            onPress={() => {
              // Agrega la lógica para navegar a la pantalla de detalles del restaurante
              // Pasando la información del restaurante como parámetro, por ejemplo:
              navigation.navigate('DetallesRestaurante', { restaurant });
            }}
          >
            <View style={{ marginBottom: 16 }}>
              <Image
                source={{ uri: restaurant.icon }}
                style={{ width: 50, height: 50, marginRight: 10 }}
              />
              <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  {restaurant.name}
                </Text>
                <Text>{restaurant.vicinity}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default StackHome;
