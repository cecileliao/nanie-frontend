import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/users';
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
  const [introBio, setintroBio] = useState("");
  //description détaillée de l'aidant
  const [longBio, setlongBio] = useState("");
  // //compétences de l'aidant
  const [abilities, setabilities] = useState("");

  //afficher le nombre de caractères restants sur le textInput
  const [shortIntroremainingCharacters, setshortIntroRemainingCharacters] = useState(100);
  const [longIntroremainingCharacters, setlongIntroRemainingCharacters] = useState(300);
  const [abilitiesremainingCharacters, setabilitiesRemainingCharacters] = useState(300);

  //pour le nombre de caractères de la phrase d'introduction
  useEffect(() => {
    const charactersCount = introBio.length;
    const shortremainingCount = 100 - charactersCount;
    setshortIntroRemainingCharacters(shortremainingCount);
  }, [introBio]);

  //pour le nombre de caractères de la description détaillée
  useEffect(() => {
    const charactersCount = longBio.length;
    const longremainingCount = 300 - charactersCount;
    setlongIntroRemainingCharacters(longremainingCount);
  }, [longBio]);

  //pour le nombre de caractères de la description détaillée
  useEffect(() => {
          const charactersCount = abilities.length;
          const abilitiesRemainingCount = 300 - charactersCount;
          setabilitiesRemainingCharacters(abilitiesRemainingCount);
  }, [abilities]);


//récupération info user au moment d'appuyer sur le bouton suivant
const dispatch = useDispatch();
//récupérer infos du réducer pour user
const user = useSelector((state) => state.user.value)
//console.log(user);



//aller sur page suivante
const handleNext = () => {
  dispatch(updateUser({introBio, longBio,
    //pour les sous documents besoin de remettre toutes les infos de l'objet pour ne pas écraser les données déjà récupérées
    aidant: {
      car: user.aidant.car,
      rate: user.aidant.rate,
      abilities: abilities,
    }
  }))
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
                style={styles.introInput}
                value={introBio}
                onChangeText={value => setintroBio(value)} 
                placeholder="Ma phrase d’introduction"
                placeholderTextColor="#868686"
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
                value={longBio}
                onChangeText={value => setlongBio(value)} 
                placeholder="Présentation détaillée de ta personnalité"
                placeholderTextColor="#868686"
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
                value={abilities}
                onChangeText={value => setabilities(value)} 
                placeholder="Description de mes compétences, diplômes, expérience ..."
                placeholderTextColor="#868686"
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
    introInput: {
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