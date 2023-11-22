import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Menu from '../components/Menu/Menu';

export default function ChangeProfile() {
    return (
        <View style={styles.container}>
            <Menu />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
