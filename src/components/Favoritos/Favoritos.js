import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IconButton } from 'react-native-paper';
import {
    addFavoriteApi,
    isFavoriteApi,
    removeFavoriteApi,
} from '../../api/favoritos';
export default function Favoritos(props) {
    const { id } = props;
    const [isFavorite, setIsFavorite] = useState(undefined);
    const [reloadFavorite, setReloadFavorite] = useState(false);
    console.log(isFavorite);

    useEffect(() => {
        (async () => {
            const response = await isFavoriteApi(id);
            if (response) setIsFavorite(true);
            else setIsFavorite(false);
        })();
    }, [id, reloadFavorite]);

    const onReloadFavorite = () => {
        setReloadFavorite((prev) => !prev);
    };

    const addFavoritos = async () => {
        try {
            await addFavoriteApi(id);
            onReloadFavorite();
        } catch (error) {
            console.log(error);
        }
    };

    const removeFavoritos = async () => {
        try {
            await removeFavoriteApi(id);
            onReloadFavorite();
        } catch (error) {
            console.log(error);
        }
    };

    const iconColor = isFavorite ? 'red' : 'white';
    return (
        <IconButton
            icon='heart'
            iconColor={iconColor}
            size={50}
            onPress={isFavorite ? removeFavoritos : addFavoritos}
        />
    );
}
