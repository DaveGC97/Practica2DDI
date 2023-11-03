import { View, Text, ImageBackground } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-paper';
import { styles } from './CharacterDetail.styles';
import TableDetail from '../../components/TableDetail/TableDetail';
import Favoritos from '../../components/Favoritos/Favoritos';

export default function CharacterDetail(props) {
    const {
        navigation,
        route: { params },
    } = props;
    console.log(params.id, params.name);

    return (
        <ImageBackground source={require('../../assets/rick4.png')}>
            <View style={styles.container}>
                <Avatar.Image
                    size={250}
                    source={{ uri: params.image }}
                    style={styles.image}
                />
                <View style={styles.containerfav}>
                    <Text style={styles.title}>{params.name}</Text>
                    <Favoritos id={params.id} />
                </View>
                <TableDetail params={params} />
            </View>
        </ImageBackground>
    );
}
