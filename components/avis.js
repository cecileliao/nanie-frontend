import { StyleSheet, View, Text, Image } from "react-native"
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

const avisData = [
    {
      photoUrl: 'https://exemple.com/photo1.jpg',
      nom: 'John Doe',
      etoiles: 5,
      texteAvis: 'C\'était une expérience incroyable !'
    },
    {
      photoUrl: 'https://exemple.com/photo2.jpg',
      nom: 'Jane Smith',
      etoiles: 4,
      texteAvis: 'Excellent service, je recommande vivement.'
    },
    {
      photoUrl: 'https://exemple.com/photo3.jpg',
      nom: 'Alice Johnson',
      etoiles: 3,
      texteAvis: 'Pas mal, mais peut être amélioré.'
    },
    {
      photoUrl: 'https://exemple.com/photo4.jpg',
      nom: 'Bob Williams',
      etoiles: 5,
      texteAvis: 'Le meilleur que j\'ai jamais eu !'
    },
    {
      photoUrl: 'https://exemple.com/photo5.jpg',
      nom: 'Sarah Brown',
      etoiles: 2,
      texteAvis: 'Je m\'attendais à mieux...'
    }

]

export default function Avis() {

    fetch('http://192.168.10.140:3000/aidantUsers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      }).then(response => response.json())
        .then(data => {
          console.log(data);
          if(data.result) {
            dispatch(updateAidant());
 }})

return (
    <View style={styles.container}>
    
        <View style={styles.block}>
        <View style={styles.image}>
            <Image source={user.photoAidant}/>
        </View>
        <View style={styles.infosAvis}>
            <Text style={styles.title}>Elsa Snow</Text>
            <Text style={styles.text}>Ginette est une grand-mère très attachante et passionnante...</Text>
            <Text style={styles.avis}>Avis °°°°°</Text>
        </View>
        </View>
    </View>
)
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center', 
      paddingTop: 20, 
      backgroundColor: '#ffff'
    },
    block: {
        width: '90%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#5ABAB6',
        marginBottom: 8,
        padding: 8,
      },
    image: {
        borderColor: 'blue',
    },
    infosAvis: {
        fontFamily: "Manrope",
    },
    title: {
        borderColor: 'red',
        fontFamily: "Manrope",
    },
    text: {
        borderColor: 'green',
        fontFamily: "Manrope"
    },
    avis: {
        fontFamily: "Manrope",
    },
})

