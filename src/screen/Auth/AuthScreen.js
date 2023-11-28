import {
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Platform,
    ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
import ButtonSocial from '../../components/Buttonsocial';
import LoginForm from '../../components/Auth/Login/LoginForm';
import Register from '../../components/Auth/Register/Register';
import { styles } from './AuthScreen.styles';

export default function AuthScreen() {
    const [showLogin, setShowLogin] = useState(false);
    const imageSource = require('../../assets/qlogo.png');

    const cambioAuth = () => {
        setShowLogin(!showLogin);
    };

    return (
        <ImageBackground
            source={require('../../assets/fondo.jpg')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Image source={imageSource} style={styles.image} />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'android' ? 'padding' : 'height'}
                >
                    {showLogin ? (
                        <Register cambioAuth={cambioAuth} />
                    ) : (
                        <LoginForm cambioAuth={cambioAuth} />
                    )}
                </KeyboardAvoidingView>
            </View>
        </ImageBackground>
    );
}
