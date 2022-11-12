import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Switch, StyleSheet, Text, View, Button } from 'react-native';

import styles from "./AppStyles";

export default function Singles({navigation}) {
    const URL = `https://curd-api-deployment.herokuapp.com/api/v1/songs`
    const {id} = useParams()

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
                getSong();
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
                .then(data => {
                setSongs(data)
                nav("/dashboard", {replace: true})
                })
        }
        catch (error){
            setError(error.message || "Unexpected Error")
        }
        finally{
            setLoading(false)
        }
    }
    const updateSong = async () => {
        try{
            await fetch(`${API_base}/songs/${id}`, {
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
    const handleSubmit = (event) => {
        event.preventDefault();
        updateSong();
    }

    const inputChange = (event) => {
        event.persist();
        setValues((values) => ({
        ...values,
        [event.target.title]: event.target.value
        }))
    }
    
    const renderItem = (item) => {
        console.log("item: ", item)
        //console.log("title: ", item.item.title)
        return (
        <ListItem>
            {item.item.title},
            {item.item.artist}
            {item.item.album}
        </ListItem>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Button title='go to Home' onPress={() => navigation.navigate('Home')} />
            <Button title='go to details' onPress={() => navigation.navigate('Details')} />
            <Text style={styles.largerHeading}>Singles</Text>
            <FlatList
                data={values}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                />
            <Button title='Submit' onPress={deleteSong} />
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
