import React, {useEffect, useState} from "react";
import { StyleSheet, FlatList, View } from 'react-native';
import ListItem from './ListItem';

export default function Heading() {

  const URL = `https://curd-api-deployment.herokuapp.com/api/v1/songs`
  const [songs, setSongs] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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
                setSongs({data})
                console.log(songs);
              })
    }
    catch (error){
      setError(error.message || "Unexpected Error")
    }
    finally{
      setLoading(false)
    }
  }
  
  const renderItem = ({item}) => (
    <ListItem>{item.title}</ListItem>
  );

  return (
    <FlatList
      data={songs}
      renderItem={renderItem}
      keyExtractor={item => item._id}
    />
  );
}
