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

    useEffect(()=> {
      axios.get<PlayersDetails[]>(`https://api.mpg.football/api/data/championship-player-stats/${player.id}/2022`)
      .then((response: AxiosResponse) => {
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
          <View style={styles.namePlayerCard}>
            <Text style={styles.namePlayer}>{player.firstName}</Text>
            <Text style={styles.namePlayer}>{player.lastName}</Text>
            <Text style={styles.namePlayer}>-</Text>
            <Text style={styles.namePlayer}>{player.ultraPosition}</Text>
          </View>
          <View style={styles.statsCard} >
            <Text style={styles.Title}>Stats</Text>
            <View style={styles.statsDetails}>
              <View style={styles.statsStyle}>
                <Text>Note</Text>
                <Text>{player.stats.averageRating.toFixed(2)}</Text>
              </View>
              <View style={styles.statsStyle}>
                <Text>Buts</Text>
                <Text>{player.stats.totalGoals}</Text>
              </View>
              <View style={styles.statsStyle}>
                <Text>Matches</Text>
                <Text>{player.stats.totalMatches}</Text>
              </View>
              <View style={styles.statsStyle}>
                <Text>Matches joués</Text>
                <Text>{player.stats.totalPlayedMatches}</Text>
              </View>
              <View style={styles.statsStyle}>
                <Text>Titulaire</Text>
                <Text>{player.stats.totalStartedMatches}</Text>
              </View>
              <View style={styles.statsStyle}>
                <Text>Position</Text>
                <Text>{player.position}</Text>
              </View>
            </View>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    detailsCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems:'flex-start',
      justifyContent:'space-between',
      rowGap: 20,
      backgroundColor: '#fff',
      marginVertical:5,
      marginHorizontal:25,
      padding:10,
      borderRadius: 8
    },
    namePlayerCard:{
      display:'flex',
      flexDirection:'row',
      columnGap:10
    },
    statsCard:{
      width:'100%'
    },
    statsDetails: {
      borderWidth: 1,
      borderColor: 'rgb(216, 218, 232)',
      borderRadius:10,
      width:'100%',
      padding:10
    },
    statsStyle:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      paddingHorizontal:10
    },
    namePlayer: {
      fontWeight:'bold',
      fontSize:30
    },
    Title: {
      fontSize:24,
      marginBottom:20
    },
    Text: {
      fontWeight:'bold',
    }
  });

export default GetPlayersDetails