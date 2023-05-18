import { View, Image, Text, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function AidantDisplayScreen({navigation}) {

    //coeurs avec note moyenne
    const averageHearts = [];
    for (let i = 0; i < 5; i++) {
        averageHearts.push(<FontAwesome key={i} name={"heart"} size={15} color={"#868686"}/>)
    }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
            <View style={styles.pictureprofilcontainer}>
                  <View style={{ justifyContent: "center", alignItems: "center"}}>
                      <Image
                      source={require("../assets/userPicture.png")}
                      style={styles.imageProfil}/>
                      <Text style={styles.text}>💶 28€/h</Text>
                  </View>
                <View style={styles.profilcontainer}>
                    <Text style={{fontFamily:"Recoleta",color: "#785C83", fontSize: 17, marginBottom: 5}}>Emma Lorain</Text>

                        <Text style={styles.text}>Ohayō! Etudiante passionnée de culture japonaise et de basket entre amis</Text>

                    <View style={styles.CarandAdress}>
                        <Text style={styles.text}>🏠 75015 Paris</Text>
                        <Text style={styles.text}>🚗 Permis B</Text>
                    </View>
                    
                    <Text style={styles.text}>Membre depuis le 01/03/22</Text>
                    <Text style={styles.text}>Avis : 4,8</Text>
                    <View style={styles.averageHearts}>
                        {averageHearts}
                        <TouchableOpacity onPress={() => navigation.navigate('AidantAvisScreen')}>
                            <Text style={styles.textAvis}>Lire les avis</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
            
            
            <View style={styles.inputcontainer}>
                <Text style={styles.title}>Profil d’une pépite</Text>
                <Text style={styles.text}>
                Bonjour, je suis en 3ème année d’école d’infirmière, et j’étudie en parallèle la langue japonaise. En effet, depuis 
                toute petite la culture japonaise me passionne! Je suis quelqu’un 
                de très patiente et pétillante, qui cherche à compléter ses fins 
                de mois avec des missions qui ont du sens. 
                </Text>
            </View>
            <View style={styles.inputcontainer}>
                <Text style={styles.title}>Mes compétences</Text>
                <Text style={styles.text}>
                Diplôme d’infirmière en préparation, j’ai déjà effectué un stage 
                de 3 mois en maison de retraite, ou j’ai pu apprendre à aider les 
                personnes âgées pour prendre soin de leur hygiène, à suivre l’état 
                de santé et réaliser des exercices de mobilité. Sinon, j’adore lire 
                notamment des romans japonais et je cuisine également de très bons 
                sushis et ramens. 
                </Text>
            </View>
            <View style={styles.talentscontainer}>
                <Text style={{fontFamily: "Recoleta",fontSize:20, marginLeft: 20, marginTop: 10,}}>Mes talents</Text>
                <View style={styles.doubleTalents}>
                    <Image
                    source={require("../assets/person-cane-solid.png")}
                    style={styles.imageMobility}/>
                    <Text style={styles.textAbilities}>Mobilité</Text>
                    <Image
                    source={require("../assets/carrot-solid.png")}
                    style={styles.imageAlimentation}/>
                    <Text style={styles.textAbilities}>Alimentation</Text>
                </View>
                    <View style={styles.doubleTalents}>
                    <Image
                    source={require("../assets/pump-soap-solid.png")}
                    style={styles.imageHygiene}/>
                    <Text style={styles.textAbilities}>Hygiène</Text>
                    <Image
                    source={require("../assets/music-solid.png")}
                    style={styles.imageDivertissement}/>
                    <Text style={styles.textAbilities}>Divertissement</Text>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
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
        tintColor: "#868686"
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