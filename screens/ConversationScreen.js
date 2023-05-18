import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import Mission from "../components/Mission";

export default function ConversationScreen() {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <Mission/>
    </ScrollView>
    </SafeAreaView>
  )}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ffff'
    },
})