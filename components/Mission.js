import React , { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Dimensions, Image, TextInput, Button, Platform } from 'react-native';
// import { moment } from 'moment'; 
import { useNavigation } from '@react-navigation/native';


export default function Mission() {
  const navigation = useNavigation();
  const handleValidate = () => {
    navigation.navigate('MissionScreen2')
  }
  return (
    <View style={styles.container}>
      <View style={styles.block}>
      <View style={styles.dispocontainer}>
          <View style={styles.debutfincontainer}>
                <Text style={styles.textDebutFin}>Debut</Text>
                <Text style={styles.textStart}>03-06-2023</Text>
                <Text style={styles.textStartHour}>09:00</Text>
          </View>
          <View style={styles.debutfincontainer}>
                <Text style={styles.textDebutFin}>Fin</Text>
                <Text style={styles.textEndDay}>03-06-2023</Text>
                <Text style={styles.textEndHour}>18:00</Text>
          </View> 
      </View>   
          <View style={styles.right}>
            <TouchableOpacity style={styles.button} onPress={handleValidate}>
              <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRed}>
              <Text style={styles.buttonText}>Refuser</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        block: {
          width: windowWidth * 0.9,
          height: windowHeight * 0.13,
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
  debutfincontainer: {
          flexDirection: "row",
          alignItems: 'center',
          marginBottom: 15,
          marginTop: 10,
  },
  dispocontainer: {
          margin: 10,
  },
    right: {
      alignItems: 'center',
      marginRight: 5
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
    textDebutFin: {
      fontSize: 17,
      fontFamily: 'Manrope',
      color: "#868686"
    },
    textStart: {
      fontSize: 17,
      fontFamily: 'Manrope',
      marginLeft: 12,
    },
    textEndDay: {
      fontSize: 17,
      fontFamily: 'Manrope',
      marginLeft: 36,
    },
    textEndHour: {
      fontSize: 17,
      fontFamily: 'Manrope',
      marginLeft: 20,
    },
    textStartHour: {
      fontSize: 17,
      fontFamily: 'Manrope',
      marginLeft: 20,
    },
    button: {
      backgroundColor: '#5ABAB6',
      padding: 10,
      borderRadius: 5,
      width: windowWidth * 0.22,
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
      borderRadius: 5,
      marginTop: 12,
      width: windowWidth * 0.22,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    });