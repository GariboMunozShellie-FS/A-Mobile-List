import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Switch, StyleSheet, Text, View, Button } from 'react-native';

import styles from "./AppStyles";

export default function Details({navigation}) {
    const URL = `https://curd-api-deployment.herokuapp.com/api/v1/songs`
  //fetch(`https://curd-api-deployment.herokuapp.com/api/v1/songs`)
  //  .then(res => res.json())
  //  .then(data => console.log({data});)

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.largerHeading}>details</Text>
            <Button title='go to Home' onPress={() => navigation.navigate('Home')} />
            <Button title='go to Categories' onPress={() => navigation.navigate('Categories')} />
        </SafeAreaView>
    );
}
