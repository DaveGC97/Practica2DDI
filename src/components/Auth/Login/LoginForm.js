import { View } from 'react-native';
import React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { styles } from './LoginForm.styles';
import { globalStyles } from '../../../styles';
import { useFormik } from 'formik';
import Toast from 'react-native-root-toast';
import { authApi } from '../../../api/auth.js';
import * as Yup from 'yup';
import { useAuth } from '../../../hooks/useAuth.js';

export default function LoginForm(props) {
    const { cambioAuth } = props;
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email(true).required(true),
            password: Yup.string().required(true),
        }),
        validateOnChange: false,
        onSubmit: async (formData) => {
            try {
                const { email, password } = formData;
                const response = await authApi.Login(email, password);
                login(response.jwt);
            } catch (error) {
                Toast.show('Usuario o contraseña incorrectas', {
                    position: Toast.positions.CENTER,
                });
            }
        },
    });

    return (
        <View style={styles.container}>
            <TextInput
                label='Correo electronico'
                style={{ ...styles.input, underlineColor: 'transparent' }}
                autoCapitalize='none'
                onChangeText={(text) => formik.setFieldValue('email', text)}
                value={formik.values.email}
                error={formik.errors.email}
            />
            <TextInput
                label='Contraseña'
                style={{ ...styles.input, underlineColor: 'transparent' }}
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue('password', text)}
                value={formik.values.password}
                error={formik.errors.password}
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
                Iniciar sesión{' '}
            </Button>
            <Button
                mode='text'
                style={globalStyles.form.buttonSubmit}
                onPress={cambioAuth}
            >
                {' '}
                Crear cuenta{' '}
            </Button>
        </View>
    );
}
