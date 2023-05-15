import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nanie</Text>
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
      },

    });