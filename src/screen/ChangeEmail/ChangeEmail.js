import { View, Text } from 'react-native';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { Button, TextInput } from 'react-native-paper';
import { globalStyles } from '../../styles';
import * as Yup from 'yup';
import Toast from 'react-native-root-toast';
import { userController } from '../../api/user';

export default function ChangeEmail() {
    const { user, upDateUser } = useAuth();
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: {
            email: user.email,
        },
        validationSchema: Yup.object({
            email: Yup.string().email(true).required(true),
        }),
        validateOnChange: false,
        onSubmit: async (formData) => {
            try {
                await userController.actualizaUser(user.id, formData);
                upDateUser('email', formData.email);
                navigation.goBack();
                Toast.show('Datos actualizados con exito.', {
                    position: Toast.positions.CENTER,
                });
            } catch (error) {
                Toast.show('Datos incorrectos.', {
                    position: Toast.positions.CENTER,
                });
            }
        },
    });

    return (
        <View style={{ marginTop: 80 }}>
            <TextInput
                label='Correo Electrónico'
                style={globalStyles.form.input}
                autoCapitalize='none'
                onChangeText={(text) => formik.setFieldValue('email', text)}
                value={formik.values.email}
                error={formik.errors.email}
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
