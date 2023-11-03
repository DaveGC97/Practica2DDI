import React, { useState, useEffect, createContext, useCallback } from 'react';
import { storageController } from '../api/token';
import { userController } from '../api/user';
import { tokenExpired } from '../utils/tokenExpired';
import { addAllFavoritosApi, removeStorageFavoriteApi } from '../api/favoritos';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const { children } = props;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSession();
    }, []);

    const getSession = async () => {
        const token = await storageController.getToken();
        if (!token) {
            logout();
            setLoading(false);
            return;
        }
        if (tokenExpired(token)) {
            logout();
        } else {
            login(token);
        }
    };

    const login = async (token) => {
        try {
            // console.log('Obteniendo', token);
            await storageController.setToken(token);
            const response = await userController.getMe(token);
            if (response.favoritos) {
                await addAllFavoritosApi(response.favoritos);
            }
            setUser(response);
            setLoading(false);
            // console.log('User', response);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await storageController.removeToken();
            await removeStorageFavoriteApi();
            setUser(null);
            setLoading(false);
        } catch (error) {
            console.log('(AuthContext) logout', error);
            setLoading(false);
        }
    };

    const upDateUser = useCallback((key, value) => {
        setUser((prevUser) => ({ ...prevUser, [key]: value }));
    }, []);

    const data = {
        user,
        login,
        logout,
        upDateUser,
    };
    if (loading) return null;

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
