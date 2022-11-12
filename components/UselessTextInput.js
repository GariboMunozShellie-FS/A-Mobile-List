import React, {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const UselessTextInput = () => {
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
    return (
        <SafeAreaView>
        <TextInput
            onChangeText={onChangeText}
            value={text.title}
            placeholder={text.title}
        />
        <TextInput
            onChangeText={onChangeText}
            value={text.artist}
            placeholder={text.artist}
        />
        <TextInput
            onChangeText={onChangeText}
            value={text.album}
            placeholder={text.album}
        />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default UselessTextInput;