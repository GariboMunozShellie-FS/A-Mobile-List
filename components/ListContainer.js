import React, {useEffect, useState} from "react";
import { StyleSheet, FlatList, View, Button } from 'react-native';
import ListItem from './ListItem';

import IndividualSong from "../IndividualSong";
import UselessTextInput from "./UselessTextInput";

export default function ListContainer({navigation}) {

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
        getSongs();
      }
    }, [])
  
    const getSongs = async() => {
      setLoading(true)
    try{
      await fetch(URL)
              .then(res => res.json())
              .then(data => {
                setSongs(data)
                //console.log(songs);
              })
    }
    catch (error){
      setError(error.message || "Unexpected Error")
    }
    finally{
      setLoading(false)
    }
  }

  const renderItem = (item) => {
    //console.log("item: ", item)
    //console.log("title: ", item.item.title)
    return (
        <ListItem>
          <Button title={item.item.title} onPress={() => navigation.navigate('Singles')} />
        </ListItem>
      
    )
  }

  return (
      <FlatList
      data={songs}
      renderItem={renderItem}
      keyExtractor={item => item._id}
    />
  );
}