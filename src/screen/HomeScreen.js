import { Text, SafeAreaView, FlatList } from 'react-native';
import React from 'react';
import Card from '../components/Card';
import { ActivityIndicator } from 'react-native-paper';

export default function HomeScreen(props) {
    const { characters, loadMoreData, nextUrl } = props;
    //console.log('Characters', characters);

    const loadMore = () => {
        if (nextUrl) {
            loadMoreData();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Personaje</Text>
            <FlatList
                style={{ backgroundColor: '#E0E0E0' }}
                data={characters}
                showsVerticalScrollIndicator={false}
                keyExtractor={(characters) => String(characters.id)}
                renderItem={({ item }) => <Card characters={item} />}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
                ListFooterComponent={
                    nextUrl && (
                        <ActivityIndicator
                            style={styles.spiner}
                            size='large'
                            color='#798543'
                        />
                    )
                }
            />
        </SafeAreaView>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'green',
        fontSize: 30, // Elige el tamaño de fuente que desees
    },
    spiner: {
        marginTop: 10,
        marginBottom: 50,
    },
};
