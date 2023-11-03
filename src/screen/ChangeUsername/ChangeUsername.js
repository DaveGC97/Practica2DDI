import { View, Text } from 'react-native';
import React from 'react';
import * as Yup from 'yup';
import { globalStyles } from '../../styles';
import { Button, TextInput } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { userController } from '../../api/user';
import Toast from 'react-native-root-toast';

export default function ChangeUsername() {
    const { user, upDateUser } = useAuth();
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: {
            username: user.username,
        },
        validationSchema: Yup.object({
            username: Yup.string().required(true),
        }),
        validateOnChange: false,
        onSubmit: async (formData) => {
            try {
                await userController.actualizaUser(user.id, formData);
                upDateUser('username', formData.username);
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
                label='Nombre de usuario'
                style={globalStyles.form.input}
                autoCapitalize='none'
                onChangeText={(text) => formik.setFieldValue('username', text)}
                value={formik.values.username}
                error={formik.errors.username}
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
