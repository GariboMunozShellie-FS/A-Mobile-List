import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Switch, StyleSheet, Text, View, Button } from 'react-native';

import styles from "./AppStyles";

export default function Categories({navigation}) {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.largerHeading}>Categories</Text>
            <Button title='go to Home' onPress={() => navigation.navigate('Home')} />
            <Button title='go to details' onPress={() => navigation.navigate('Details')} />
        </SafeAreaView>
    );
}
