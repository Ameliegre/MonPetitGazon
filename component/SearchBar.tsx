import { View} from 'react-native';
import { useState } from 'react';
import {TextInput} from 'react-native';
import { StyleSheet } from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list'

function SearchBar() {
    const [text, onChangeText] = useState('');
    const [selected, setSelected] = useState('');

    const position = [
        {key:'G', value:'Gardien'},
        {key:'D', value:'Defenseur'},
        {key:'L', value:'Lateral'},
        {key:'MD', value:'Milieu défensif'},
        {key:'MO', value:'Milieu Offensif'},
        {key:'A', value:'Attaquant'},
    ]

    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Nom du joueur"
            />
            <MultipleSelectList
                boxStyles={{backgroundColor:'white', borderColor:'rgb(216, 218, 232)'}}
                dropdownStyles={{backgroundColor:'white', borderColor:'rgb(216, 218, 232)'}}
                placeholder='Sélectionner position'
                setSelected={(position) => setSelected(position)} 
                data={position} 
                save="value"
                onSelect={() => alert(selected)} 
                label="Position"
                maxHeight={200}
                dropdownItemStyles={{marginHorizontal:20}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
      backgroundColor: '#fff',
      color:'rgb(105, 103, 115)',
      padding:10,
      height:40,
      borderWidth: 1,
      borderColor: 'rgb(216, 218, 232)',
      marginBottom:20,
      borderRadius:10
    },
    searchContainer: {
        padding:10,
        display: 'flex',
        flexDirection: 'column',
        columnGap:10,
        marginHorizontal:16,
    }
  });

export default SearchBar