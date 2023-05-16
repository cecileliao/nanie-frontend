import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Switch, View, Text, TextInput, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

export default function AidantMissionScreen2() {

  //text rempli
  //phrase intro de l'aidant
  const [introBioAidant, setintroBioAidant] = useState("");
  //description détaillée de l'aidant
  const [longBioAidant, setlongBioAidant] = useState("");
  //compétences de l'aidant
  const [abilitiesAidant, setabilitiesAidant] = useState("");

  //afficher le nombre de caractères restants sur le textInput
  const [shortIntroremainingCharacters, setshortIntroRemainingCharacters] = useState(100);
  const [longIntroremainingCharacters, setlongIntroRemainingCharacters] = useState(300);
  const [abilitiesremainingCharacters, setabilitiesRemainingCharacters] = useState(300);

  //pour le nombre de caractères de la phrase d'introduction
  useEffect(() => {
    const charactersCount = introBioAidant.length;
    const shortremainingCount = 100 - charactersCount;
    setshortIntroRemainingCharacters(shortremainingCount);
  }, [introBioAidant]);

  //pour le nombre de caractères de la description détaillée
  useEffect(() => {
    const charactersCount = longBioAidant.length;
    const longremainingCount = 300 - charactersCount;
    setlongIntroRemainingCharacters(longremainingCount);
  }, [longBioAidant]);

//pour le nombre de caractères de la description détaillée
useEffect(() => {
        const charactersCount = abilitiesAidant.length;
        const abilitiesRemainingCount = 300 - charactersCount;
        setabilitiesRemainingCharacters(abilitiesRemainingCount);
}, [abilitiesAidant]);


  return (
    <KeyboardAvoidingView style={styles.container}>
    <View >

    {/* Phrase intro */}
    <Text style={styles.firsttitle}>Ma présentation en quelques mots</Text>
    <View>
        <TextInput
            style={styles.input}
            onChangeText={text => setintroBioAidant(text)}
            placeholder="Ma phrase d’introduction"
            textAlignVertical="top" //sur android pour center le placeholder en haut
            multiline={true} //sur ios pour center le placeholder en haut
            maxLength={100} //taille max de la phrase
        />
          <View style={styles.characterCountContainer}>
          <Text style={styles.characterCountText}>{shortIntroremainingCharacters}</Text>
        </View>
      </View>



       {/* Description détaillée */}
    <Text style={styles.title}>Ma personnalité incroyable</Text>
    <View>
        <TextInput
            style={styles.longinput}
            onChangeText={text => setlongBioAidant(text)}
            placeholder="Présentation détaillée de ta personnalité"
            textAlignVertical="top" //sur android pour center le placeholder en haut
            multiline={true} //sur ios pour center le placeholder en haut
            maxLength={300} //taille max de la phrase
        />
          <View style={styles.characterCountContainer}>
          <Text style={styles.characterCountText}>{longIntroremainingCharacters}</Text>
        </View>
      </View>

         {/* Compétences */}
    <Text style={styles.title}>Mes compétences magiques</Text>
    <View>
        <TextInput
            style={styles.longinput}
            onChangeText={text => setabilitiesAidant(text)}
            placeholder="Description de mes compétences, diplômes, expérience ..."
            textAlignVertical="top" //sur android pour center le placeholder en haut
            multiline={true} //sur ios pour center le placeholder en haut
            maxLength={300} //taille max de la phrase
        />
          <View style={styles.characterCountContainer}>
          <Text style={styles.characterCountText}>{abilitiesremainingCharacters}</Text>
        </View>
      </View>
       
        {/* Bouton suivant */}
      <View style={styles.buttoncontainer}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Suivant</Text>
      </TouchableOpacity>
      </View>

    </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    input: {
      width: 338,
      height:77,
      borderColor: '#5ABAB6',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      fontSize: 13,
      marginLeft:20,
      marginRight:25,
      marginBottom:25,
    },
    longinput: {
        width: 338,
        height:180,
        borderColor: '#5ABAB6',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 13,
        marginLeft:20,
        marginRight:25,
        marginBottom:25,
      },
    characterCountContainer: {
        position: 'absolute',
        bottom: 30,
        right: 40,
        backgroundColor: 'white',
        borderRadius: 5,
      },
      characterCountText: {
        color: '#868686',
        fontSize: 12
      },
      firsttitle: {
        fontFamily: "Recoleta",
        fontSize: 20,
        color: "#785C83",
        marginLeft: 20,
        marginBottom: 20,
        marginTop: 20
      },
    title: {
      fontFamily: "Recoleta",
      fontSize: 20,
      color: "#785C83",
      marginLeft: 20,
      marginBottom: 20
    },
    buttoncontainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: '#5ABAB6',
      padding: 10,
      borderRadius: 8,
      width: 120,
    },
    buttonText: {
      color: 'white',
      textAlign: "center",
  },
  
    })