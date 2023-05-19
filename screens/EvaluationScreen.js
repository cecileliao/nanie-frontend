import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function EvaluationScreen() {
  return (
    <View>
      <Text>EvaluationScreen</Text>
      <TouchableOpacity>
            <Text>Suivant</Text>
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
  })