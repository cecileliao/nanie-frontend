import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'   
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment-timezone';
import 'moment/locale/fr';


export default function MissionScreen2() {

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

  const BACKEND_ADDRESS = '192.168.10.128:3000';
  const user = useSelector((state) => state.user.value);

  //stocker les données de la mission
  const [missionInfos, setMissionInfos] = useState(null);

  //récupérer infos de la mission
  useEffect(() => {
    console.log('search', user.idMission)
    fetch(`http://${BACKEND_ADDRESS}/DetailsMission/${user.idMission}`)
      .then(response => response.json())
      .then(data => {
        console.log("missionsinfo", data)
        if (data.result) {
          setMissionInfos(data);
        }
      });
  }, []);



  return (
    <View style={styles.container}>
      <View style={styles.smallcontainer}>
      <Text>Rappel de la mission</Text>
      <Text style={styles.text}>{formatDate(missionInfos?.Aidantinfos?.startingDay)}</Text>
      <Text style={styles.text}>{formatDate(missionInfos?.Aidantinfos?.endingDay)}</Text>
      <Text style={styles.text}>{formatTime(missionInfos?.Aidantinfos?.startingDay)}</Text>
      <Text style={styles.text}>{formatTime(missionInfos?.Aidantinfos?.endingDay)}</Text>
      </View>

      <Image 
            source={{ uri: missionInfos?.Aidantinfos?.idAidant.photo }} 
            style={styles.imageProfil} />
      <Text style={styles.text}>{missionInfos?.Aidantinfos?.idAidant.firstName}</Text>
      <Text style={styles.text}>{missionInfos?.Aidantinfos?.idAidant.name}</Text>
      <Text style={styles.text}>{missionInfos?.Aidantinfos?.idAidant.city}</Text>
      <Text style={styles.text}>{missionInfos?.Aidantinfos?.idAidant.zip}</Text>

      <Image 
            source={{ uri: missionInfos?.Aidantinfos?.idParent.photo }} 
            style={styles.imageProfil} />
      <Text style={styles.text}>{missionInfos?.Aidantinfos?.idParent.parent.nameParent}</Text>
      <Text style={styles.text}>{missionInfos?.Aidantinfos?.idParent.parent.firstNameParent}</Text>
      <Text style={styles.text}>{missionInfos?.Aidantinfos?.idParent.firstName}</Text>
      <Text style={styles.text}>{missionInfos?.Aidantinfos?.idParent.name}</Text>
      <Text style={styles.text}>{missionInfos?.Aidantinfos?.idParent.city}</Text>
      <Text style={styles.text}>{missionInfos?.Aidantinfos?.idParent.zip}</Text>

      <Text style={styles.text}>{missionInfos?.Aidantinfos?.rateByHour}</Text>
      <Text style={styles.text}>{missionInfos?.Aidantinfos?.amount}</Text>

      <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Suivant</Text>
          </TouchableOpacity>
    </View>
  )
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFFF"
  },
  smallcontainer: {
    borderWidth: 1,
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
  text: {
    fontFamily: "Manrope",
    fontSize: 13,
  },
  imageProfil: {
    width: windowHeight * 0.12,
    height: windowWidth * 0.26,
    borderRadius: 50,
    marginBottom: 10
   },
});

