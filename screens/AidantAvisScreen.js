import { StyleSheet, View, Text,  Image, SafeAreaView, ScrollView } from 'react-native'
import React from 'react';
import Avis from "../components/Avis";

export default function AidantAvisScreen() {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
    <Avis/>
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