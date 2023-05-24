import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'   
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';


export default function MissionScreen2() {

  const BACKEND_ADDRESS = '192.168.10.128:3000';
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    console.log('search', user.searchResult[0].token)
    fetch(`http://${BACKEND_ADDRESS}/DetailsMission/${user.mission._id}`)
      .then(response => response.json())
      .then(data => {
        console.log('$$$', data);
        // if (data.result)  {
        // dispatch(displayProfil)
      });
  }, []);



  return (
    <View>
      <Text>MissionScreen2</Text>
      <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Suivant</Text>
          </TouchableOpacity>
    </View>
  )
}

