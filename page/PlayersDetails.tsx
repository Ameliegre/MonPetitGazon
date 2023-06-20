import axios , { AxiosResponse } from 'axios'
import { useState, useEffect } from 'react';
import { PlayersDetails, Players } from '../interfaces'
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type ParamList = {
    'Details du joueur': { player: Players, positions };
  };
  
type RouteParams = RouteProp<ParamList, 'Details du joueur'>;

function GetPlayersDetails() {
    const route = useRoute<RouteParams>();
    const { player, positions } = route.params;
    const [playerStat, setPlayerStat] = useState<PlayersDetails[]>([]);

    useEffect(()=> {
      axios.get<PlayersDetails[]>(`https://api.mpg.football/api/data/championship-player-stats/${player.id}/2022`)
      .then((response: AxiosResponse) => {
        console.log(response.data.championships)
        setPlayerStat(response.data.championships)
      })
    }, [player])

    if(!playerStat) {
        return (
            <View style={styles.detailsCard}>
                <Text>Chargement</Text>
            </View>
        )
    }

    const positionPlayer = positions.find((item: { key: number; }) => item.key === player.ultraPosition)

    return (
        <View style={styles.detailsCard}>
          <View style={styles.namePlayerCard}>
            <Text style={styles.namePlayer}>{player.firstName}</Text>
            <Text style={styles.namePlayer}>{player.lastName}</Text>
            <Text style={styles.namePlayer}>-</Text>
            <Text style={styles.namePlayer}>{positionPlayer.value}</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.Title}>Fiche joueur</Text>
            <View style={styles.statsDetails}>
              <View style={styles.statsStyle}>
                <Text>Titulaire</Text>
                <Text>{player.stats.totalStartedMatches}</Text>
              </View>
              <View style={styles.statsStyle}>
                <Text>Buts</Text>
                <Text>{player.stats.totalGoals}</Text>
              </View>
              <View style={styles.statsStyle}>
                <Text>Total match joués</Text>
                <Text>{player.stats.totalPlayedMatches}</Text>
              </View>
              <View style={styles.statsStyle}>
                <Text>Cote</Text>
                <Text>{player.quotation}</Text>
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
      flexWrap:'wrap',
      columnGap:10
    },
    statsCard:{
      width:'100%',
      display:'flex',
      alignItems:'center'
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
      fontSize:25,
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