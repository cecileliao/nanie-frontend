import { View, Image, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect }  from 'react'
import { useSelector } from 'react-redux';
import ValidateMission from '../components/ValidateMission';


export default function MissionScreen1() {

  const BACKEND_ADDRESS = 'nanie-backend.vercel.app';

  //récupération du token dans le store quand l'utilisateur se connecte
  const user = useSelector((state) => state.user.value);
  const [missionsInfos, setMissionsInfos] = useState(null);

  //récupération des informations des missions validées en BDD à l'aide du token de l'utilisateur
  useEffect(() => {
    if (user?.token) {
    fetch(`http://${BACKEND_ADDRESS}/missionsValidated/${user.token}`)
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          setMissionsInfos(data.missions);
        }
      });
    }
  }, [user?.token]);


  //Création de ValidateMission en dehors du useEffect pour pouvoir le récupérer via le props dans le composant Disponibilité
  let EveryMission = [];

  if(user.isParent && missionsInfos !== []){

    EveryMission = missionsInfos?.map((missionData, i) => {
      return (
        <ValidateMission
          key = {i}
          startingDay = {missionData.startingDay}
          startingHour = {missionData.startingHour}
          endingDay = {missionData.endingDay}
          endingHour = {missionData.endingHour}
          amount = {missionData.amount}
          rate = {missionData.rateByHour}
          numberOfHour = {missionData.numberOfHour}
          firstName = {missionData.idAidant.firstName}
          name = {missionData.idAidant.name}
          phone =  {missionData.idAidant.phone}
          photo = {missionData.idAidant.photo}
          city = {missionData.idAidant.city}
          zip = {missionData.idAidant.zip}
        />
      )
    })
  } 

  if(!user.isParent && missionsInfos !== []){

    EveryMission = missionsInfos?.map((missionData, i) => {

      if (missionData.idParent && missionData.idParent.parent) {

        return (
          <ValidateMission
            key = {i}
            startingDay = {missionData.startingDay}
            startingHour = {missionData.startingHour}
            endingDay = {missionData.endingDay}
            endingHour = {missionData.endingHour}
            amount = {missionData.amount}
            rate = {missionData.rateByHour}
            numberOfHour = {missionData.numberOfHour}
            firstName = {missionData.idParent.parent.firstNameParent}
            name = {missionData.idParent.parent.nameParent}
            phone =  {missionData.idParent.phone}
            photo = {missionData.idParent.photo}
            address =  {missionData.idParent.address}
            city = {missionData.idParent.city}
            zip = {missionData.idParent.zip}
          />
        )
      }
    })
  }



  return (
    <SafeAreaView style={styles.container}>
      {missionsInfos && missionsInfos.length > 0 ? (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {EveryMission}
      </ScrollView>
        ) : (
      <View style={styles.noMissionContainer}>
        <Image
          source={require("../assets/missionsValidees.png")}
          style={{width: windowWidth * 0.92, height: windowHeight * 0.33}}
        />
        <Text style={styles.text}>Vous n’avez pas encore de missions</Text>
      </View>
        )}
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
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  noMissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#868686',
    fontFamily: 'Manrope',
    fontSize: 15,
    marginTop: 25
},
  })