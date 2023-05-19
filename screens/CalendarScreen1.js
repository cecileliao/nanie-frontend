import { Image, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar } from 'react-native'
import React, { useState, useEffect }  from 'react'

//importation de la modale pour récupérer date et heure de la disponibilité
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function CalendarScreen1() {

  //etat pour récupérer date de DateTimePicker (initialisé pour récupérer une nouvelle date)
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Création d'un état pour supprimer la date sélectionnée
  const [showDate, setShowDate] = useState(true);
  //Création d'un fonction pour supprimer la view qui englobe la date selectionnée quand on clique sur le boutton 
  const handleDeleteDate = () => {
  setShowDate(false);
  };

  //pour rendre la modal de date de visible uniquement quand on le souhaite
  //permet de réinitialiser date quand on clique sur le bouton delete
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisible(true);
    setShowDate(true);
    setSelectedDate(new Date())
  };
  //cache la modal
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  //fonction de validation de la date par l'utilisateur (et fermeture de la modal)
  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  //formatage de la date pour l'afficher sous format DD/MM/YYYYY
  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  //formatage de l'heure pour ne pas afficher les secondes
  const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit', hour12: false };
    return date.toLocaleTimeString('fr-FR', options);
  };


  return (
<SafeAreaView style={styles.container}>
  <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TouchableOpacity style={styles.buttonPurple} onPress={showDatePicker}>
        <Text style={styles.buttonText}>+ Date de disponibilité</Text>
      </TouchableOpacity>
      <View style={styles.dateContainer}>
    {showDate && selectedDate !== null ? (
      // slectedDate: si date selectionnée
      //showDate = true : si on souhate afficher la view avec la date
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          {formatDate(selectedDate)} {formatTime(selectedDate)}
        </Text>
        <TouchableOpacity onPress={handleDeleteDate}>
          <Image
            source={require("../assets/delete.png")}
            style={{width: 50, height: 50}}
          />
        </TouchableOpacity>
      </View>
    ) : (
      //selectedDate = null si aucune date selectionnée
      //quand on clique sur la croix showDate = false
      // = on ne souhate plus afficher la view avec la date
      <Text style={styles.text}>Renseigner votre première disponibilité</Text>
      )}
      </View>
      <DateTimePickerModal
        date={selectedDate} //valeur de la date selectionnée (initialisé à null)
        locale="fr_FR" //sur iOS pour avoir les dates en français
        is24Hour //sur Android
        display="inline" //pour les iOS > 14
        isVisible={datePickerVisible} //initialisé à false
        mode="datetime" //mode avec date et heure (datetime)
        onConfirm={handleConfirm} //permet de confirmer date et heure
        onCancel={hideDatePicker} //si on ne valide pas va cacher la modale
      />
  </ScrollView>
</SafeAreaView>
  )
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPurple: {
    backgroundColor: '#785C83',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    width: windowWidth * 0.7,
    height: windowHeight * 0.08,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  buttonText: {
      color: 'white',
      fontFamily: 'Manrope',
      fontSize: 20
  },
  text: {
    color: '#868686',
    fontFamily: 'Manrope',
    fontSize: 15,
    marginTop: 25
},
  })