import { View, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import ValidateMission from '../components/ValidateMission'

export default function MissionScreen1() {
  return (
<SafeAreaView style={styles.container}>
  <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image
        source={require("../assets/missionsValidees.png")}
                      style={{width: windowWidth * 0.92, height: windowHeight * 0.33}}/>
      <Text style={styles.text}>Vous n’avez pas encore de missions</Text>
      <ValidateMission />
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
  text: {
    color: '#868686',
    fontFamily: 'Manrope',
    fontSize: 15,
    marginTop: 25
},
  })