import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateAidant } from '../reducers/users';
import { TouchableOpacity, Switch, View, Text, TextInput, StyleSheet, Image, Button } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from "expo-image-picker";

export default function AidantProfilScreen1() {


  //photo de profil
  const [selectedImageAidant, setSelectedImageAidant] = useState(null);

  //text rempli
  //nom de l'aidant
  const [nameAidant, setnameAidant] = useState("");
  //prénom de l'aidant
  const [firstNameAidant, setfirstNameAidant] = useState("");
  //téléphone de l'aidant
  const [phoneAidant, setphoneAidant] = useState("");
  //âge de l'aidant
  const [ageAidant, setageAidant] = useState("");
  //sexe de l'aidant
  const [sexeAidant, setsexeAidant] = useState("");
  //adresse de l'aidant
  const [addressAidant, setaddressAidant] = useState("");
  //code postal de l'aidant
  const [zipAidant, setzipAidant] = useState("");
  //ville de l'aidant
  const [cityAidant, setcityAidant] = useState("");
  //tarif horaire de l'aidant
  const [ratebyHour, setratebyHour] = useState("");

  //menu dropdown pour le sexe
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Femme', value: 'femme'},
    {label: 'Homme', value: 'homme'},
    {label: 'Indifférent', value: 'indifférent'},
  ]);

  //toggle pour le permis
  const [car, setcar] = useState(false);

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
      setSelectedImageAidant(result.assets[0].uri);
      getUserPictures(result.assets[0].uri);
    }
  };



    //récupération info user au moment d'appuyer sur le bouton suivant
    const dispatch = useDispatch();

    const handleNext = () => {
      dispatch(updateAidant(
        selectedImageAidant,
        nameAidant,
        firstNameAidant,
        phoneAidant,
        ageAidant,
        sexeAidant,
        addressAidant,
        zipAidant,
        cityAidant,
        ratebyHourAidant,
        carAidant,
        introBioAidant,
        longBioAidant,
        abilitiesAidant,
       ));
      console.log(dispatch(updateAidant))
      navigation.navigate('AidantProfilScreen2');
    };



  return (
    <View style={styles.container}>

      {/* image de profil */}

      <View style={styles.imageProfil}>
        <TouchableOpacity onPress={handleImageUpload}>
      <Image source={selectedImageAidant ? { uri: selectedImageAidant } : require("../assets/userPicture.png")}
            style={{ width: 96, height: 96, margin: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleImageUpload}>
        <Text>Ajouter/Modifier photo</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Mon profil</Text>

      {/* nom de l'aidant */}

    <View style={styles.containerInput}>
      <Text>Nom</Text>
      <TextInput style={styles.input} onChangeText={text => setnameAidant(text)} placeholder="Nom" />
    </View>

    {/* prénom de l'aidant */}
    <View style={styles.containerInput}>
      <Text>Prénom</Text>
      <TextInput style={styles.input} onChangeText={text => setfirstNameAidant(text)} placeholder="Prénom" />
    </View>

    {/* téléphone de l'aidant */}
    <View style={styles.containerInput}>
      <Text>Téléphone</Text>
      <TextInput style={styles.input} onChangeText={text => setphoneAidant(text)} placeholder="Téléphone" />
    </View>

      {/* adresse de l'aidant */}
      <View style={styles.containerInput}>
        <Text>Adresse</Text>
        <TextInput style={styles.input} onChangeText={text => setaddressAidant(text)} placeholder="Adresse" />
      </View>

    <View style={styles.doubleInput}>

      {/* code postal de l'aidant */}
      <View style={styles.smallcontainerInput}>
      <Text>Code Postal</Text>
        <TextInput style={styles.codePostal} onChangeText={text => setzipAidant(text)} placeholder="CP" />
      </View>

      {/* code postal de l'aidant */}
      <View style={styles.smallcontainerInput}>
      <Text>Ville</Text>
        <TextInput style={styles.city} onChangeText={text => setcityAidant(text)} placeholder="Ville" />
      </View>

    </View>

    <View style={styles.doubleInput}>

      {/* âge de l'aidant */}
      <View style={styles.smallcontainerInput}>
      <Text>Naissance</Text>
        <TextInput style={styles.smallinput} onChangeText={text => setageAidant(text)} placeholder="AAAA" />
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
            setsexeAidant(item)
          }}
          />
      </View>


    </View>


     {/* tarif horaire l'aidant */}
     <View style={styles.tarifcontainerInput}>
      <Text>Tarif horaire</Text>
        <TextInput style={styles.city} onChangeText={text => setratebyHour(text)} placeholder="Tarif/heure" />
      </View>

      {/* permis l'aidant */}
     <View style={styles.tarifcontainerInput}>
        <Text>Permis B</Text>
        <Switch style={{marginLeft: 30}}
        value={car}
        onValueChange={(value) => setcar(value)}
        trackColor={{ false: '#D9D9D9', true: '#5ABAB6' }}
        />
      </View>

      {/* Bouton suivant */}
      <View style={styles.buttoncontainer}>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Suivant</Text>
      </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    imageProfil: {
      flexDirection: "row",
      alignItems:"center",
    },
    input: {
      width: 250,
      height:26,
      borderBottomColor: '#5ABAB6',
      borderBottomWidth: 1,
    },
    smallinput: {
      width: 70,
      height:26,
      borderBottomColor: '#5ABAB6',
      borderBottomWidth: 1,
      marginLeft: 25,
      marginRight: 15
    },
    codePostal:  {
      width: 50,
      height:26,
      borderBottomColor: '#5ABAB6',
      borderBottomWidth: 1,
      marginLeft: 25,
      marginRight: 25
    },
    city:  {
      width: 120,
      height:26,
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
      borderRadius: 8,
      width: 120,
    },
    buttonText: {
      color: 'white',
      textAlign: "center",
  },
    })