import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { globalStyles } from '../../styles';
import { userController } from '../../api/user';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importa el icono

export default function ChangeName() {
    const { user, upDateUser } = useAuth();
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: {
            firstname: user.firstname || '',
            lastname: user.lastname || '',
        },
        validationSchema: Yup.object({
            firstname: Yup.string().required(true),
            lastname: Yup.string().required(true),
        }),
        validateOnChange: false,
        onSubmit: async (formData) => {
            try {
                await userController.actualizaUser(user.id, formData);
                upDateUser('firstname', formData.firstname);
                upDateUser('lastname', formData.lastname);
                navigation.goBack();
                Toast.show('Datos actualizados con éxito.', {
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
        <View style={styles.container}>
            {/* Sección del icono y nombre */}
            <View style={styles.iconContainer}>
                <Icon
                    marginTop={-35}
                    name='account'
                    size={210}
                    color='#969696'
                />
            </View>

            {/* Formulario para cambiar el nombre */}
            <View style={{ marginTop: 1 }}>
                <Text style={styles.userName}>Nombre</Text>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize='none'
                    onChangeText={(text) =>
                        formik.setFieldValue('firstname', text)
                    }
                    value={formik.values.firstname}
                    error={formik.errors.firstname}
                    underlineColorAndroid='transparent' // Elimina la línea inferior en Android
                />
                <Text style={styles.userName}>Apellido</Text>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize='none'
                    onChangeText={(text) =>
                        formik.setFieldValue('lastname', text)
                    }
                    value={formik.values.lastname}
                    error={formik.errors.lastname}
                    underlineColorAndroid='transparent' // Elimina la línea inferior en Android
                />
                <Button
                    mode='contained'
                    style={styles.boton}
                    onPress={formik.handleSubmit}
                    loading={formik.isSubmitting}
                >
                    Guardar Cambios
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        paddingHorizontal: 30,
    },
    iconContainer: {
        alignItems: 'center',
    },
    textInput: {
        backgroundColor: '#fff',
        borderRadius: 7,
        color: '#969696',
        fontSize: 12,
        padding: 0,
        borderWidth: 0.4,
        marginBottom: 10,
    },
    userName: {
        marginTop: 10,
        fontSize: 13,
    },
    boton: {
        marginVertical: 17,
        padding: 5,
    },
});
