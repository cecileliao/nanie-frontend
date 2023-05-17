import { View, Image, Text, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
//import { TabNavigator } from "./App";

export default function AidantDisplayScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
            <Image
                source={require("../assets/userPicture.png")}
                style={styles.imageProfil}/>
            <Text style={styles.title}>Emma Lorain</Text>
            <Text style={styles.text}>Ohayō! Etudiante passionnée de culture
            japonaise et de basket entre amis</Text>
            <Text style={styles.text}>🏠 75015 Paris</Text>
            <Text style={styles.text}>🚗 Permis B</Text>
            <Text style={styles.text}>💶 28€/h</Text>
            <Text style={styles.text}>Membre depuis le 01/03/22</Text>
            <Text style={styles.text}>Avis : 4,8</Text>
            
            <TouchableOpacity onPress={() => navigation.navigate('AidantAvisScreen')}>
            <Text style={styles.textAvis}>Lire les avis</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Profil d’une pépite</Text>
            <Text style={styles.text}>
            Bonjour, je suis en 3ème année d’école d’infirmière, et j’étudie en parallèle la langue japonaise. En effet, depuis 
            toute petite la culture japonaise me passionne! Je suis quelqu’un 
            de très patiente et pétillante, qui cherche à compléter ses fins 
            de mois avec des missions qui ont du sens. 
            </Text>
            <Text style={styles.title}>Mes compétences</Text>
            <Text style={styles.text}>
            Diplôme d’infirmière en préparation, j’ai déjà effectué un stage 
            de 3 mois en maison de retraite, ou j’ai pu apprendre à aider les 
            personnes âgées pour prendre soin de leur hygiène, à suivre l’état 
            de santé et réaliser des exercices de mobilité. Sinon, j’adore lire 
            notamment des romans japonais et je cuisine également de très bons 
            sushis et ramens. 
            </Text>
            <View style={styles.talentscontainer}>
            <Text style={{fontFamily: "Recoleta",fontSize:20, color: "#785C83"}}>Mes talents</Text>
                <Image
                source={require("../assets/person-cane-solid.png")}
                style={styles.imageMobility}/>
                <Text style={styles.textAbilities}>Mobilité</Text>
                <Image
                source={require("../assets/carrot-solid.png")}
                style={styles.imageAlimentation}/>
                <Text style={styles.textAbilities}>Alimentation</Text>
                <Image
                source={require("../assets/pump-soap-solid.png")}
                style={styles.imageHygiene}/>
                <Text style={styles.textAbilities}>Hygiène</Text>
                <Image
                source={require("../assets/music-solid.png")}
                style={styles.imageDivertissement}/>
                <Text style={styles.textAbilities}>Divertissement</Text>
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
      talentscontainer: {
        marginLeft: 20,
        borderWidth: 1.5,
        borderRadius: 4,
        borderColor: "#5ABAB6"
      },
    title: {
        fontFamily: "Recoleta",
        fontSize: 20,
        color: "#785C83",
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 30,
      },
    text: {
        fontFamily: "Manrope",
        fontSize: 13,
        marginLeft: 20,
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
        borderRadius: 50
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
       }
    }); 