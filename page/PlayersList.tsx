import axios , { AxiosResponse } from 'axios'
import { useState, useEffect } from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import { Players } from '../interfaces';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function GetPlayers({navigation}) {
  const [playersData, setPlayersData] = useState<Players[]>([]);

  console.log('players data: ', playersData)

  useEffect(()=> {
    axios.get<Players[]>('https://api.mpg.football/api/data/championship-players-pool/1')
    .then((response: AxiosResponse) => {
      setPlayersData(response.data.poolPlayers)
    })
  }, [])


  return (
    <View>
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
                onPress={() => navigation.navigate('Details')}
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




