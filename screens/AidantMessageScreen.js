import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function AidantMessageScreen() {
  return (
    <View style={styles.container}>
      <Text>AidantMessageScreen</Text>
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