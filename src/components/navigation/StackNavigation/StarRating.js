import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({ rating, onRatingChange, onReset }) => {
    const stars = [1, 2, 3, 4, 5];

    const handleStarPress = (selectedRating) => {
        onRatingChange(selectedRating);
    };

    const renderStars = () => {
        return stars.map((star) => (
            <TouchableOpacity
                key={star}
                onPress={() => handleStarPress(star)}
                style={styles.starContainer}
            >
                <Icon
                    name={rating >= star ? 'star' : 'star-o'}
                    size={30}
                    color={rating >= star ? '#FFD700' : '#808080'}
                />
            </TouchableOpacity>
        ));
    };

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Califica tu experiencia!</Text>
            <View style={styles.starRatingContainer}>{renderStars()}</View>
            <View style={styles.buttonContainer}>
                <Button title='Restablecer' onPress={onReset} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        width: 300,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    starRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    starContainer: {
        padding: 5,
    },
    buttonContainer: {
        marginTop: 10,
    },
});

export default StarRating;
