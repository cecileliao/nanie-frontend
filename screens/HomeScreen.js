import { Dimensions, Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'



export default function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/nanieLogoWhite.png')} />
      <View style={styles.touchContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Connexion', { name: 'Connexion' })} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Connexion</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Inscription')} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Inscription</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#5ABAB6',
      alignItems: 'center',
      justifyContent: 'center',
    },
    touchContainer: {
      flex: 1,
      flexWrap: 'wrap',
    },
    image: {
      width: windowWidth * 0.8,
      resizeMode: 'contain',
    },
    button: {
      backgroundColor: '#785C83',
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
    }

    });