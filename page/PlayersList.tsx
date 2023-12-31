import axios , { AxiosResponse } from 'axios'
import { useState, useEffect } from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import { Players } from '../interfaces';
import { StyleSheet } from 'react-native';
import SearchBar  from '../component/SearchBar'

interface Position {
  key: number;
  value: string;
}

function GetPlayers({navigation}) {
  const [playersData, setPlayersData] = useState<Players[]>([]);
  const [filteredPlayersData, setFilteredPlayersData] = useState<Players[]>([]);

  const positions:Position[] = [
    {key:10, value:'Gardien'},
    {key:20, value:'Defenseur'},
    {key:21, value:'Lateral'},
    {key:30, value:'Milieu défensif'},
    {key:31, value:'Milieu offensif'},
    {key:40, value:'Attaquant'},
  ]

  useEffect(()=> {
    axios.get<Players[]>('https://api.mpg.football/api/data/championship-players-pool/1')
    .then((response: AxiosResponse) => {
      setPlayersData(response.data.poolPlayers)
      setFilteredPlayersData(response.data.poolPlayers)
    })
  }, [])

  const handlePress = (player: Players) => {
    navigation.navigate('Details du joueur', { player, positions})
  }

  return (
    <View>
      <View style={styles.searchBarContainer}>
        <SearchBar positions={positions} playersData={playersData} setFilteredPlayersData={setFilteredPlayersData}/>
      </View>
      <View>
        <FlatList
          data= {filteredPlayersData}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View>
                <View style={styles.playersCard}>
                  <View style={styles.playersName}>
                    <Text>{item.lastName}</Text>
                    <Text>{item.firstName}</Text>
                  </View>
                  <Button
                  title='Voir les Stats'
                  onPress={() => handlePress(item)}
                  color="purple"
                  accessibilityLabel="Voir le détail de chaque joueurs"
                />
                </View>
              </View>
            )
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  playersCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    columnGap: 10,
    backgroundColor: '#fff',
    marginVertical:5,
    marginHorizontal:25,
    padding:10,
    borderRadius: 8
  },
  playersName: {
    display: 'flex',
    flexDirection: 'row',
    columnGap:8
  },
  searchBarContainer:{
    width:'100%',
    margin:0,
  }
});

export default GetPlayers




