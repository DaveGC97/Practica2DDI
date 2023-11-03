import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { List } from 'react-native-paper';
import { map } from 'lodash';
import { accountMenu } from '../../components/Menu/Menu.data';
import { useNavigation } from '@react-navigation/native';

export default function Menu() {
    const navigation = useNavigation();
    return (
        <List.Section>
            <List.Subheader style={styles.subheader}>Mi cuenta</List.Subheader>
            {map(accountMenu, (menu) => (
                // {console.log(menu.screen)}
                <List.Item
                    key={menu.title}
                    title={menu.title}
                    description={menu.description}
                    titleStyle={styles.title}
                    descriptionStyle={styles.description}
                    left={(props) => (
                        <List.Icon
                            {...props}
                            icon={menu.leftIcon}
                            color='#79B547'
                        />
                    )}
                    onPress={() => navigation.navigate(menu.screen)}
                />
            ))}
        </List.Section>
    );
}

const styles = StyleSheet.create({
    subheader: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#79B547',
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
    },
    description: {
        color: '#fff',
    },
});
