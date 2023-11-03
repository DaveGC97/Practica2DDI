import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'rgba(37, 139, 197, 1)',
        //   alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    title: {
        fontSize: 20,
    },
    image: {
        width: 200,
        height: 250,
        // borderRadius: 15,
        alignSelf: 'center',
        marginBottom: 20,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        // marginTop: 25
    },
});
