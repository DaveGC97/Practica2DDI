import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from '../utils/constants';
import { includes, pull } from 'lodash';

// función para traer favoritos
export const getFavoriteApi = async () => {
    try {
        const response = await AsyncStorage.getItem(ENV.STORAGE.FAVORITE);
        return response ? JSON.parse(response) : [];
    } catch (error) {
        console.log(error);
    }
};

// función para añadir a favoritos
export const addFavoriteApi = async (id) => {
    try {
        const favorites = await getFavoriteApi();
        favorites.push(id);
        await AsyncStorage.setItem(
            ENV.STORAGE.FAVORITE,
            JSON.stringify(favorites)
        );
    } catch (error) {
        console.log(error);
    }
};

// función para validar si un personaje esta en favoritos o no
export const isFavoriteApi = async (id) => {
    try {
        const favorites = await getFavoriteApi();
        return includes(favorites, id);
    } catch (error) {
        console.log(error);
        return false;
    }
};

// función que elimina un personaje de favoritos
export const removeFavoriteApi = async (id) => {
    try {
        const favorites = await getFavoriteApi();
        const newFavorites = pull(favorites, id);
        await AsyncStorage.setItem(
            ENV.STORAGE.FAVORITE,
            JSON.stringify(newFavorites)
        );
    } catch (error) {
        console.log(error);
    }
};

// función que elimina los favoritos del storage
export const removeStorageFavoriteApi = async () => {
    try {
        // const favorites = await getFavoriteApi();
        // elimina los datos en favoritos
        await AsyncStorage.removeItem(ENV.STORAGE.FAVORITE);
    } catch (error) {
        console.log(error);
    }
};

export const addAllFavoritosApi = async (favorites) => {
    try {
        await AsyncStorage.setItem(
            ENV.STORAGE.FAVORITE,
            JSON.stringify(favorites)
        );
    } catch (error) {
        console.log(error);
    }
};
