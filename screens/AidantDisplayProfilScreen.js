import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

export default function AidantDisplayScreen() {
  return (
    <View>
      <Text>AidantProfilScreen1</Text>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Suivant</Text>
        </TouchableOpacity>
    </View>
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
    buttonText: {
        color: 'white',
        fontFamily: "Manrope",
      },
        button: {
        backgroundColor: '#5ABAB6',
        padding: 10,
        borderRadius: 8,
        marginTop: 8,
        width: 120,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }); 