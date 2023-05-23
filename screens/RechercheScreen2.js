import { View, Image, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { showHeart } from '../modules/showHeart';
import moment from 'moment';
import 'moment/locale/fr';

export default function RechercheScreen2() {

const user = useSelector((state) => state.user.value);
console.log('Coucou', user.searchResult)

const searchDispo = user.searchResult.map((data, index) => {
// const signupDate = moment(data.signup)
// const availabilitiesStart = moment(data.availabilities.startingDay)
// const availabilitiesEnd = moment(data.availabilities.endingDay)


 return (
  <View style={styles.container}>
    <View style={styles.block} key={index}>
          <View style={styles.image}>
            <Image source={data.photo} style={{ width: 50, height: 50 }} />
          </View>
          <View style={styles.content}>
            <View style={styles.infos}>
              <Text style={styles.title}>{data.firstName} {data.name}</Text>
              <Text style={styles.text}>{data.missions} missions Nanie</Text>
              <Text style={styles.text}>Avis: {data.averageNote}    </Text>
              <Text style={styles.text}> {showHeart(data.averageHeart)} </Text>
            </View>
            <View>
            <Text style={styles.texteAvis}>{data.aidant.rate}€/hr</Text>
            </View>
          </View>
    </View>
  </View> 
  )
});


  return (
    <SafeAreaView style={styles.searchContainer}>
    <ScrollView>
    {searchDispo}
    </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#ffff',
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  block: {
    flexDirection: 'row',
    width: '90%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5ABAB6',
    marginBottom: 8,
    padding: 8,
  },
  image: {
    marginRight: 8,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  infos: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontFamily: 'Manrope',
    marginBottom: 4,
  },
  text: {
    fontFamily: 'Manrope',
    marginBottom: 4,
  },
  texteAvis: {
    marginTop: 8,
    fontFamily: 'Manrope',
  },
});
