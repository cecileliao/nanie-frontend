import React, { useState } from 'react'
import {  Modal,View, Text, TextInput, StyleSheet, Image } from 'react-native'
import DatePicker from 'react-native-datepicker';

export default function AidantMissionScreen() {

  const [date, setDate] = useState(new Date())



  return (
    <View style={styles.container}>

      {/* image de profil */}

      <View style={styles.imageProfil}>
      <Image
                source={require("../assets/userPicture.png")}
                style={{ width: 96, height: 96, margin:20}}
              />
      <Text>Ajouter/Modifier photo</Text>
      </View>

      {/* nom de l'aidant */}

      <View style={styles.containerInput}>
      <Text>Nom</Text>
      <TextInput style={styles.input} onChangeText={text => setTextInputValue(text)} placeholder="Nom" />
      </View>

    {/* prénom de l'aidant */}
      <View style={styles.containerInput}>
      <Text>Prénom</Text>
      <TextInput style={styles.input} onChangeText={text => setTextInputValue(text)} placeholder="Prénom" />
      </View>

    {/* téléphone de l'aidant */}
    <View style={styles.containerInput}>
      <Text>Téléphone</Text>
      <TextInput style={styles.input} onChangeText={text => setTextInputValue(text)} placeholder="Téléphone" />
      </View>

    {/* âge de l'aidant */}
    <View style={styles.containerInput}>
      <Text>Age</Text>
      <DatePicker
      style={{ width: 200 }} 
      date={date} 
      mode="date"
      format="YYYY-MM-DD"
      minDate="1900-12-01"
      maxDate="2025-12-01"
      confirmBtnText="Confirmer"
      cancelBtnText="Annuler"
      onDateChange={setDate} />
      </View>



    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
    },
    imageProfil: {
      flexDirection: "row",
      justifyContent: 'center',
      alignItems:"center",
    },
    input: {
      width: 250,
      height:26,
      borderBottomColor: '#5ABAB6',
      borderBottomWidth: 1,
    },
    containerInput: {
      fontSize: 13,
      flexDirection: "row",
      alignItems:"center",
      justifyContent: "space-between",
      marginLeft:25,
      marginRight:25,
      marginBottom:25,
    },
    })