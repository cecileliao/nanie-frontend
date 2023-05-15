import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function AidantScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Talents</Text>
      <View style={styles.block}>
        <Text style={styles.title}>Balade</Text>
        <Text style={styles.text}>Sortir avec l’aîné à pied ou en voiture, pour se rendre au parc, magasins, ciné...</Text>
        <FontAwesome name={icon} size={size} color={color} style={styles.icon} />
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  block: {
    width: '80%',
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#785C83',
  },
  text: {
    marginBottom: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 8,
  },
});