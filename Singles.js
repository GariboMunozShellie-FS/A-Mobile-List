import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Switch, StyleSheet, Text, View, Button, TextInput } from 'react-native';

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

    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [album, setAlbum] = useState('')

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

    const refreshPage = () => {
        window.location.reload(false);
    }

    const deleteSong = async () => {
        try{
            await fetch(`${URL}/${id}`, {
                method:'DELETE'
            })
                .then(res => res.json())
                .then(data => { setSongs(data)})
                .then(()=> getSongs())
                .then(()=> refreshPage())
                
        }
        catch (error){
            setError(error.message || "Unexpected Error")
        }
        finally{
            setLoading(false)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await setValues({
            title,
            artist,
            album
        });
        updateSong();
    }

    const updateSong = async () => {
    try{
        await fetch(`${URL}/${id}`, {
            method:'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
                .then(res => res.json())
                .then(data => {
                console.log({data})
                })
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
            <View style={styles.header}>
                <Text style={styles.formTitle}>Title: {values.title}</Text>
                <Text style={styles.formTitle}>Artist: {values.artist}</Text>
                <Text style={styles.formTitle}>Album: {values.album}</Text>
            <View style={styles.button}>
                <Button title='Create New Item' onPress={() => navigation.navigate('Details')} />
                <Button title='Delete This Song' onPress={deleteSong} />
            </View>
            </View>
            <View style={styles.form} >
                <Text style={styles.title}>Update Title:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setTitle(text)}
                    value={title}
                    placeholder='title'
                    name='title'
                />
                <Text style={styles.title}>Update Artist:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setArtist(text)}
                    value={artist}
                    placeholder='artist'
                    name='artist'
                />
                <Text style={styles.title}>Update Album:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setAlbum(text)}
                    value={album}
                    placeholder='album'
                    name='album'
                />
                <Button title="Submit" onPress={handleSubmit} />
            </View> 
        </SafeAreaView>
    );
}