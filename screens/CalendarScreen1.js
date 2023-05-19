import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar } from 'react-native'
import React from 'react'

export default function CalendarScreen1() {
  return (
<SafeAreaView style={styles.container}>
  <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TouchableOpacity style={styles.buttonPurple}>
        <Text style={styles.buttonText}>+ Date de disponibilité</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Renseigner votre première disponibilité</Text>
  </ScrollView>
</SafeAreaView>
  )
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPurple: {
    backgroundColor: '#785C83',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    width: windowWidth * 0.7,
    height: windowHeight * 0.08,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  buttonText: {
      color: 'white',
      fontFamily: 'Manrope',
      fontSize: 20
  },
  text: {
    color: '#868686',
    fontFamily: 'Manrope',
    fontSize: 15,
    marginTop: 25
},
  })