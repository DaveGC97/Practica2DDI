import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { useAuth } from '../hooks/useAuth';
import Menu from '../components/Menu/Menu';
import { userController } from '../api/user';
import { getFavoriteApi } from '../api/favoritos';

export default function Account() {
    const { logout, user, upDateUser } = useAuth();
    console.log('Datos del usuario:', user);

    const logoutAlert = () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Estas seguro que deseas cerrar sesión?',
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
                        // console.log("Favoritos",pjFavoritos)
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
            {/* <View style={styles.header}>
        <Avatar.Image size={200} source={require('../assets/person1.jpeg')} />
      </View> */}
            <ScrollView>
                <View style={styles.mainContainer}>
                    <Text style={styles.title}>Bienvenido</Text>
                    <Text style={styles.name}>
                        {user.firstname && user.lastname
                            ? `${user.firstname} ${user.lastname}`
                            : user.email}
                    </Text>

                    <Menu />

                    <Button
                        mode='contained'
                        onPress={logoutAlert}
                        style={styles.button}
                    >
                        Cerrar sesión
                    </Button>
                </View>
            </ScrollView>
            {/* <View style={styles.footer}>

      </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    title: {
        color: '#79B547',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    mainContainer: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingTop: 15,
        marginHorizontal: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#79B547',
        textAlign: 'center',
    },
    button: {
        marginBottom: 20,
        marginTop: 20,
    },
});
