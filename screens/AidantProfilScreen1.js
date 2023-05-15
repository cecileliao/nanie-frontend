import { View, Text } from 'react-native'
import React from 'react'

export default function AidantProfilScreen1() {
  return (
    <View>
      <Text>AidantProfilScreen1</Text>
      <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Suivant</Text>
          </TouchableOpacity>
    </View>
  )
}