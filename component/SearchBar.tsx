import { View} from 'react-native';
import { useState } from 'react';
import {TextInput} from 'react-native';
import { StyleSheet } from 'react-native';

function PlayersDetails() {
    const [text, onChangeText] = useState('Useless Text');
    const [number, onChangeNumber] = useState('');

    return (
        <View style={styles.searchContainer}>
            <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Position"
                keyboardType="numeric"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
      backgroundColor: 'red',
    },
    searchContainer: {
        backgroundColor: 'orange',
        padding:50,
        margin: 50
    }
  });

export default PlayersDetails