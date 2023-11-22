import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './TableDetail.styles';
import { Row, Rows, Table } from 'react-native-table-component';
import StarRating from './StarRating';
import CommentBox from './CommentBox';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TableDetail(props) {
    const { params } = props;
    const [rating, setRating] = useState(0);

    // usamos la siguiente constante para almacenar los comentarios en el componente
    const [allComments, setAllComments] = useState([]);

    const tableHead = ['Estado', 'Especie', 'Género'];
    const tableData = [[params.status, params.species, params.gender]];

    useEffect(() => {
        // Carga los comentarios almacenados en AsyncStorage al iniciar el componente
        loadComments();
    }, []); // Se ejecuta solo al montar el componente

    const onStarPress = (ratingValue) => {
        setRating(ratingValue);
        console.log(ratingValue);
    };

    const submitComment = async (comment) => {
        // Agrega el comentario al arreglo de comentarios del componente TableDetail
        setAllComments([...allComments, comment]);

        // Guarda los comentarios en AsyncStorage
        await AsyncStorage.setItem('comments', JSON.stringify(allComments));
    };

    const loadComments = async () => {
        // Carga los comentarios almacenados en AsyncStorage
        const storedComments = await AsyncStorage.getItem('comments');
        if (storedComments) {
            setAllComments(JSON.parse(storedComments));
        }
    };

    return (
        <View style={styles.container}>
            <Table borderStyle={styles.border}>
                <Row
                    data={tableHead}
                    style={styles.head}
                    textStyle={styles.headText}
                />
                <Rows data={tableData} textStyle={styles.rowText} />
            </Table>

            <View style={styles.ratingContainer}>
                <Text>Calificación: {rating}</Text>
                <StarRating rating={rating} onPress={onStarPress} />
            </View>

            {/* Agrega el componente de comentarios */}
            <CommentBox onCommentSubmit={submitComment} />

            {/* Muestra todos los comentarios */}
            {allComments.map((comment, index) => (
                <Text style={{ color: 'white' }} key={index}>
                    {comment}
                </Text>
            ))}
        </View>
    );
}
