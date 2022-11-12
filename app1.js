import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Switch, StyleSheet, Text, View, Button, Platform, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Network from 'expo-network'

import Details from "./Details";
import Categories from "./Singles";
import Create from "./Create";

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
      <Button title='Create New ' onPress={() => navigation.navigate('Create')} />
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
function Home ({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  ;
  const URL = `https://curd-api-deployment.herokuapp.com/api/v1/songs`

    const createSong = async () => {
    try{
        await fetch(URL, {
            method:'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(() => getSongs())
    }
    catch (error){
        setError(error.message || "Unexpected Error")
    }
    finally{
        setLoading(false)
    }
    }

    const [text, onChangeText] = useState({
        title: '',
        artist: '',
        album: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        createSong();
    }

    const inputChange = (event) => {
        event.persist();
        setValues((values) => ({
        ...values,
        [event.target.title]: event.target.value
        }))
    }
    return (
        <SafeAreaView >
          <Details/>
        </SafeAreaView>
    );
}

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Create" component={Create} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
