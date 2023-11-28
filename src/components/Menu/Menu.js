import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Card, IconButton } from 'react-native-paper';
import { map } from 'lodash';
import { accountMenu } from '../../components/Menu/Menu.data';
import { useNavigation } from '@react-navigation/native';

export default function Menu() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {map(accountMenu, (menu) => (
                <Card
                    key={menu.title}
                    style={styles.card}
                    onPress={() => navigation.navigate(menu.screen)}
                >
                    <Card.Content>
                        <List.Item
                            title={menu.title}
                            description={menu.description}
                            titleStyle={styles.title}
                            descriptionStyle={styles.description}
                            left={() => (
                                <View style={styles.iconContainer}>
                                    <IconButton
                                        icon={menu.leftIcon}
                                        color='#969696' // Cambiar a "edit" si es necesario
                                        size={60}
                                        style={styles.icon}
                                    />
                                </View>
                            )}
                            right={() => (
                                <List.Icon
                                    style={styles.flecha}
                                    icon='chevron-right'
                                    color='#000'
                                />
                            )}
                        />
                    </Card.Content>
                </Card>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 2,
        paddingBottom: 90,
    },
    card: {
        marginBottom: 15,
        width: 350, // Ajusta el ancho según sea necesario
        height: 80, // Ajusta la altura según sea necesario,
    },
    iconContainer: {
        backgroundColor: '#DAE4F1',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        width: 80,
        height: 80,
        justifyContent: 'center',
        marginRight: 5,
        marginTop: -30,
        marginLeft: -20,
        paddingVertical: 5, // Ajusta según sea necesario
    },
    icon: {
        start: -4,
    },
    flecha: {
        start: 25,
        marginTop: -25,
    },
    title: {
        color: '#000',
        marginTop: -35,
        fontWeight: 'bold',
    },
    description: {
        color: '#E0E0E0',
    },
});
