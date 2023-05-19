import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function MissionScreen2() {
  return (
    <View>
      <Text>MissionScreen2</Text>
      <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Suivant</Text>
          </TouchableOpacity>
    </View>
  )
}