import { View, Image, Text, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useEffect }  from 'react'
import { useSelector} from 'react-redux';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { showHeart } from '../modules/showHeart';

export default function AidantDisplayProfilScreen({navigation}) {

    //stocker les données utilisateur et les afficher au chargement de la page
    const [userAidant, setUserAidant] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    //récupération du token dans le store quand l'utilisateur se connecte
    const user = useSelector((state) => state.user.value);
    //console.log({user: user})

    const BACKEND_ADDRESS = '192.168.10.128:3000';

    useEffect(() => {
      fetch(`http://${BACKEND_ADDRESS}/aidantUsers/Infos/${user.token}`)
        .then(response => response.json())
        .then(data => {
          if (data.result) {
            setUserAidant(data);
            //console.log({ infosData: data });
            //Aidantinfos vient de la route GET
            //besoin de l'appeler pour afficher données 
            //console.log({ infos: userAidant.Aidantinfos.aidant })
            //console.log({ infos: userAidant.Aidantinfos.photo })
            setIsLoading(false);
          }
        });
    }, []);
    

    // //coeurs avec note moyenne
    // const averageHearts = [];
    // for (let i = 0; i < 5; i++) {
    //     averageHearts.push(<FontAwesome key={i} name={"heart"} size={15} color={"#868686"}/>)
    // }

if (!isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
              <View style={styles.pictureprofilcontainer}>
                    <View style={{ justifyContent: "center", alignItems: "center"}}>
                    <Image 
                    source={{ uri: userAidant?.Aidantinfos?.photo }} 
                    style={styles.imageProfil} />
                        <Text style={styles.text}>💶 {userAidant?.Aidantinfos?.aidant.rate}€/h</Text>
                    </View>
                  <View style={styles.profilcontainer}>
                      <Text style={{fontFamily:"Recoleta",color: "#785C83", fontSize: 17, marginBottom: 5}}>{userAidant?.Aidantinfos?.firstName} {userAidant?.Aidantinfos?.name}</Text>

                          <Text style={styles.text}>{userAidant?.Aidantinfos?.introBio}</Text>

                      <View style={styles.CarandAdress}>
                          <Text style={styles.text}>🏠 {userAidant?.Aidantinfos?.zip} {userAidant?.Aidantinfos?.city}</Text>
                          <Text style={styles.text}>🚗 {userAidant?.Aidantinfos?.aidant.car ? 'Permis B' : 'Pas de permis'}</Text>
                      </View>
                          <Text style={styles.text}>Avis : {userAidant?.Aidantinfos?.averageNote} / 5</Text>
                      <View style={styles.averageHearts}>
                                {showHeart(userAidant?.Aidantinfos?.averageNote)}
                      {/* <Text style={styles.text}>Membre depuis le 01/03/22</Text>
                      <Text style={styles.text}>Avis : 4,8</Text>
                      <View style={styles.averageHearts}>
                          {averageHearts} */}
                          <TouchableOpacity onPress={() => navigation.navigate('AvisScreen')}>
                              <Text style={styles.textAvis}>Lire les avis</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
              
              
              
              <View style={styles.inputcontainer}>
                  <Text style={styles.title}>Profil d’une pépite</Text>
                  <Text style={styles.text}>
                  {userAidant?.Aidantinfos?.longBio} 
                  </Text>
              </View>
              <View style={styles.inputcontainer}>
                  <Text style={styles.title}>Mes compétences</Text>
                  <Text style={styles.text}>
                  {userAidant?.Aidantinfos?.aidant.abilities} 
                  </Text>
              </View>
              <View style={styles.talentscontainer}>
                  <Text style={{fontFamily: "Recoleta",fontSize:20, marginLeft: 20, marginTop: 10,}}>Mes talents</Text>
                  <View style={styles.doubleTalents}>
                      <Image
                      source={require("../assets/person-cane-solid.png")}
                      style={[
                        styles.imageMobility,
                        { tintColor: userAidant?.Aidantinfos?.talents.mobility ? '#5ABAB6' : '#868686' }
                      ]}/>
                      <Text style={styles.textAbilities}>Mobilité</Text>
                      <Image
                      source={require("../assets/carrot-solid.png")}
                      style={[
                        styles.imageAlimentation,
                        { tintColor: userAidant?.Aidantinfos?.talents.cooking ? '#5ABAB6' : '#868686' }
                      ]}/>
                      <Text style={styles.textAbilities}>Alimentation</Text>
                  </View>
                      <View style={styles.doubleTalents}>
                      <Image
                      source={require("../assets/pump-soap-solid.png")}
                      style={[
                        styles.imageHygiene,
                        { tintColor: userAidant?.Aidantinfos?.talents.hygiene ? '#5ABAB6' : '#868686' }
                      ]}/>
                      <Text style={styles.textAbilities}>Hygiène</Text>
                      <Image
                      source={require("../assets/music-solid.png")}
                      style={[
                        styles.imageDivertissement,
                        { tintColor: userAidant?.Aidantinfos?.talents.entertainment ? '#5ABAB6' : '#868686' }
                      ]}/>
                      <Text style={styles.textAbilities}>Divertissement</Text>
                  </View>
              </View>
          </ScrollView>
      </SafeAreaView>
    )
  }
}

//mise en place méthode Dimension pour mettre en % pour faire fonctionner le KeyboardAvoidingView
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center', // par défaut justify-content: 'flex-start', pour que le padding du keyboardavoiding fonctionne il faut le mettre sur flex-end ou center
      },
      pictureprofilcontainer: {
        flexDirection: "row",
        margin: 15
      },
      profilcontainer: {
        marginLeft: 10,
        marginRight: 10,
        width: windowWidth * 0.70,

      },
      CarandAdress:{
    flexDirection:"row",
    marginTop: 5,
    marginBottom: 5
      },
      inputcontainer: {
        margin: 15,
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
    title: {
        fontFamily: "Recoleta",
        fontSize: 20,
        color: "#785C83",
        marginBottom: 10,
      },
    text: {
        fontFamily: "Manrope",
        fontSize: 13,
       },
    textContainer: {
        flexWrap: 'wrap',
      },
    textAvis: {
        fontFamily: "Manrope",
        fontSize: 13,
        marginLeft: 20,
        color: "#5ABAB6"
       },
    textAbilities:{
        fontFamily: "Manrope",
        fontSize: 15,
       },
    imageProfil: {
        width: windowHeight * 0.12,
        height: windowWidth * 0.26,
        borderRadius: 50,
        marginBottom: 10
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
    averageHearts: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5
       }
    }); 