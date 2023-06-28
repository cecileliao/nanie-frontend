import { View, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, Dimensions, KeyboardAvoidingView } from 'react-native'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState, useEffect } from 'react'

export default function EvaluationScreen({ navigation, route }) {
  const handleValidate = () => {
    navigation.navigate('TabNavigator' , { screen: 'Mission' });
  }
    //récupération des infos sur la page missions
    const { photo, firstName, lastName } = route.params;

    //mise en place d'un système d'évaluation via des coeurs 
    const [rating, setRating] = useState(0);

    const handleRating = (selectedRating) => {
      setRating(selectedRating);
    };
    //evaluation
    const [evaluation, setEvaluation] = useState("");

    //afficher le nombre de caractères restants sur le textInput
    const [evaluationRemainingCharacters, setEvaluationRemainingCharacters] = useState(300);

      //pour le nombre de caractères de la phrase d'introduction
  useEffect(() => {
    const charactersCount = evaluation.length;
    const evaluationRemainingCharacters = 300 - charactersCount;
    setEvaluationRemainingCharacters(evaluationRemainingCharacters);
  }, [evaluation]);



  return (
<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
      <Image source={{uri: photo}} style={{ width: 120, height: 120, borderRadius: 50, marginBottom: 15, marginTop: 15 }} />
      <Text style={styles.title}>Evaluer votre expérience</Text>
      <Text style={styles.title}>avec {firstName} {lastName}</Text>
    <View>
      <View style={{ flexDirection: "row", justifyContent:"center", marginTop: 20 }}>
        {[1, 2, 3, 4, 5].map((index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleRating(index)}
            style={{ marginRight: 5}}
          >
            <FontAwesomeIcon
              icon={faHeart}
              color={index <= rating ? '#785C83' : '#D9D9D9'}
              size={30}
            />
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
                style={styles.input}
                value={evaluation}
                onChangeText={value => setEvaluation(value)} 
                placeholder="Avis sur mon expérience"
                placeholderTextColor="#868686"
                textAlignVertical="top" //sur android pour center le placeholder en haut
                multiline={true} //sur ios pour center le placeholder en haut
                maxLength={300} //taille max de la phrase
      />
        <View style={styles.characterCountContainer}>
            <Text style={styles.characterCountText}>{evaluationRemainingCharacters}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleValidate}>
            <Text style={styles.buttonText}>Confirmer</Text>
          </TouchableOpacity>
    </KeyboardAvoidingView>
</TouchableWithoutFeedback>
  )
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#5ABAB6',
    width: windowWidth * 0.24,
    borderRadius: '4%',
    padding: 8,
    marginLeft: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Manrope',
    fontSize: 14,
    color: 'white',
  },
  title: {
    fontFamily: 'Recoleta',
    fontSize: 20,
    color: '#785C83',
  },
  input: {
    height:windowHeight * 0.25,
    width:windowWidth * 0.90,
    borderColor: '#5ABAB6',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 13,
    marginLeft:20,
    marginRight:25,
    marginTop:35,
    marginBottom:25,
    fontFamily: 'Manrope',
  },
       // compteur
       characterCountContainer: {
        position: 'absolute',
        bottom: 35,
        right: 40,
        backgroundColor: 'white',
        borderRadius: 5,
      },
      characterCountText: {
        color: '#868686',
        fontSize: 12,
        fontFamily: 'Manrope',
      },
  })