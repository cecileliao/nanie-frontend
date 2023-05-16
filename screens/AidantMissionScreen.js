import React, { useState } from 'react'
import {  View, Text, TextInput, StyleSheet, Image } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

export default function AidantMissionScreen() {

  //menu dropdown pour le sexe
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);


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
      <TextInput style={styles.input} onChangeText={text => setTextInputValue(text)} placeholder="YYYY" />
      <Text>Année de naissance</Text>
    </View>

     {/* sexe de l'aidant */}
    <View style={styles.containerInput}>
      <View>
        <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        />
      </View>
      <Text>Sexe</Text>
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