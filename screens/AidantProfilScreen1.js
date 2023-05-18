import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateAidant } from '../reducers/users';
import { KeyboardAvoidingView, 
  TouchableOpacity, 
  Switch, View, Text, TextInput, Dimensions,
  StyleSheet, Image, Button,Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from "expo-image-picker";



export default function AidantProfilScreen1({ navigation }) {

  //récupération info user au moment d'appuyer sur le bouton suivant
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value)

  //photo de profil
    const [photoAidant, setphotoAidant] = useState("");

  //menu dropdown pour le sexe
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Femme', value: 'femme'},
      {label: 'Homme', value: 'homme'},
      {label: 'Indifférent', value: 'indifférent'},
    ]);

  //Image upload from device library w/ ImagePickerExpo
    const handleImageUpload = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    
    // check if user canceled the image selection // selectedImage state updated with uri
      if (!result.canceled) {
        setphotoAidant(result.uri)
        dispatch(updateAidant({ photoAidant: result.uri }))}
      };

    //etat pour afficher erreur si mauvaise structure
      const [phoneError, setPhoneError] = useState(false);
      const [zipError, setZipError] = useState(false);
      const [birthYearError, setbirthYearError] = useState(false);
   
      const validateTel = (phone) => {
        const PHONE_REGEX = /^[+0-9]+$/;
        return PHONE_REGEX.test(phone);
      };
    
      const validateZip = (zip) => {
        const ZIP_REGEX = /^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$/;
        return ZIP_REGEX.test(zip);
      };
    
      const validatebirthYear = (birthyear) => {
        const BIRTH_REGEX = /^(19|20)\d{2}$/;
        return BIRTH_REGEX.test(birthyear);
      };
      
  

    const handleNext = () => {
      let isValid = true;
    
      if (!validateTel(user.phoneAidant)) {
        setPhoneError(true);
        isValid = false;
      } else {
        setPhoneError(false);
      }
    
      if (!validateZip(user.zipAidant)) {
        setZipError(true);
        isValid = false;
      } else {
        setZipError(false);
      }
    
      if (!validatebirthYear(user.ageAidant)) {
        setbirthYearError(true);
        isValid = false;
      } else {
        setbirthYearError(false);
      }
    
      if (isValid) {
        navigation.navigate('AidantProfilScreen2');
      }
    };
    
  

  return (
<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>

      

      {/* image de profil */}

      <View style={styles.imageProfil}>
        <TouchableOpacity onPress={handleImageUpload}>
        <Image source={photoAidant ? { uri: photoAidant } : require("../assets/userPicture.png")}
            style={{ width: 96, height: 96, margin: 20, borderRadius: 50 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleImageUpload}>
        <Text>Ajouter/Modifier photo</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Mon profil</Text>

      {/* nom de l'aidant */}

    <View style={styles.containerInput}>
      <Text>Nom</Text>
      <TextInput style={styles.input} value={user.nameAidant} onChangeText={text => dispatch(updateAidant({nameAidant: text}))} placeholder="Nom" />
    </View>

    {/* prénom de l'aidant */}
    <View style={styles.containerInput}>
      <Text>Prénom</Text>
      <TextInput style={styles.input} value={user.firstNameAidant} onChangeText={text => dispatch(updateAidant({firstNameAidant: text}))} placeholder="Prénom" />
    </View>

    {/* téléphone de l'aidant */}
    <View style={styles.containerInput}>
        <Text>Téléphone</Text>
        <TextInput
          style={styles.input}
          value={user.phoneAidant}
          onChangeText={text => dispatch(updateAidant({ phoneAidant: text }))}
          placeholder="Téléphone"
        />
    </View>
      {phoneError && <Text style={{color:"red", textAlign: "center", marginBottom: 10}}>Téléphone non valide</Text>}

      {/* adresse de l'aidant */}
      <View style={styles.containerInput}>
        <Text>Adresse</Text>
        <TextInput style={styles.input} value={user.addressAidant} onChangeText={text => dispatch(updateAidant({addressAidant: text}))} placeholder="Adresse" />
      </View>

    <View style={styles.doubleInput}>

        {/* code postal de l'aidant */}
        <View style={styles.smallcontainerInput}>
          <Text>Code Postal</Text>
          <TextInput style={styles.codePostal} value={user.zipAidant} onChangeText={text => dispatch(updateAidant({zipAidant: text}))} placeholder="CP" />
        </View>

        {/* ville de l'aidant */}
        <View style={styles.smallcontainerInput}>
          <Text>Ville</Text>
          <TextInput style={styles.city} value={user.cityAidant} onChangeText={text => dispatch(updateAidant({cityAidant: text}))} placeholder="Ville" />
        </View>

      

    </View>

      {zipError && <Text style={{color:"red", textAlign: "center", marginBottom: 10}}>Code postal non valide</Text>}

    <View style={styles.doubleInput}>

      {/* âge de l'aidant */}
      <View style={styles.smallcontainerInput}>
        <Text>Naissance</Text>
        <TextInput style={styles.smallinput} value={user.ageAidant} onChangeText={text => dispatch(updateAidant({ageAidant: text}))} placeholder="AAAA" />
      </View>
      

      {/* sexe de l'aidant */}
      <View style={styles.smallcontainerInput}>
          <Text>Sexe</Text>
          <DropDownPicker style={{width: 120, marginLeft: 15, borderColor: '#5ABAB6'}} placeholderStyle={{color: "grey"}} disabledStyle={{opacity: 0.5}}
          open={open}
          value={value}
          items={items}
          placeholder="Sexe"
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          dropDownContainerStyle={{ width: 120, marginLeft: 15, marginBottom: 15, borderColor: '#5ABAB6' }}
          onSelectItem={(item) => {
            dispatch(updateAidant({sexeAidant: item.value}))}
          }
          />
      </View>


    </View>

    {birthYearError && <Text style={{color:"red", textAlign: "center", marginBottom: 10}}>Année de naissance non valide</Text>}

     {/* tarif horaire l'aidant */}
     <View style={styles.tarifcontainerInput}>
        <Text>Taux horaire</Text>
        <TextInput style={styles.city} value={user.ratebyHourAidant} onChangeText={text => dispatch(updateAidant({ratebyHourAidant: text}))} placeholder="Taux horaire" />
     </View>

      {/* permis l'aidant */}
      <View style={styles.tarifcontainerInput}>
          <Text>Permis B</Text>
          <Switch style={{marginLeft: 30}}
          value={user.car}
          onValueChange={(value) => dispatch(updateAidant({car: value}))}
          trackColor={{ false: '#D9D9D9', true: '#5ABAB6' }}
          />
      </View>

      {/* Bouton suivant */}
      <View style={styles.buttoncontainer}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Suivant</Text>
        </TouchableOpacity>
      </View>

      
  </KeyboardAvoidingView>
</TouchableWithoutFeedback>
    
  )
}

//mise en place méthode Dimension pour mettre en % pour faire fonctionner le KeyboardAvoidingView
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      justifyContent: 'center', // par défaut justify-content: 'flex-start', pour que le padding du keyboardavoiding fonctionne il faut le mettre sur flex-end ou center
    },
    imageProfil: {
      flexDirection: "row",
      alignItems:"center",
    },
    input: {
      width: windowWidth * 0.66,
      height: windowHeight * 0.035,
      borderBottomColor: '#5ABAB6',
      borderBottomWidth: 1,
    },
    smallinput: {
      width: windowWidth * 0.18,
      height: windowHeight * 0.030,
      borderBottomColor: '#5ABAB6',
      borderBottomWidth: 1,
      marginLeft: 25,
      marginRight: 15
    },
    codePostal:  {
      width: windowWidth * 0.16,
      height: windowHeight * 0.030,
      borderBottomColor: '#5ABAB6',
      borderBottomWidth: 1,
      marginLeft: 15,
      marginRight: 25
    },
    city:  {
      width: windowWidth * 0.31,
      height: windowHeight * 0.030,
      borderBottomColor: '#5ABAB6',
      borderBottomWidth: 1,
      marginLeft: 15,
      marginRight: 15
    },
    containerInput: {
      fontSize: 13,
      flexDirection: "row",
      alignItems:"center",
      justifyContent: "space-between",
      marginLeft:20,
      marginRight:25,
      marginBottom:25,
    },
    tarifcontainerInput: {
      fontSize: 13,
      flexDirection: "row",
      alignItems:"center",
      marginLeft:20,
      marginRight:25,
      marginBottom:25,
    },
    doubleInput: {
      flexDirection: "row",
      marginLeft:20,
      marginRight:25,
      marginBottom:25,
    },
    smallcontainerInput: {
      flexDirection: "row",
      alignItems:"center", 
    },
    title: {
      fontFamily: "Recoleta",
      fontSize: 20,
      color: "#785C83",
      marginLeft: 20,
      marginBottom: 20
    },
    buttoncontainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: '#5ABAB6',
      padding: 10,
      margin: 50,
      borderRadius: 8,
      width: windowWidth * 0.25,
    },
    buttonText: {
      color: 'white',
      textAlign: "center",
  },
    })