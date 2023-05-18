import React , { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Dimensions, Image, TextInput, Button, Platform } from 'react-native';
    // import { moment } from 'moment'; 

const start = '12-07-2023 09:00';
const end = '14-07-2023 21:00';

export default function Mission() {

  return (
    <View style={styles.container}>
      <View style={styles.block}>
          <View style={styles.left}>
            <Text style={styles.text}>Début</Text>
            <Text style={styles.text2}>{start}</Text>
            <Text style={styles.text}>Fin</Text>
            <Text style={styles.text2}>{end}</Text>
          </View>
          <View style={styles.right}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Suivant</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRed}>
              <Text style={styles.buttonText}>Refuser</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        block: {
          width: '90%',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#5ABAB6',
          marginBottom: 8,
          marginTop: 15,
          padding: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
    // content: {
    //   flex: 1,
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   justifyContent: 'space-between',
    // },
    left: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    right: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    text: {
      fontFamily: 'Manrope',
      marginBottom: 4,
    },
    text2: {
      fontFamily: 'Manrope',
      marginBottom: 4,
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#5ABAB6',
      padding: 10,
      borderRadius: 8,
      marginTop: 8,
      width: windowWidth * 0.25,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
    },
    buttonRed: {
      backgroundColor: '#C8716E',
      padding: 10,
      borderRadius: 8,
      marginTop: 8,
      width: windowWidth * 0.25,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    });