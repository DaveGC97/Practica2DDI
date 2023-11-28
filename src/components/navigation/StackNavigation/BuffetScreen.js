import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BuffetScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Screen de Buffet</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0E0E0', // Fondo de color #E0E0E0
    },
});

export default BuffetScreen;
