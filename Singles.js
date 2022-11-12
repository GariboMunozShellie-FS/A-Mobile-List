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
            <Button title='go to Home' onPress={() => navigation.navigate('Home')} />
            <Button title='go to details' onPress={() => navigation.navigate('Details')} />
            <Text style={styles.largerHeading}>{values.title}</Text>
            <Text style={styles.largerHeading}>{values.artist}</Text>
            <Text style={styles.largerHeading}>{values.album}</Text>
            <Button title='Delete' onPress={deleteSong} />
            <TextInput
                onChangeText={text => setTitle(text)}
                value={title}
                placeholder={values.title}
                name='title'
            />
            <TextInput
                onChangeText={text => setArtist(text)}
                value={artist}
                placeholder={values.title}
                name='artist'
            />
            <TextInput
                onChangeText={text => setAlbum(text)}
                value={album}
                placeholder={values.title}
                name='album'
            />
            <Button title="Submit" onPress={handleSubmit} />
        </SafeAreaView>
    );
}