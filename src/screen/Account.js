import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Avatar, Button, IconButton } from 'react-native-paper';
import { useAuth } from '../hooks/useAuth';
import { userController } from '../api/user';
import { getFavoriteApi } from '../api/favoritos';
import { useNavigation } from '@react-navigation/native';

export default function Account() {
    const { logout, user, upDateUser } = useAuth();
    console.log('Datos del usuario:', user);

    const navigation = useNavigation(); // Obtén el objeto de navegación
    const navigateToChangeProfile = () => {
        // Navegar a la página de cambios de perfil
        navigation.navigate('ChangeProfile');
    };

    const logoutAlert = () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Estás seguro de que deseas cerrar sesión?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Cerrar sesión',
                    onPress: async () => {
                        const pjFavoritos = await getFavoriteApi();
                        const data = {
                            favoritos: pjFavoritos,
                        };
                        await userController.actualizaUser(user.id, data);
                        upDateUser('favoritos', pjFavoritos);
                        logout();
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <View style={styles.header}>
                        <Image
                            source={require('../assets/person1.jpeg')}
                            style={styles.profileImage}
                        />
                    </View>
                    <Text style={styles.title}>Bienvenido</Text>
                    <Text style={styles.name}>
                        {user.firstname && user.lastname
                            ? `${user.firstname} ${user.lastname}`
                            : user.email}
                        <IconButton
                            icon='open-in-new' // Cambiar a "edit" si es necesario
                            size={22}
                            onPress={navigateToChangeProfile}
                        />
                    </Text>

                    <Button
                        mode='contained'
                        onPress={logoutAlert}
                        style={styles.button}
                    >
                        Cerrar sesión
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0E0E0',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    title: {
        color: '#000',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    mainContainer: {
        flex: 1,
        paddingTop: 15,
        marginHorizontal: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000',
        textAlign: 'center',
    },
    button: {
        marginBottom: 20,
        marginTop: 20,
    },
});
