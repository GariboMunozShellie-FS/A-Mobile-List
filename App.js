import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Switch, StyleSheet, Text, View, Button, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Network from 'expo-network'

import Details from "./Details";
//import Categories from "./Categories";
import Singles from "./Singles";

import ListContainer from './components/ListContainer';

import styles from "./AppStyles";

function HomeScreen({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  //const networkCheck = await Network.getNetworkStateAsync()
  Network.getNetworkStateAsync().then(data => {
    //console.log({data});
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header} >
        <Text style={styles.largerHeading}>PLAYLIST:</Text>
        <Button title='Create New Item' onPress={() => navigation.navigate('Details')} />
      </View>
      <ListContainer navigation={navigation}/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Singles" component={Singles} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}