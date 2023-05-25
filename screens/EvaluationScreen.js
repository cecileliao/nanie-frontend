import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'

export default function EvaluationScreen() {
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Evaluer Hervé Daniel</Text>
      <TextInput
                style={styles.input}
                value={evaluation}
                onChangeText={value => setEvaluation(value)} 
                placeholder="Ma phrase d’introduction"
                placeholderTextColor="#868686"
                textAlignVertical="top" //sur android pour center le placeholder en haut
                multiline={true} //sur ios pour center le placeholder en haut
                maxLength={300} //taille max de la phrase
      />
      <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Confirmer</Text>
          </TouchableOpacity>
    </SafeAreaView>
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
    fontSize: 22,
    color: '#785C83',
  },
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
  })