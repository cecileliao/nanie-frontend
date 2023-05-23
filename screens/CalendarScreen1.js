import { Modal, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, addDispo,updateDispo } from '../reducers/users';
import Disponibilite from '../components/Disponibilite';
import moment from 'moment';
import 'moment/locale/fr';

//importation de la modale pour récupérer date et heure de la disponibilité
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function CalendarScreen1() {
  //récupération du token dans le store quand l'utilisateur se connecte
  const user = useSelector((state) => state.user.value);


  //récupération info user du reducer
  const dispatch = useDispatch();


  //afficher (ou fermer) une modal quand on clique sur le bouton date de dispo
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

///////////ajout d'une disponibilité quand on appuie sur le boutton valider
  const validateModal = () => {

      /////Utilisation de l'API moment pour formater les dates correctement dans MongoDB
        const startdate = moment(startSelectedDate); 
        const enddate = moment(endSelectedDate);
        const startingDay = startdate.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        const startingHour = startdate.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        const endingDay = enddate.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        const endingHour = enddate.format('YYYY-MM-DDTHH:mm:ss.SSSZ');


      // Ajout d'un disponibilité d'une disponibilite via route POST
      fetch(`http://192.168.10.139:3000/aidantUsers/addDispo/${user.token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startingDay,
          endingDay,
          startingHour,
          endingHour,
        }),
      }).then(response => response.json())
        .then(data => {

          if (data.result) {
            //si création de dispo besoin de l'envoyer dans le reducer
            //besoin de maper car on souhaite récupérer notre nouvelle dispo et son id crée par MongoDB
            const updatedAvailabilities = data.UserDispos.map((dispoData,i) => ({
              key: i,
              startingDay: dispoData.startingDay,
              endingDay: dispoData.endingDay,
              startingHour: dispoData.startingHour,
              endingHour: dispoData.endingHour,
              availabilityId: dispoData._id
          }));  
          // Mise à jour des disponibilités de l'utilisateur via le reducer
          dispatch(updateDispo(updatedAvailabilities ));
            
            //la modale se referme après avoir récupérer les infos de dispos
            setModalVisible(false);
            
          }
        });
  };


  ///////////////Affichage des dates validées



useEffect(() => {
  fetch(`http://192.168.10.139:3000/aidantUsers/dispos/${user.token}`)
    .then(response => response.json())
    .then(data => {
      if (data.result) {

        //envoi dans le reducer des disponibilités
        //créer un tableau updatedAvailabilities qui contient tous les objets de disponibilité avec les propriétés requises
        const updatedAvailabilities = data.UserDispos.map(dispoData => ({
          startingDay: dispoData.startingDay,
          endingDay: dispoData.endingDay,
          startingHour: dispoData.startingHour,
          endingHour: dispoData.endingHour,
          availabilityId: dispoData._id
      }));

                    
      dispatch(updateDispo( updatedAvailabilities));

      }
    });
}, []);

//Création de Dispo en dehors du useEffect pour pouvoir le récupérer via le props dans le composant Disponibilité

const Dispo = user.availabilities.map((dispoData, i) => {
  return (
    <Disponibilite
      key = {i}
      startingDay={dispoData.startingDay}
      startingHour={dispoData.startingHour}
      endingDay={dispoData.endingDay}
      endingHour={dispoData.endingHour}
      availabilityId={dispoData.availabilityId}
    />
  );
});


  //////////////date de début via DatePickerModal

  //etat pour récupérer dates de début DateTimePicker (initialisé pour récupérer une nouvelle date)
  const [startSelectedDate, setStartSelectedDate] = useState(undefined);

 //état pour rendre ou pas composant date picker visible (si suppression via bouton)
 const [startDatePickerVisible, setStartDatePickerVisible] = useState(false);
  
  //appel du composant DatePicker isVisible={StartdatePickerVisible}
  const showStartDatePicker = () => {
    setStartDatePickerVisible(true); //dans isVisible du composant
  };


  //click sur confirmer: validation de la date par l'utilisateur (et fermeture de la modal)
  const handleStartConfirm = (date) => {
    setStartSelectedDate(date); //configure date de début
    hideStartDatePicker(); //cache la modale 
  };
  
  

  //click sur confirmer ou annuler: cache DatePicker de début 
  //appeler directement onCancel={StarthideDatePicker}
  //appeler indrectement dans onConfirm={StarthandleConfirm}
  const hideStartDatePicker = () => {
    setStartDatePickerVisible(false); //dans isVisible du composant
  };



  ///////////////////////date de fin via DatePickerModal

  //etat pour récupérer date de fin DateTimePicker (initialisé pour récupérer une nouvelle date)
  const [endSelectedDate, setEndSelectedDate] = useState(undefined);

   //état pour rendre ou pas composant date picker visible (si suppression via bouton)
 const [endDatePickerVisible, setEndDatePickerVisible] = useState(false);

   //appel du composant DatePicker isVisible={StartdatePickerVisible}
   const showEndDatePicker = () => {
    setEndDatePickerVisible(true); //dans isVisible du composant
  };

    //click sur confirmer: validation de la date par l'utilisateur (et fermeture de la modal)
    const handleEndConfirm = (date) => {
      setEndSelectedDate(date); //configure date de début
      hideEndDatePicker(); //cache la modale 
    };

      //click sur confirmer ou annuler: cache DatePicker de début 
  //appeler directement onCancel={StarthideDatePicker}
  //appeler indrectement dans onConfirm={StarthandleConfirm}
  const hideEndDatePicker = () => {
    setEndDatePickerVisible(false); //dans isVisible du composant
  };


  ///////////////////////formatage date pour l'affichage
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
      <TouchableOpacity style={styles.buttonPurple} onPress={openModal}>
        <Text style={styles.buttonText}>+ Date de disponibilité</Text>
      </TouchableOpacity>


      <View>
      {Dispo.length > 0 ? <View style={styles.dispoContainerContainer}>{Dispo}</View> : <View><Text style={styles.text}>Renseigner votre première disponibilité</Text></View>}
      </View>

      <Modal visible={modalVisible} onRequestClose={closeModal} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Contenu de la modale */}
              <Text style={styles.modalText}>Ajout d'une nouvelle disponibilité</Text>
              <Text style={{fontFamily: "Manrope", color: "#868686", fontSize: 14, marginBottom: 10, marginTop: 10}}>Sélection ou modification des dates et heures</Text>

              {/* Choix de la date de début */}

              <TouchableOpacity style={styles.startEndContainer} onPress={showStartDatePicker}>
                  <View style={styles.startButton}> 
                  <Text style={styles.startEndTextButton}>Début</Text>
                  </View>
                  {startSelectedDate && (
                  //affiche la date que si une date a déjà été sélectionnée
                  <Text style={styles.startEndTextDate}>
                    {formatDate(startSelectedDate)} {formatTime(startSelectedDate)}
                  </Text>
                )}
              </TouchableOpacity>


              <DateTimePickerModal
                date={startSelectedDate} //valeur de la date selectionnée (initialisé à null)
                locale="fr_FR" //sur iOS pour avoir les dates en français
                is24Hour //sur Android
                display="inline" //pour les iOS > 14
                isVisible={startDatePickerVisible} //initialisé à false
                mode="datetime" //mode avec date et heure (datetime)
                confirmTextIOS = "Confirmer" //sur iOs
                cancelTextIOS = "Annuler" //sur iOs
                onConfirm={handleStartConfirm} //permet de confirmer date et heure
                onCancel={hideStartDatePicker} //si on ne valide pas va cacher la modale
              />


                  {/* Choix de la date de fin */}
        
              <TouchableOpacity style={styles.startEndContainer} onPress={showEndDatePicker}>
                  <View style={styles.startButton}> 
                  <Text style={styles.startEndTextButton}>Fin</Text>
                  </View >
                  {endSelectedDate && (
                  //affiche la date que si une date a déjà été sélectionnée
                  <Text style={styles.startEndTextDate}>
                    {formatDate(endSelectedDate)} {formatTime(endSelectedDate)}
                  </Text>
                )}
              </TouchableOpacity>

              <DateTimePickerModal
                date={endSelectedDate} //valeur de la date selectionnée (initialisé à null)
                locale="fr_FR" //sur iOS pour avoir les dates en français
                is24Hour //sur Android
                display="inline" //pour les iOS > 14
                isVisible={endDatePickerVisible} //initialisé à false
                mode="datetime" //mode avec date et heure (datetime)
                confirmTextIOS = "Confirmer" //sur iOs
                cancelTextIOS = "Annuler" //sur iOs
                onConfirm={handleEndConfirm} //permet de confirmer date et heure
                onCancel={hideEndDatePicker} //si on ne valide pas va cacher la modale
              />

              <View style={styles.smallmodalContainer}>
                <TouchableOpacity style={styles.validateButton} onPress={validateModal}>
                  <Text style={styles.textcloseButton}>Valider</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.textcloseButton}>Annuler</Text>
                </TouchableOpacity>
              </View>
            
            </View>
          </View>
      </Modal>

      
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
    flexGrow: 1, // Utilisez flexGrow pour permettre au contenu de se développer en hauteur
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: Dimensions.get('window').height, // Ajoutez une hauteur minimale pour permettre le défilement vertical
  },
  dateContainer: {
    borderWidth: 1.2,
    borderRadius: 5,
    borderColor: '#5ABAB6',
    marginTop: 10,
    marginBottom: 10,
  },
  smalldateContainer: {
    flexDirection: 'row',
    width: windowWidth * 0.9,
    justifyContent: 'space-around', 
    alignItems: 'center',
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

  dateText: {
    fontFamily: 'Manrope',
    fontSize: 17,
},
  startEndText: {
  fontFamily: 'Manrope',
  fontSize: 17,
  color: "#868686",
},

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Couleur de fond semi-transparente
},
  smallmodalContainer:{
    flexDirection: "row",
    justifyContent: 'space-around', 
    alignItems: 'center',

  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: windowWidth * 0.9,
},
  startEndContainer:{
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30, 
},
  startEndTextButton: {
  fontFamily: "Manrope",
  fontSize: 16,
  color: "#FFFF",
},

  startButton: {
    borderRadius: 8,
    borderColor: '#785C83',
    backgroundColor: '#785C83',
    padding: 15,
    width: windowWidth * 0.25,
    alignItems: "center"
  },
  startEndTextDate: {
    fontFamily: "Manrope",
    fontSize: 17,
    color: "#000000",
    marginLeft: 20,
  },
  modalText: {
    fontFamily: 'Manrope',
    fontSize: 20,
    marginBottom: 10,
},
  closeButton: {
    backgroundColor: '#C8716E',
    padding: 10,
    borderRadius: 5,
    width: windowWidth * 0.3,
    alignItems: "center"
},
  textcloseButton: {
    fontSize: 16,
    color: '#fff',
},
validateButton: {
  backgroundColor: '#5ABAB6',
  padding: 10,
  borderRadius: 5,
  width: windowWidth * 0.3,
    alignItems: "center"
},


  })