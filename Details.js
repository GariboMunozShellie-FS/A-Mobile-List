import React, { useEffect, useState } from "react";
import { SafeAreaView,FlatList, Switch, StyleSheet, Text, View, Button, TextInput,TouchableOpacity } from 'react-native';
import ListItem from "./components/ListItem";

import styles from "./AppStyles";

export default function Details({navigation}) {
    const URL = `https://curd-api-deployment.herokuapp.com/api/v1/songs`
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

    const getSongs = async () => {
        setLoading(true)
        try{
        await fetch(URL)
                .then(res => res.json())
                .then(data => {
                //console.log(data)
                setSongs(data)
                })
        }
        catch (error){
        setError(error.message || "Unexpected Error")
        }
        finally{
        setLoading(false)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({
            title,
            artist,
            album
        });
        createSong();
    }

    const createSong = async () => {
        try{
        await fetch(URL, {
            method:'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(values),
        })
            .then(() => 
                console.log(body))
                getSongs()
        }
        catch (error){
        setError(error.message || "Unexpected Error")
        }
        finally{
        setLoading(false)
        }
    }
    

    return (
        <SafeAreaView >
            <Button title='go to home' onPress={() => navigation.navigate('Home')} />
            <TextInput
                onChangeText={text => setTitle(text)}
                value={title}
                placeholder='title'
                name='title'
            />
            <TextInput
                onChangeText={text => setArtist(text)}
                value={artist}
                placeholder='artist'
                name='artist'
            />
            <TextInput
                onChangeText={text => setAlbum(text)}
                value={album}
                placeholder='album'
                name='album'
            />
            <Button title="Submit" onPress={handleSubmit} />
                
        </SafeAreaView>
    );
}
