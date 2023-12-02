import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from './StarRating';

const PlaceDetailComponent = ({ route, navigation }) => {
    const place = route.params?.place || {};
    const [rating, setRating] = useState(0);

    const getRatingFromStorage = async () => {
        try {
            const storedRating = await AsyncStorage.getItem(
                `rating_${place.id}`
            );
            console.log('Stored Rating:', storedRating);

            if (storedRating !== null) {
                setRating(parseInt(storedRating, 10));
            }
        } catch (error) {
            console.error('Error retrieving rating from storage:', error);
        }
    };

    const saveRatingToStorage = async (newRating) => {
        try {
            await AsyncStorage.setItem(
                `rating_${place.id}`,
                newRating.toString()
            );
        } catch (error) {
            console.error('Error saving rating to storage:', error);
        }
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        saveRatingToStorage(newRating); // Guardar el nuevo valor al cambiar la calificación
    };

    const handleResetRating = () => {
        setRating(0);
        saveRatingToStorage(0);
    };

    useEffect(() => {
        // Al entrar al detalle, actualizamos la calificación
        getRatingFromStorage();
        // También puedes hacer otras cosas al entrar al detalle si es necesario
    }, [navigation, place.id]); // Agrega place.id como dependencia

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.iconContainer}>
                    <IconButton icon='hamburger' size={90} disabled />
                </View>

                <Text style={[styles.text, styles.boldText]}>{place.name}</Text>
                <Text style={styles.text}>{place.detail}</Text>

                {/* Componente de estrellas */}
                <StarRating
                    rating={rating}
                    onRatingChange={handleRatingChange}
                    onReset={handleResetRating}
                />
                <Text
                    style={styles.text}
                >{`Número de reseñas: ${place.reviewCount}`}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        margin: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    iconContainer: {
        backgroundColor: '#DAE4F1',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        width: 355,
        height: 150,
        marginTop: -16,
        padding: 16,
        marginBottom: 16,
    },
    text: {
        marginBottom: 8,
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default PlaceDetailComponent;
