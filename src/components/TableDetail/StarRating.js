import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StarRating = ({ rating, onPress }) => {
    return (
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
            {[1, 2, 3, 4, 5].map((index) => (
                <TouchableOpacity key={index} onPress={() => onPress(index)}>
                    <Icon
                        name={index <= rating ? 'star' : 'star-border'} // Utiliza los nombres de iconos de MaterialIcons
                        size={30}
                        style={{ marginHorizontal: 5 }}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default StarRating;
