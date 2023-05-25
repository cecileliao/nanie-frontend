import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native'   
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
    // console.log('search', user.idMission)
    fetch(`http://${BACKEND_ADDRESS}/DetailsMission/${user.idMission}`)
      .then(response => response.json())
      .then(data => {
        // console.log("missionsinfo", data)
        if (data.result) {
          setMissionInfos(data);
        }
      });
  }, []);



  return (
<SafeAreaView style={styles.container}>
  <View style={styles.reminderContainer}>
    <View style={styles.dispocontainer}>
            <Text style={styles.textRappel}>Rappel de la mission</Text>
            <View style={styles.debutfincontainer}>
                <Text style={styles.textTitleDebutFin}>Debut</Text>
                <Text style={styles.textStart}>{formatDate(missionInfos?.Aidantinfos?.startingDay)}</Text>
                <Text style={styles.textStartHour}>{formatTime(missionInfos?.Aidantinfos?.startingDay)}</Text>
            </View>
            <View style={styles.debutfincontainer}>
                <Text style={styles.textTitleDebutFin}>Fin</Text>
                <Text style={styles.textEndDay}>{formatDate(missionInfos?.Aidantinfos?.endingDay)}</Text>
                <Text style={styles.textEndHour}>{formatTime(missionInfos?.Aidantinfos?.endingDay)}</Text>
            </View>
        </View>
      </View>

    <View style={styles.parenAidantContainer}>
      <View style={styles.aidant} >
        <Image 
              source={{ uri: missionInfos?.Aidantinfos?.idAidant.photo }} 
              style={styles.imageProfil} />
        <View style={{marginTop: 15}}>
          <View style={styles.name}>
            <Text style={{fontSize: 17, fontFamily: 'Manrope', marginRight: 5}}>{missionInfos?.Aidantinfos?.idAidant.firstName}</Text>
            <Text style={styles.text}>{missionInfos?.Aidantinfos?.idAidant.name}</Text>
          </View>
          <View style={styles.name}>
          <Text style={{fontSize: 17, fontFamily: 'Manrope', marginRight: 5}}>{missionInfos?.Aidantinfos?.idAidant.city}</Text>
          <Text style={styles.text}>{missionInfos?.Aidantinfos?.idAidant.zip}</Text>
          </View>
        </View>
      </View>

      <View style={styles.parent}>
        <Image 
              source={{ uri: missionInfos?.Aidantinfos?.idParent.photo }} 
              style={styles.imageProfil} />
        <View style={{marginTop: 15}}>
          <View style={styles.name}>
            <Text style={{fontSize: 17, fontFamily: 'Manrope', marginRight: 5}}>{missionInfos?.Aidantinfos?.idParent.parent.firstNameParent}</Text>
            <Text style={styles.text}>{missionInfos?.Aidantinfos?.idParent.parent.nameParent}</Text>
          </View>
          <View style={styles.name}>
            <Text style={{fontSize: 17, fontFamily: 'Manrope', color:"#868686", marginRight: 5}}>Aîné:</Text>
            <Text style={{fontSize: 17, fontFamily: 'Manrope', marginRight: 5}}>{missionInfos?.Aidantinfos?.idParent.firstName}</Text>
            <Text style={styles.text}>{missionInfos?.Aidantinfos?.idParent.name}</Text>
          </View>
          <View style={styles.name}>
            <Text style={{fontSize: 17, fontFamily: 'Manrope', marginRight: 5}}>{missionInfos?.Aidantinfos?.idParent.city}</Text>
            <Text style={styles.text}>{missionInfos?.Aidantinfos?.idParent.zip}</Text>
          </View>
        </View>
      </View>
  </View>

    <View style={styles.priceContainer}>
      <View style={styles.price}>
        <Text style={{fontSize: 17, fontFamily: 'Manrope',color: "#868686",marginRight: 25}}>Taux horaire</Text>
        <Text style={styles.text}>{missionInfos?.Aidantinfos?.rateByHour} €/heure</Text>
      </View>
      
      <Text  style={{fontSize: 17, fontFamily: 'Manrope',marginLeft: 135}}>{missionInfos?.Aidantinfos?.numberOfHour} heures x {missionInfos?.Aidantinfos?.rateByHour} €</Text>
      <View style={{borderWidth: 1, borderColor: '#5ABAB6', width: 150, marginTop: 10, marginLeft: 135}}></View>
      <View style={styles.price}>
        <Text style={{fontSize: 17, fontFamily: 'Manrope',color: "#868686",marginRight: 25}}>Total</Text>
        <Text style={{fontSize: 17, fontFamily: 'Manrope',marginLeft: 58}}>{missionInfos?.Aidantinfos?.amount} €</Text>
      </View>
    </View>

      <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Confirmer</Text>
          </TouchableOpacity>
</SafeAreaView>
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
  reminderContainer: {
    alignItems: "flex-start",
    borderWidth: 1.5,
    borderRadius: 4,
    borderColor: "#785C83",
    width: windowWidth * 0.88,
    height: windowHeight * 0.17,
    marginBottom: 25
  },
  dispocontainer: {
    margin: 10,
  },
  debutfincontainer: {
    flexDirection: "row",
    alignItems: 'center',
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 10,
  },
  parenAidantContainer:{
    flexDirection: "row",
    marginTop: 25,
  },
  priceContainer:{
    alignItems: "flex-start",
    borderWidth: 1.5,
    borderRadius: 4,
    borderColor: "#5ABAB6",
    width: windowWidth * 0.88,
    height: windowHeight * 0.18,
    marginTop: 35,
  },
  parent: {
    alignItems: "center",
    marginLeft: 15,
  },
  aidant: {
    alignItems: "center",
    marginRight: 20,
  },
  price:{
    flexDirection: "row",
    margin: 15,  
  },
  button: {
    backgroundColor: '#5ABAB6',
    padding: 10,
    borderRadius: 5,
    width: windowWidth * 0.30,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  buttonText: {
    fontFamily: "Manrope",
    fontSize: 17,
    color: 'white',
  },
  text: {
    fontSize: 17,
    fontFamily: 'Manrope',
  },
  textRappel:{
    fontSize: 17,
    fontFamily: 'Manrope',
    marginLeft: 15,
    marginBottom: 15,
  },
  textTitleDebutFin: {
    fontSize: 17,
    fontFamily: 'Manrope',
    color: "#868686"
  },
  textStart: {
    fontSize: 17,
    fontFamily: 'Manrope',
    marginLeft: 40,
  },
  textEndDay: {
    fontSize: 17,
    fontFamily: 'Manrope',
    marginLeft: 66,
  },
  textStartHour: {
    fontSize: 17,
    fontFamily: 'Manrope',
    marginLeft: 50,
  },
  textEndHour: {
    fontSize: 17,
    fontFamily: 'Manrope',
    marginLeft: 50,
  },
  name: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
  },
  imageProfil: {
    width: windowHeight * 0.12,
    height: windowWidth * 0.26,
    borderRadius: 50,
    marginBottom: 10
   },
});

