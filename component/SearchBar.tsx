import { View} from 'react-native';
import { useEffect, useState } from 'react';
import {TextInput} from 'react-native';
import { StyleSheet } from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list'

function SearchBar({playersData, setFilteredPlayersData, positions}) {
    const [selected, setSelected] = useState([]);
    const [text, onChangeText] = useState('')

    useEffect(() => {
        console.log(selected)

        let result = playersData
        if (selected.length > 0) {
            result = result?.filter(player => {
                return selected.find(elt => {
                    return elt === player.ultraPosition
                } )
            } )
        } 

        console.log('text', text.length)
        
        if (text.length > 0) {
            console.log('text2', text)
            result = result?.filter(player => {
                    console.log('lastname', player.lastName, 'firstname', player.firstName, 'text', text)
                    return player.lastName && player.lastName.includes(text) || 
                    player.firstName && player.firstName.includes(text)
                }    
            );
        } 
        setFilteredPlayersData(result)

    }, [text, selected])

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
                setSelected={setSelected} 
                data={positions} 
                save="key"
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