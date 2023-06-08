import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment-timezone';
import 'moment/locale/fr';


export default function Mission(props) {

  const BACKEND_ADDRESS = 'nanie-backend.vercel.app';

  const [missionInfos, setMissionInfos] = useState(null);

  useEffect(() => {
    // Effectuez une requête au backend pour récupérer les informations de la mission
    fetch(`http://${BACKEND_ADDRESS}/DetailsMission/${props.idMission}`)
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          // Mettez à jour l'état local avec les informations de la mission
          setMissionInfos(data);
        }
      });
  }, []);

  //Bouton Valider => navigue sur MissionScreen2
  const navigation = useNavigation();
  const handleValidate = () => {
    navigation.navigate('MissionScreen2')
  }

  //Bouton Refuser => retourne sur MessageScreen
  const handleDecline = () => {
    navigation.navigate('TabNavigator', { screen: 'Message' });
  }

  ///////////////////////formatage date
  //formatage de la date pour l'afficher sous format DD/MM/YYYYY
  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
  };

  //formatage de l'heure pour ne pas afficher les secondes
  const formatTime = (date) => {
    // Set l'heure à l'heure de la bonne timezone
    const newDate = moment(date).tz('Europe/Paris');
    // Formater la nouvelle date
    return newDate.format('HH:mm');
  };

  return (
    <View style={styles.container}>
      <View style={styles.block}>
      <View style={styles.dispocontainer}>
        <View style={styles.debutfincontainer}>
          <Text style={styles.textTitleDebutFin}>Debut</Text>
          <Text style={styles.textStart}>{formatDate(missionInfos?.Aidantinfos?.startingDay)}</Text>
          <Text style={styles.textStartHour}>{formatTime(missionInfos?.Aidantinfos?.startingHour)}</Text>
        </View>
        <View style={styles.debutfincontainer}>
          <Text style={styles.textTitleDebutFin}>Fin</Text>
          <Text style={styles.textEndDay}>{formatDate(missionInfos?.Aidantinfos?.endingDay)}</Text>
          <Text style={styles.textEndHour}>{formatTime(missionInfos?.Aidantinfos?.endingHour)}</Text>
        </View>
      </View>   
          <View style={styles.right}>
            <TouchableOpacity style={styles.button} onPress={() => handleValidate()}>
              <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRed} onPress={() => handleDecline()}>
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
  dispocontainer: {
    margin: 10,
  },
  debutfincontainer: {
    flexDirection: "row",
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  textTitleDebutFin: {
    fontSize: 17,
    fontFamily: 'Manrope',
    color: "#868686"
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