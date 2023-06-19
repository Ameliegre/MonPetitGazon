import axios , { AxiosResponse } from 'axios'
import { useState, useEffect } from 'react';
import { PlayersDetails, Players } from '../interfaces'
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type ParamList = {
    'Details du joueur': { player: Players };
  };
  
type RouteParams = RouteProp<ParamList, 'Details du joueur'>;

function GetPlayersDetails() {
    const route = useRoute<RouteParams>();
    const { player } = route.params;
    const [playerStat, setPlayerStat] = useState<PlayersDetails[]>([]);

    console.log(player)

    console.log('player details: ', playerStat)

    useEffect(()=> {
      axios.get<PlayersDetails[]>(`https://api.mpg.football/api/data/championship-player-stats/${player.id}/2022`)
      .then((response: AxiosResponse) => {
        console.log('iiiicii', response)
        setPlayerStat(response.data)
      })
    }, [player])

    if(!playerStat) {
        return (
            <View style={styles.detailsCard}>
                <Text>Chargement</Text>
            </View>
        )
    }

    return (
        <View style={styles.detailsCard}>
        <Text>{player.firstName}</Text>
            <Text>{player.lastName}</Text>
            <Text>{player.stats.averageRating}</Text>
            <Text>{player.stats.totalGoals}</Text>
            <Text>{player.stats.totalMatches}</Text>
            <Text>{player.stats.totalPlayedMatches}</Text>
            <Text>{player.stats.totalStartedMatches}</Text>
            <Text>Position: {player.position}</Text>
            <Text>Ultra position : {player.ultraposition}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    detailsCard: {
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
  });

export default GetPlayersDetails