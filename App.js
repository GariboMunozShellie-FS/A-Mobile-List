import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Switch, StyleSheet, Text, View, Button, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Network from 'expo-network'

import Details from "./Details";
import Categories from "./Categories";

import Heading from './components/Heading';
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
      <Text style={styles.largerHeading}>This App</Text>
      <Heading level="3" >This is the Heading</Heading>
      {
        Platform.OS === 'ios'
        ? <Text>I am IOS</Text>
        : <Text>I am NOT IOS</Text>
      }
      <Button title='go to details' onPress={() => navigation.navigate('Details')} />
      <ListContainer />
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {

  //const [songs, setSongs] = useState(null)
  //fetch(`https://curd-api-deployment.herokuapp.com/api/v1/songs`)
  //  .then(res => res.json())
  //  .then(data => {
  //    
  //    setSongs(data)
  //    //console.log(data)
  //  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Categories" component={Categories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
