import { Modal, Image, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addSearchDate, addSearchResult } from '../reducers/users';
import Disponibilite from '../components/Disponibilite';
//importation de la modale pour récupérer date et heure de la disponibilité
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import 'moment/locale/fr';
import Slider from '@react-native-community/slider';

export default function RechercheScreen1({ navigation }) {

    const BACKEND_ADDRESS = '192.168.10.128:3000';

    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();

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

    //afficher (ou fermer) une modal quand on clique sur le bouton date de dispo
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };
///////////ajout d'une recherche quand on appuie sur le boutton valider
const validateModal = () => {

  /////Utilisation de l'API moment pour formater les dates correctement dans MongoDB
  const startdate = moment(startSelectedDate); 
  const enddate = moment(endSelectedDate);
  const startingDay = startdate.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  const startingHour = startdate.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  const endingDay = enddate.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  const endingHour = enddate.format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    dispatch(addSearchDate(
      {
        startingDay,
        endingDay,
        startingHour,
        endingHour,
      }
    ))
    
    //la modale se referme après avoir récupérer les infos de dispos
    setModalVisible(false);
};

const DispoSearch = () => {
  return (
    <Disponibilite
    startingDay={user.searchDate.startingDay}
    startingHour={user.searchDate.startingHour}
    endingDay={user.searchDate.endingDay}
    endingHour={user.searchDate.endingHour}
    />
  );
}

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

  //Changement de couleur de mes talents quand on clique dessus
  //pour mobility
  const [isClickedMobility, setIsClickedMobility] = useState(false);

  const handleImageClickMobility = () => {
    setIsClickedMobility(!isClickedMobility);
  };

  //pour alimentation
  const [isClickedAlimentation, setIsClickedAlimentation] = useState(false);

    const handleImageClickAlimentation = () => {
      setIsClickedAlimentation(!isClickedAlimentation);
    };

  //pour hygiene
  const [isClickedHygiene, setIsClickedHygiene] = useState(false);

    const handleImageClickHygiene = () => {
      setIsClickedHygiene(!isClickedHygiene);
    };

  //pour divertissement
  const [isClickedDivertissement, setIsClickedDivertissement] = useState(false);

    const handleImageClickDivertissement = () => {
      setIsClickedDivertissement(!isClickedDivertissement);
    };

//slider pour le taux horaire
const [sliderValue, setSliderValue] = useState(15);
const handleSliderChange = (value) => {
  setSliderValue(value);
};

//slider pour la distance
const [sliderValueDistance, setSliderValueDistance] = useState(0);
const handleSliderChangeDistance = (value) => {
  setSliderValueDistance(value);
};
    

//menu dropdown pour le sexe
const [sexe, setSexe] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Femme', value: 'femme'},
    {label: 'Homme', value: 'homme'},
    {label: 'Indifférent', value: 'indifférent'},
  ]);

//Passer sur la page de recherche
  const handleResearch = () => {

      /////Utilisation de l'API moment pour formater les dates correctement dans MongoDB
  const startdate = moment(startSelectedDate); 
  const enddate = moment(endSelectedDate);
  const startingDay = startdate.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  const startingHour = startdate.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  const endingDay = enddate.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  const endingHour = enddate.format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    fetch(`http://${BACKEND_ADDRESS}/aidantUsers/search/${startingDay}/${endingDay}`)
    .then(response => response.json())
    .then(data => {

      const searchResults = data.dispos.map(item => ({
        token: item.token,
        name: item.name,
        firstName: item.firstName,
        aidant: { rate: item.aidant.rate },
        photo: item.photo,
        averageNote: item.averageNote,
        availabilities: [{
          startingDay: item.availabilities.startingDay,
          endingDay: item.availabilities.endingDay
        }],
        missions: item.missions.length
      }));
  
      dispatch(addSearchResult(searchResults));
      // console.log('###',dispatch(addSearchResult(searchResults)));

      // for (let i=0; i< data.length; i++){
      //   console.log('coucou')
      //   console.log('data', data)
      //   dispatch(addSearchResult({
      //     name: data.dispos[i].name,
      //     fistName: data.dispos[i].firstName,
      //     aidant: {rate: data.dispos[i].aidant.rate},
      //     averageNote: data.dispos[0].averageNote,
      //     photo: data.dispos[i].photo,
      //     availabilities: [{startingDay: data.dispos[i].availabilities.startingDay, endingDay: data.dispos[i].availabilities.endingDay}]
      //   }))
      //   console.log('filtre',  dispatch(addSearchResult({
      //     name: data.dispos[i].name,
      //     fistName: data.dispos[i].firstName,
      //     aidant: {rate: data.dispos[i].aidant.rate},
      //     averageNote: data.dispos[i].averageNote,
      //     photo: data.dispos[i].photo,
      //     availabilities: [{startingDay: data.dispos[i].availabilities.startingDay, endingDay: data.dispos[i].availabilities.endingDay}]
      //   })))
      //   dispatch(filterDispo({startingDay, endingDay}));
      })
    
      navigation.navigate('RechercheScreen2');

  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>

      <View style={styles.filterTitleContainer}>
        <Text style={styles.title}>Filtres</Text>
      </View>

      {/* filtre date */}
      <View style={styles.filterDateContainer}>
        <TouchableOpacity style={styles.buttonPurple} onPress={openModal}>
            <Text style={styles.buttonText}>+ Dates de recherche</Text>
        </TouchableOpacity>
      </View>

      <View>
      {user.searchDate && (
          <View style={styles.DateResumeContainer}>
            <DispoSearch />
          </View>
        )}
      </View>

      {/* Modal de date */}
      <Modal visible={modalVisible} onRequestClose={closeModal} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Contenu de la modale */}
              <Text style={styles.modalText}>Dates de recherche</Text>
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

      {/* filtre talents */}
      <View style={styles.talentscontainer}>

                  <Text style={{fontFamily: "Recoleta",fontSize:20, marginLeft: 20, marginTop: 10,}}>Talents recherchés</Text>
                  <View style={styles.doubleTalents}>
                    <TouchableOpacity style={styles.talent} onPress={handleImageClickMobility}>
                      <Image
                      source={require("../assets/person-cane-solid.png")}
                      style={[
                        styles.imageMobility,
                        { tintColor: isClickedMobility ? '#5ABAB6' : '#868686' }
                      ]}/>
                      <Text style={[styles.textFilterAbilities, { color: isClickedMobility ? '#5ABAB6' : '#000000' }]}>Balade</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.talent} onPress={handleImageClickAlimentation}>
                      <Image
                      source={require("../assets/carrot-solid.png")}
                      style={[
                        styles.imageAlimentation,
                        { tintColor: isClickedAlimentation ? '#5ABAB6' : '#868686' }
                      ]}/>
                      <Text style={[styles.textFilterAbilities, { color: isClickedAlimentation ? '#5ABAB6' : '#000000' }]}>Alimentation</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.doubleTalents}>
                        <TouchableOpacity style={styles.talent} onPress={handleImageClickHygiene}>
                          <Image
                          source={require("../assets/pump-soap-solid.png")}
                          style={[
                            styles.imageHygiene,
                            { tintColor: isClickedHygiene ? '#5ABAB6' : '#868686' }
                          ]}/>
                          <Text style={[styles.textFilterAbilities, { color: isClickedHygiene ? '#5ABAB6' : '#000000' }]}>Hygiène</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.talent} onPress={handleImageClickDivertissement}>
                          <Image
                            source={require("../assets/music-solid.png")}
                            style={[
                              styles.imageDivertissement,
                              { tintColor: isClickedDivertissement ? '#5ABAB6' : '#868686' }
                            ]}
                          />
                          <Text style={[styles.textFilterAbilities, { color: isClickedDivertissement ? '#5ABAB6' : '#000000' }]}>Divertissement</Text>
                        </TouchableOpacity>
                        
                  </View>
      </View>

      {/* filtre sur le taux horaire */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Taux horaire</Text>
        
        <View style={{ alignItems: 'center' }}>
          <Slider
            value={sliderValue}
            minimumValue={15}
            maximumValue={80}
            onValueChange={handleSliderChange}
            minimumTrackTintColor="#5ABAB6"
            thumbTintColor="#5ABAB6"
            style={{ width: 200 }}
          />
        </View>
        {sliderValue !== 15 ?<Text style={styles.textFilter}>{parseInt(sliderValue)} €</Text> : <Text></Text>}
      </View>

      {/* filtre sur la distance */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Distance</Text>
        
        <View style={{ alignItems: 'center' }}>
          <Slider
            value={sliderValueDistance}
            minimumValue={0}
            maximumValue={500}
            onValueChange={handleSliderChangeDistance}
            minimumTrackTintColor="#5ABAB6"
            thumbTintColor="#5ABAB6"
            style={{ width: 200 }}
          />
        </View>
        {sliderValueDistance !== 0 ? <Text style={styles.textFilter}>{parseInt(sliderValueDistance)}</Text> : <Text></Text>}
      </View>

      {/* filtre sur le sexe */}
      <View style={styles.filterSexeContainer}>
          <Text style={styles.filterTitle}>Sexe</Text>
          <DropDownPicker style={{width: 120, borderColor: '#5ABAB6', alignSelf: "center", marginTop: 15}} 
            placeholderStyle={{color: "grey"}} 
            disabledStyle={{opacity: 0.5}}
            open={open}
            value={value}
            items={items}
            placeholder="Sexe"
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            dropDownContainerStyle={{ width: 120, marginLeft: 15, borderColor: '#5ABAB6', backgroundColor: 'white', opacity: 1, alignSelf: "center", marginTop: 15 }}
            onSelectItem={(item) => {
              setSexe(item.value)}
            }/>
      </View>

      {/* Bouton suivant */}
      <View style={styles.reseatchButton}>
            <TouchableOpacity style={styles.buttonResearch} onPress={handleResearch}>
              <Text style={styles.textButtonResearch}>Recherche</Text>
            </TouchableOpacity>
      </View>

    </ScrollView>
    </SafeAreaView>
  )}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ffff'
    },
    filterContainer: {
      justifyContent: 'center',
      alignItems: "center",
      marginTop: 25,
    },
    filterTitleContainer: {
      justifyContent: 'center',
      alignItems: "center",
      marginTop: 15,
    },
    filterDateContainer: {
      justifyContent: 'center',
      alignItems: "center",
      marginTop: 25,
      marginBottom: 25,
    },
    DateResumeContainer:{
      justifyContent: 'center',
      alignItems: "center",
    },
    filterSexeContainer: {
      justifyContent: 'center',
      alignItems: "center",
      marginTop: 15,
    },
    reseatchButton: {
      justifyContent: 'center',
      alignItems: "center",
      marginTop: 30,
      marginBottom: 30,
      zIndex: -1,
    },
  buttonPurple: {
      backgroundColor: '#785C83',
      borderRadius: 8,
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
  buttonResearch: {
      backgroundColor: '#5ABAB6',
      width: windowWidth * 0.4,
      margin: 20,
      borderRadius: '5%',
      padding: 10,
      alignItems: 'center',
    },
  textButtonResearch: {
      fontFamily: 'Manrope',
      fontSize: 16,
      color: 'white',
    },
  text: {
      color: '#868686',
      fontFamily: 'Manrope',
      fontSize: 15,
      marginTop: 25
  },
  textFilterAbilities:{
    fontFamily: "Manrope",
    fontSize: 15,
    marginLeft: 25,
   },
   textFilter:{
    fontFamily: "Manrope",
    color: '#5ABAB6',
    fontSize: 18,
   },
  talentscontainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    borderWidth: 1.5,
    borderRadius: 4,
    borderColor: "#5ABAB6"
  },
  doubleTalents: {
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: "center",
    padding: 10
},
  talent:{
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: "center",
    padding: 10
},
  title: {
    fontFamily: "Recoleta",
    fontSize: 25,
    marginBottom: 10,
  },
  filterTitle: {
    fontFamily: "Recoleta",
    fontSize: 20,
  },
  imageAlimentation: {
    height: windowHeight * 0.035,
    width: windowWidth * 0.075,
   },
imageMobility: {
    height: windowHeight * 0.040,
    width: windowWidth * 0.075,
    tintColor: "#868686"
   },
imageHygiene: {
    height: windowHeight * 0.040,
    width: windowWidth * 0.075,
    tintColor: "#868686"
   },
imageDivertissement: {
    height: windowHeight * 0.035,
    width: windowWidth * 0.075,
    tintColor: "#868686"
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