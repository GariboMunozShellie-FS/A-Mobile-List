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
                console.log(data)
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

    const createSong = async () => {
        try{
        await fetch(URL, {
            method:'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
                .then(data => console.log({data}))
        
        //setValues(data),
        //getSongs())
        
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
        createSong();
    }

    const inputChange = (event) => {
        //event.persist();
        setValues((values) => ({
        ...values,
        [event.target.title]: event.target.value
        }))
    }

    return (
        <SafeAreaView >
            <Button title='go to home' onPress={() => navigation.navigate('Home')} />
            <TextInput
                //defaultValue={values.title}
                value={values.title}
                onChange={inputChange}
                placeholder='title'
                name= 'title'
            />
            <TextInput
                //defaultValue={values.artist}
                value={values.artist}
                onChange={inputChange}
                placeholder='artist'
                name= 'artist'
            />
            <TextInput
                //defaultValue={values.album}
                value={values.album}
                onChangeText={inputChange}
                onChange={inputChange}
                placeholder='album'
                name= 'album'
            />
            <TouchableOpacity onPress={handleSubmit} >
                <Text>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
