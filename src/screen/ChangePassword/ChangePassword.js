import { View, Text } from 'react-native';
import React from 'react';
import * as Yup from 'yup';
import { globalStyles } from '../../styles';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { userController } from '../../api/user';
import Toast from 'react-native-root-toast';
import { Button, TextInput } from 'react-native-paper';

export default function ChangePassword() {
    const { user, upDateUser } = useAuth();
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: {
            password: user.password,
        },
        validationSchema: Yup.object({
            password: Yup.string().required(true).min(8, true),
        }),
        validateOnChange: false,
        onSubmit: async (formData) => {
            try {
                await userController.actualizaUser(user.id, formData);

                navigation.goBack();
                Toast.show('Datos actualizados con exito.', {
                    position: Toast.positions.CENTER,
                });
            } catch (error) {
                // console.log(error)
                Toast.show('Datos incorrectos.', {
                    position: Toast.positions.CENTER,
                });
            }
        },
    });

    return (
        <View style={{ marginTop: 80 }}>
            <TextInput
                label='Contraseña'
                style={globalStyles.form.input}
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue('password', text)}
                value={formik.values.password}
                error={formik.errors.password}
            />
            <Button
                mode='contained'
                style={globalStyles.form.buttonSubmit}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            >
                Guardar
            </Button>
        </View>
    );
}
