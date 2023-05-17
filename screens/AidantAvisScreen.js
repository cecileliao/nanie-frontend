import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function AidantAvisScreen() {
  return (
    <View>
      <Text>AidantProfilScreen1</Text>
      <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Suivant</Text>
          </TouchableOpacity>
    </View>
  )
}