import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ImageBackground,
} from 'react-native';

export default function Card(props) {
    const { characters } = props;
    const navigation = useNavigation();

    const goToPersonaje = () => {
        navigation.navigate('Detail', {
            id: characters.id,
            name: characters.name,
            gender: characters.gender,
            species: characters.species,
            status: characters.status,
            image: characters.image,
        });
    };

    return (
        <TouchableOpacity onPress={goToPersonaje}>
            <View style={styles.card}>
                <View style={styles.content}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>
                            Nombre: {characters.name}
                        </Text>
                        <Text style={styles.info}>
                            Género: {characters.gender}
                        </Text>
                        <Text style={styles.info}>
                            Especie: {characters.species}
                        </Text>
                        <Text style={styles.info}>
                            Estado: {characters.status}
                        </Text>
                    </View>
                    <Image
                        style={styles.imagen}
                        source={{ uri: characters.image }}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row', // Cambiamos a fila para que la imagen esté a la derecha
        justifyContent: 'space-between', // Espacio entre la información y la imagen
        alignItems: 'center', // Alineación vertical centrada
        padding: 16,
        backgroundColor: '#056F14',
        borderWidth: 1,
        borderColor: '#222E24',
        borderRadius: 35,
        marginEnd: 15,
        marginStart: 15,
        marginTop: 15,
    },
    content: {
        flexDirection: 'row', // Filas para la información y la imagen
        alignItems: 'center', // Alineación vertical centrada
    },
    infoContainer: {
        flex: 1, // Toma todo el espacio disponible
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#D0E7D3',
    },
    info: {
        fontSize: 16,
        color: '#D0E7D3',
    },
    imagen: {
        width: 100,
        height: 100,
        borderRadius: 40,
    },
});
