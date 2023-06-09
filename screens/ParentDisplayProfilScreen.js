import { View, Image, Text, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/users';
import { showHeart } from '../modules/showHeart';
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ParentDisplayProfilScreen({navigation}) {

  //stocker les données utilisateur et les afficher au chargement de la page
  const [userParent, setUserParent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //récupération du token dans le store quand l'utilisateur se connecte
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch()

  const BACKEND_ADDRESS = 'nanie-backend.vercel.app';

  useEffect(() => {
    fetch(`http://${BACKEND_ADDRESS}/parentUsers/Infos/${user.token}`)
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          setUserParent(data);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Error:', error);
        setIsLoading(false);
      })
  }, []);
  

  //Deconnexion
  const handleLogout = () =>{
    dispatch(logout());
    navigation.navigate('Home');
  }

  //date au format DD/MM/YYYY
  const date = new Date(userParent?.Parentinfos?.signup);

  if (!isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>

          <View style={styles.pictureprofilcontainer}>

            <View style={{ justifyContent: "center", alignItems: "center"}}>
              <Image 
                source={{ uri: userParent?.Parentinfos?.photo }} 
                style={styles.imageProfil} />
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={{fontFamily:"Manrope", color: "#C8716E", fontSize:13}} >Deconnexion</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.profilcontainer}>
              <Text style={{fontFamily:"Recoleta",color: "#785C83", fontSize: 17, marginBottom: 5}}>{userParent?.Parentinfos?.firstName} {userParent?.Parentinfos?.name}</Text>
              <Text style={styles.text}>{userParent?.Parentinfos?.introBio}</Text>
              <Text style={styles.text}>🏠 {userParent?.Parentinfos?.zip} {userParent?.Parentinfos?.city}</Text>
              <Text style={styles.text}>Membre depuis le {date.toLocaleDateString()}</Text>
              <Text style={styles.text}>Avis : {userParent?.Parentinfos?.averageNote}</Text>
              <View style={styles.averageHearts}>
              {showHeart(userParent?.Parentinfos?.averageNote)}
                <TouchableOpacity onPress={() => navigation.navigate('AvisScreen')}>
                    <Text style={styles.textAvis}>Lire les avis</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          <View style={styles.inputcontainer}>
            <Text style={styles.title}>Mon parent adoré </Text>
            <Text style={styles.text}>
              {userParent?.Parentinfos?.longBio} 
            </Text>
          </View>

          <View style={styles.talentscontainer}>
            <Text style={{fontFamily: "Recoleta",fontSize:20, marginLeft: 20, marginTop: 10,}}>Talents recherchés</Text>
            <View style={styles.doubleTalents}>
              <Image
              source={require("../assets/person-cane-solid.png")}
              style={[
                styles.imageMobility,
                { tintColor: userParent?.Parentinfos?.talents.mobility ? '#5ABAB6' : '#868686' }
              ]}/>
              <Text style={styles.textAbilities}>Mobilité</Text>
              <Image
              source={require("../assets/carrot-solid.png")}
              style={[
                styles.imageAlimentation,
                { tintColor: userParent?.Parentinfos?.talents.cooking ? '#5ABAB6' : '#868686' }
              ]}/>
              <Text style={styles.textAbilities}>Alimentation</Text>
            </View>
            <View style={styles.doubleTalents}>
              <Image
                source={require("../assets/pump-soap-solid.png")}
                style={[
                  styles.imageHygiene,
                  { tintColor: userParent?.Parentinfos?.talents.hygiene ? '#5ABAB6' : '#868686' }
              ]}/>
              <Text style={styles.textAbilities}>Hygiène</Text>
              <Image
                source={require("../assets/music-solid.png")}
                style={[
                  styles.imageDivertissement,
                  { tintColor: userParent?.Parentinfos?.talents.entertainment ? '#5ABAB6' : '#868686' }
                ]}/>
              <Text style={styles.textAbilities}>Divertissement</Text>
            </View>
          </View>

          <View style={styles.inputcontainer}>
            <Text style={styles.title}>La perle rare recherchée</Text>
            <Text style={styles.text}>
              {userParent?.Parentinfos?.parent.gemProfil} 
            </Text>
          </View>

          <View style={styles.inputcontainer}>
            <Text style={styles.title}>Contact{'('}s{')'}</Text>
            <Text style={styles.text}>
            {userParent?.Parentinfos?.parent.nameParent} {userParent?.Parentinfos?.parent.firstNameParent}, 
            </Text>
            <Text style={styles.text}>
              {userParent?.Parentinfos?.parent.shortBio}
            </Text>
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
    width: windowWidth * 0.66,
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
    marginBottom: 5
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