import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function CommentBox({ onCommentSubmit }) {
    const [comment, setComment] = useState('');

    const submitComment = () => {
        onCommentSubmit(comment);
        setComment('');
    };

    return (
        <View style={styles.view}>
            <TextInput
                style={styles.input}
                placeholder='Deja tu comentario...'
                value={comment}
                onChangeText={(text) => setComment(text)}
            />
            <Button title='Enviar' onPress={submitComment} />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        backgroundColor: '#fff',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 10,
        borderRadius: 5, // Bordes redondeados
    },

    view: {
        backgroundColor: '#E0E0E0',
    },
});
