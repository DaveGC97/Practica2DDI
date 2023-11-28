import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    title: {
        fontSize: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100, // La mitad del ancho y alto para hacerlo circular
        alignSelf: 'center',
        marginBottom: 20,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
});
