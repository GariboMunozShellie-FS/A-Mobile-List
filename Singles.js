import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Switch, StyleSheet, Text, View, Button } from 'react-native';

import styles from "./AppStyles";

export default function Singles({route, navigation}) {
    const URL = `https://curd-api-deployment.herokuapp.com/api/v1/songs`
    const {id} = route.params

    const [songs, setSongs] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [values, setValues] = useState({
        title: '',
        artist: '',
        album: ''
    })

    let ignore = false;
        useEffect(()=> {
            if (!ignore){
                getSongs();
            }
            return () => {
                ignore = true
            }
        },[])

    const getSongs = async() => {
        setLoading(true)
        try{
            await fetch(`${URL}/${id}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setValues({
                        title: data.title,
                        artist: data.artist,
                        album: data.album
                    })
                })
            }
        catch (error){
            setError(error.message || "Unexpected Error")
        }
        finally{
            setLoading(false)
        }
    }

    const deleteSong = async () => {
        try{
            await fetch(`${API_base}/songs/${id}`, {
                method:'DELETE'
            })
                .then(res => res.json())
                .then(data => { setSongs(data)})
                .then(()=> getSongs())
        }
        catch (error){
            setError(error.message || "Unexpected Error")
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Button title='go to Home' onPress={() => navigation.navigate('Home')} />
            <Button title='go to details' onPress={() => navigation.navigate('Details')} />
            <Text style={styles.largerHeading}>{values.title}</Text>
            <Text style={styles.largerHeading}>{values.artist}</Text>
            <Text style={styles.largerHeading}>{values.album}</Text>
            <Button title='Delete' onPress={deleteSong} />
        </SafeAreaView>
    );
}