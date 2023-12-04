import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    ScrollView,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from './StarRating';

const PlaceDetailComponent = ({ route, navigation }) => {
    const place = route.params?.place || {};
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const getRatingFromStorage = async () => {
        try {
            const storedRating = await AsyncStorage.getItem(
                `rating_${place.id}`
            );
            console.log('Stored Rating:', storedRating);

            if (storedRating !== null) {
                setRating(parseInt(storedRating, 10));
            }
        } catch (error) {
            console.error('Error retrieving rating from storage:', error);
        }
    };

    const saveRatingToStorage = async (newRating) => {
        try {
            await AsyncStorage.setItem(
                `rating_${place.id}`,
                newRating.toString()
            );
        } catch (error) {
            console.error('Error saving rating to storage:', error);
        }
    };

    const getCommentsFromStorage = async () => {
        try {
            const storedComments = await AsyncStorage.getItem(
                `comments_${place.id}`
            );

            if (storedComments !== null) {
                setComments(JSON.parse(storedComments));
            }
        } catch (error) {
            console.error('Error retrieving comments from storage:', error);
        }
    };

    const saveCommentsToStorage = async (comments) => {
        try {
            await AsyncStorage.setItem(
                `comments_${place.id}`,
                JSON.stringify(comments)
            );
        } catch (error) {
            console.error('Error saving comments to storage:', error);
        }
    };

    const handleDeleteComment = (index) => {
        const updatedComments = [...comments];
        updatedComments.splice(index, 1);
        setComments(updatedComments);
        saveCommentsToStorage(updatedComments);
    };

    const handleCommentChange = (text) => {
        setNewComment(text);
    };

    const handleAddComment = () => {
        const updatedComments = [...comments, newComment];
        setComments(updatedComments);
        saveCommentsToStorage(updatedComments);
        setNewComment('');
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        saveRatingToStorage(newRating); // Guardar el nuevo valor al cambiar la calificación
    };

    const handleResetRating = () => {
        setRating(0);
        saveRatingToStorage(0);
    };

    useEffect(() => {
        // Al entrar al detalle, actualizamos la calificación
        getRatingFromStorage();
        getCommentsFromStorage();
        // También puedes hacer otras cosas al entrar al detalle si es necesario
    }, [navigation, place.id]); // Agrega place.id como dependencia

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.iconContainer}>
                    <IconButton icon='hamburger' size={90} disabled />
                </View>

                <Text style={[styles.text, styles.boldText]}>{place.name}</Text>
                <Text style={styles.text}>{place.detail}</Text>

                {/* Componente de estrellas */}
                <StarRating
                    rating={rating}
                    onRatingChange={handleRatingChange}
                    onReset={handleResetRating}
                />
                <Text
                    style={styles.text}
                >{`Número de reseñas: ${place.reviewCount}`}</Text>
                <View style={styles.commentsCard}>
                    <View>
                        <Text style={styles.commentsTitle}>
                            Añade algun comentario!
                        </Text>
                        {comments.map((comment, index) => (
                            <View key={index} style={styles.commentContainer}>
                                <View style={styles.commentTextContainer}>
                                    <Text style={styles.commentText}>
                                        {comment}
                                    </Text>
                                </View>
                                <IconButton
                                    icon='delete'
                                    size={25}
                                    iconColor='red'
                                    onPress={() => handleDeleteComment(index)}
                                />
                            </View>
                        ))}
                    </View>

                    {/* Input para agregar comentarios */}
                    <View style={styles.commentInputContainer}>
                        <TextInput
                            style={styles.commentInput}
                            placeholder='Añade un comentario...'
                            value={newComment}
                            onChangeText={handleCommentChange}
                        />
                        <Button title='Agregar' onPress={handleAddComment} />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        margin: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    iconContainer: {
        backgroundColor: '#DAE4F1',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        width: 355,
        height: 150,
        marginTop: -16,
        padding: 16,
        marginBottom: 16,
    },
    text: {
        marginBottom: 8,
    },
    boldText: {
        fontWeight: 'bold',
    },
    commentsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    commentsCard: {
        marginTop: 20,
        padding: 10,
        flex: 1,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        alignSelf: 'stretch',
    },
    commentText: {
        fontSize: 16,
        marginBottom: 5,
        marginStart: 10,
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    commentInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
        padding: 5,
    },
    commentTextContainer: {
        flex: 1,
    },
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
});

export default PlaceDetailComponent;
