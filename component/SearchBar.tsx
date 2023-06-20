import { View} from 'react-native';
import { useState } from 'react';
import {TextInput} from 'react-native';
import { StyleSheet } from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list'

function SearchBar({playersData, setFilteredPlayersData}) {
    const [text, onChangeText] = useState('');
    const [selected, setSelected] = useState([]);

    const position = [
        {key:10, value:'Gardien'},
        {key:20, value:'Defenseur'},
        {key:21, value:'Lateral'},
        {key:30, value:'Milieu défensif'},
        {key:31, value:'Milieu offensif'},
        {key:40, value:'Attaquant'},
    ]

    function handleSelect(){
        if (selected.length > 0) {
            const ultrapositionSelected = playersData?.filter(player => {
                return selected.find(elt => {
                    return elt === player.ultraPosition
                } )
            } )
            setFilteredPlayersData(ultrapositionSelected);
        } else {
            setFilteredPlayersData(playersData);
        }
        console.log( selected)
    }


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
                data={position} 
                save="key"
                onSelect={handleSelect} 
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