import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const PlaceDetailComponent = ({ route }) => {
    const place = route.params?.place || {};

    return (
        <View style={styles.card}>
            {/* Contenedor del icono con fondo color #DAE4F1 */}
            <View style={styles.iconContainer}>
                <IconButton icon='hamburger' size={90} color='black' disabled />
            </View>

            <Text style={[styles.text, styles.boldText]}>{place.name}</Text>
            <Text style={styles.text}>{place.detail}</Text>
            <Text style={styles.text}>
                Número de reseñas: {place.reviewCount}
            </Text>
            {/* Agrega más detalles según sea necesario */}
        </View>
    );
};

const styles = StyleSheet.create({
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
