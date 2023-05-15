import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'



export default function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nanie</Text>
      <TouchableOpacity onPress={() => navigation.navigate('TabNavigator')} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Go to App</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
        width: '80%',
        fontSize: 38,
        fontWeight: '600',
        fontFamily:'Recoleta'
      },

    });