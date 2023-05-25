import { Dimensions, Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'



export default function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/nanieLogoWhite.png')} />
      <View style={styles.touchContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Connexion', { name: 'Connexion' })} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Connexion</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Inscription')} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Inscription</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.navigate('MissionScreen1')} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>MissionScreen1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MissionScreen2')} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>MissionScreen2</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ParentDisplayProfilScreen')} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>ParentDisplayProfilScreen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AvisScreen')} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>AvisScreen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AidantDisplayProfilScreen')} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>AidantDisplayProfilScreen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ConversationScreen')} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>ConversationScreen</Text>
      </TouchableOpacity> */}
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