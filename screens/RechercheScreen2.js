import { View, Image, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect }  from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addToken } from '../reducers/token';
import { showHeart } from '../modules/showHeart';
import moment from 'moment';
import 'moment/locale/fr';
// import { useDispatch } from 'react-redux';
// import { displayProfil } from '../reducers/users';

export default function RechercheScreen2({navigation}) {
  const dispatch = useDispatch()

const BACKEND_ADDRESS = '192.168.10.128:3000';

const user = useSelector((state) => state.user.value);
// console.log('Coucou', user.searchResult)
// console.log('test', user)

const handleSelect = (token) => {
  dispatch(addToken(token))
  navigation.navigate('ShownProfilAidant')
}

const searchDispo = user.searchResult.map((data, index) => {
  console.log("data", data);

 return (
  <View style={styles.container}>
    <TouchableOpacity style={styles.block} key={index} onPress={() => handleSelect(data.token)}>
    {/* <TouchableOpacity style={styles.block} key={index} onPress={() => handlePress(data.token)}> */}
          <View style={styles.image}>
            <Image source={{url:data.photo}} style={{ width: 50, height: 50, borderRadius: 50 }} />
          </View>
          <View style={styles.content}>
            <View style={styles.infos}>
              <Text style={styles.title}>{data.firstName} {data.name}</Text>
              <Text style={styles.text}>{data.missions} missions Nanie</Text>
              <Text style={styles.text}>Avis: {data.averageNote} / 5</Text>
              <View style={styles.heartsContainer}>
                  {showHeart(data.averageNote)}
              </View>
            </View>
    </View>
    <View style={styles.contentRight}>
          <View style={styles.circle}>
            <Text style={styles.texteRate}>{data.aidant.rate}€/hr</Text>
          </View>
    </View>
  </TouchableOpacity>
  </View> 
  )
});


  return (
    <SafeAreaView style={styles.safeArea}>
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
    marginTop: 25,
    marginLeft : 8,
    marginRight: 25,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  infos: {
    flex: 1,
  },
  title: {
      fontFamily: "Recoleta",
      fontSize: 20,
      color: "#785C83",
      marginBottom: 5,
  },
  text: {
    fontFamily: 'Manrope',
    marginBottom: 4,
  },
  heartsContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  contentRight: {
    flexDirection: 'row',
    marginTop: 25,
    marginLeft: 15,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#5ABAB6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 7,
    marginLeft: 15,
  },
  texteRate: {
    marginTop: 8,
    fontFamily: 'Manrope',
    color: 'white',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});
