import { View, Text } from 'react-native';
import React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { styles } from './Register.styles';
import { globalStyles } from '../../../styles';
import { useFormik } from 'formik';
import { authApi } from '../../../api/auth.js';
import * as Yup from 'yup';

export default function Register(props) {
    const { cambioAuth } = props;

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            repeatPassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email(true).required(true),
            username: Yup.string().required(true),
            password: Yup.string().required(true),
            repeatPassword: Yup.string().required(true),
        }),
        validateOnChange: false,
        onSubmit: async (formData) => {
            const { email, username, password } = formData;
            try {
                const response = await authApi.register(
                    email,
                    username,
                    password
                );
                console.log('response', response);
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <View style={styles.container}>
            <TextInput
                label='Correo electronico'
                style={styles.input}
                autoCapitalize='none'
                onChangeText={(text) => formik.setFieldValue('email', text)}
                value={formik.values.email}
                error={formik.errors.email}
            />
            <TextInput
                label='Nombre de usuario'
                style={styles.input}
                autoCapitalize='none'
                onChangeText={(text) => formik.setFieldValue('username', text)}
                value={formik.values.username}
                error={formik.errors.username}
            />
            <TextInput
                label='Contraseña'
                style={styles.input}
                autoCapitalize='none'
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue('password', text)}
                value={formik.values.password}
                error={formik.errors.password}
            />

            <TextInput
                label='Repetir contraseña'
                style={styles.input}
                autoCapitalize='none'
                secureTextEntry
                onChangeText={(text) =>
                    formik.setFieldValue('repeatPassword', text)
                }
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
            />

            <Button
                mode='contained'
                style={{
                    ...globalStyles.form.buttonText,
                    width: 200,
                    backgroundColor: '#266E29',
                    alignSelf: 'center',
                }}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            >
                {' '}
                Registrarse{' '}
            </Button>
            <Button
                mode='text'
                style={globalStyles.form.buttonText}
                onPress={cambioAuth}
            >
                {' '}
                Iniciar sesión{' '}
            </Button>
        </View>
    );
}
