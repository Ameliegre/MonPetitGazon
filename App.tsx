import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import GetPlayers from './page/PlayersList';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GetPlayersDetails from './page/PlayersDetails';

const Stack = createNativeStackNavigator();

function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Liste des joueurs'
          component={GetPlayers}
          options={{
            headerStyle: {
              backgroundColor: 'green'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen 
          name='Details du joueur'
          component={GetPlayersDetails}
          options={{
            headerStyle: {
              backgroundColor: 'green'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;