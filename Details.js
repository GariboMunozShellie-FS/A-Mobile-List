import React, { useEffect, useState } from "react";
import { SafeAreaView,FlatList, Switch, StyleSheet, Text, View, Button, TextInput } from 'react-native';

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
            .then(() => getSongs())
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
        event.persist();
        setValues((values) => ({
        ...values,
        [event.target.title]: event.target.value
        }))
    }

    return (
        <SafeAreaView >
            <Button title='go to Home' onPress={() => navigation.navigate('Home')} />
            <View>
                <TextInput
                    name="title"
                    value={values.title}
                    placeholder="Title"
                    onChange={inputChange}
                />
                <TextInput
                    name="title"
                    //value={values.artist}
                    placeholder="Artist"
                    onChange={inputChange}
                />
                <TextInput
                    name="title"
                    //value={values.album}
                    placeholder="Album"
                    onChange={inputChange}
                />
            </View>
            <Button title='Submit' onPress={handleSubmit} />
        </SafeAreaView>
    );
}

