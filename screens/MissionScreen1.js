import { View, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect }  from 'react'
import { useSelector } from 'react-redux';
import ValidateMission from '../components/ValidateMission';


export default function MissionScreen1() {
  const BACKEND_ADDRESS = '192.168.10.161:3000';
  //récupération du token dans le store quand l'utilisateur se connecte
  const user = useSelector((state) => state.user.value);
  const [missionsInfos, setMissionsInfo] = useState(null);


  useEffect(() => {
    // console.log('search', user.searchResult[0].token)
    fetch(`http://${BACKEND_ADDRESS}/missionsValidated/${user.token}`)
      .then(response => response.json())
      .then(data => {
        //console.log('$$$', data); 
        if (data) {

          setMissionsInfo(data)

        //   const allMissionsIfParent = data.map((missionData,i) => ({
        //     key: i,
        //     startingDay: missionData.startingDay,
        //     endingDay: missionData.endingDay,
        //     amount: missionData.amount,
        //     rate: missionData.rateByHour,
        //     numberOfHour: missionData.numberOfHour,
        //     firstNameAidant: missionData.idAidant.firstName,
        //     nameAidant: missionData.idAidant.name,
        //     phoneAidant: missionData.idAidant.phone,
        //     photoAidant: missionData.idAidant.photo,
        //     cityAidant: missionData.idAidant.city,
        //     zipAidant: missionData.idAidant.zip,
        // }));

      //   const allMissionsIfAidant = data.map((missionData,i) => ({
      //     key: i,
      //     startingDay: missionData.startingDay,
      //     endingDay: missionData.endingDay,
      //     amount: missionData.amount,
      //     rate: missionData.rateByHour,
      //     numberOfHour: missionData.numberOfHour,
      //     firstNameParent: missionData.idParent.firstName,
      //     nameParent: missionData.idParent.name,
      //     phoneParent: missionData.idParent.phone,
      //     photoParent: missionData.idParent.photo,
      //     addressParent: missionData.idParent.address,
      //     cityParent: missionData.idParent.city,
      //     zipParent: missionData.idParent.zip,
      // }));

        }
      });
  }, []);

  //Création de Dispo en dehors du useEffect pour pouvoir le récupérer via le props dans le composant Disponibilité
let EveryMission = [];
  if(user.isParent){
    EveryMission = missionsInfos?.map((missionData, i) => {
    console.log('parent',missionData)
    return (
    <ValidateMission
      key = {i}
      startingDay = {missionData.startingDay}
      endingDay= {missionData.endingDay}
      amount= {missionData.amount}
      rate= {missionData.rateByHour}
      numberOfHour= {missionData.numberOfHour}

      firstName= {missionData.idAidant.firstName}
      name = {missionData.idAidant.name}
      phone =  {missionData.idAidant.phone}
      photo = {missionData.idAidant.photo}
      city= {missionData.idAidant.city}
      zip = {missionData.idAidant.zip}
    />
    )})
  } 
console.log('user================>',user);
if(!user.isParent){
 EveryMission = missionsInfos?.map((missionData, i) => {
    console.log('aidant',missionData)
    return (
    <ValidateMission
      key = {i}
      startingDay = {missionData.startingDay}
      endingDay= {missionData.endingDay}
      amount= {missionData.amount}
      rate= {missionData.rateByHour}
      numberOfHour= {missionData.numberOfHour}

      firstName= {missionData.idParent.firstName}
      name = {missionData.idParent.name}
      phone =  {missionData.idParent.phone}
      photo = {missionData.idParent.photo}
      address =  {missionData.idParent.address}
      city= {missionData.idParent.city}
      zip = {missionData.idParent.zip}
    />
    )})

}



  return (
<SafeAreaView style={styles.container}>
  <ScrollView contentContainerStyle={styles.scrollContainer}>
      {missionsInfos != null ? (
      <View>
        {EveryMission}
      </View>
        ) : (
      <View>
        <Image
          source={require("../assets/missionsValidees.png")}
          style={{width: windowWidth * 0.92, height: windowHeight * 0.33}}
        />
        <Text style={styles.text}>Vous n’avez pas encore de missions</Text>
      </View>
    )}
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
  text: {
    color: '#868686',
    fontFamily: 'Manrope',
    fontSize: 15,
    marginTop: 25
},
  })