import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateAidant } from '../reducers/users';
import { 
  Dimensions, 
  TouchableOpacity, 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  Keyboard,
  TouchableWithoutFeedback, 
} from 'react-native'

export default function AidantProfilScreen2({ navigation }) {

  //texte rempli
  //phrase intro de l'aidant
  const [introBioAidant, setintroBioAidant] = useState("");
  //description détaillée de l'aidant
  const [longBioAidant, setlongBioAidant] = useState("");
  // //compétences de l'aidant
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


//récupération info user au moment d'appuyer sur le bouton suivant
const dispatch = useDispatch();
//récupérer infos du réducer pour user
const user = useSelector((state) => state.user.value)
//console.log(user);

const handleIntro = (text) => {
  setintroBioAidant(text)
  dispatch(updateAidant({introBioAidant: text}))
}

const handleLongBio = (text) => {
  setlongBioAidant(text)
  dispatch(updateAidant({longBioAidant: text}))
}

const handleAbilities = (text) => {
  setabilitiesAidant(text)
  dispatch(updateAidant({abilitiesAidant: text}))
}


//aller sur page suivante
const handleNext = () => {
  //console.log(user)
  navigation.navigate('AidantProfilScreen3');
};


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
          
           {/* Phrase intro */}
          <View style={styles.phraseIntroContainer}>
            <Text style={styles.firsttitle}>Ma présentation en quelques mots</Text>
            <TextInput
                style={styles.input}
                value={user.introBioAidant}
                onChangeText={text => handleIntro(text)}
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
          <View style={styles.descriptionContainer}>
            <Text style={styles.title}>Ma personnalité incroyable</Text>
            <TextInput
                style={styles.longinput}
                value={user.longBioAidant}
                onChangeText={text => handleLongBio(text)}
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
          <View style={styles.competencesContainer}>
            <Text style={styles.title}>Mes compétences magiques</Text>
            <TextInput
                style={styles.longinput}
                value={user.abilitiesAidant}
                onChangeText={text => handleAbilities(text)}
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.textButton}>Suivant</Text>
            </TouchableOpacity>
          </View>

      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>


  )
}
    //mise en place méthode Dimension pour mettre en % pour faire fonctionner le KeyboardAvoidingView
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center', // par défaut justify-content: 'flex-start', pour que le padding du keyboardavoiding fonctionne il faut le mettre sur flex-end ou center
    },
    phraseIntroContainer: {
      height:windowHeight * 0.15,
    },
    descriptionContainer: {
      height:windowHeight * 0.26,
    },
    competencesContainer: {
      height:windowHeight * 0.26,
    },
    // input
    input: {
      height:windowHeight * 0.10,
      borderColor: '#5ABAB6',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      fontSize: 13,
      marginLeft:20,
      marginRight:25,
      marginBottom:25,
      fontFamily: 'Manrope',
    },
    longinput: {
      height: windowHeight * 0.20,
      borderColor: '#5ABAB6',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      fontSize: 13,
      marginLeft:20,
      marginRight:25,
      marginBottom:25,
      fontFamily: 'Manrope',
    },
      // compteur
    characterCountContainer: {
      position: 'absolute',
      bottom: -10,
      right: 40,
      backgroundColor: 'white',
      borderRadius: 5,
    },
    characterCountText: {
      color: '#868686',
      fontSize: 12,
      fontFamily: 'Manrope',
    },
    //titres
    firsttitle: {
      fontFamily: "Recoleta",
      fontSize: 20,
      color: "#785C83",
      marginLeft: 20,
      marginBottom: 10,
      marginTop: 20,
      height: windowHeight * 0.04,
      width: windowWidth * 0.9,
    },
    title: {
      height: windowHeight * 0.04,
      width: windowWidth * 0.9,
      fontFamily: "Recoleta",
      fontSize: 20,
      color: "#785C83",
      marginLeft: 20,
      marginBottom: 10,
      marginTop: 30,
    },
    //bouton suivant
    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      marginTop: 50,
      height:windowHeight* 0.1,
    },
    button: {
      backgroundColor: '#5ABAB6',
      width: windowWidth * 0.4,
      margin: 20,
      borderRadius: '5%',
      padding: 10,
      alignItems: 'center',
    },
    textButton: {
      fontFamily: 'Manrope',
      fontSize: 16,
      color: 'white',
    },
  
    })