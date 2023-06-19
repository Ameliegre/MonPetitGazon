import axios , { AxiosResponse } from 'axios'
import { useState, useEffect } from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import { Players } from '../interfaces';
import { StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-screens';

function GetPlayers({navigation}) {
  const [playersData, setPlayersData] = useState<Players[]>([]);

  console.log(playersData.map((item) => item.id))

  useEffect(()=> {
    axios.get<Players[]>('https://api.mpg.football/api/data/championship-players-pool/1')
    .then((response: AxiosResponse) => {
      setPlayersData(response.data.poolPlayers)
    })
  }, [])

  const handlePress = (player) => {
    navigation.navigate('Details du joueur', { player })
  }

  return (
    <View>
      <SearchBar/>
      <FlatList
        data= {playersData}
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
});

export default GetPlayers




