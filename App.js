import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Switch, StyleSheet, Text, View, Button, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Network from 'expo-network'

import Details from "./Details";
import Singles from "./Singles";

import Heading from './components/Heading';
import ListContainer from './components/ListContainer';

import styles from "./AppStyles";

function HomeScreen({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Button title='go to details' onPress={() => navigation.navigate('Details')} />
      <Button title='go to Categories' onPress={() => navigation.navigate('Categories')} />
      <Heading level="3" >Your PlayList</Heading>
      <ListContainer />
    </SafeAreaView>
  );
}

function Home({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  

  return (
    <SafeAreaView style={styles.container}>
      <Details/>
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
