import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import Mission from "../components/Mission";
import Chat from "../components/Chat";

export default function ConversationScreen() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
    <ScrollView>
      <Mission/>
      <Chat/>
    </ScrollView>
    </KeyboardAvoidingView>
  )}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ffff'
    },
})