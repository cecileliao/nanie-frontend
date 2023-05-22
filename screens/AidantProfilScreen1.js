import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/users';
import { addPhoto, removePhoto } from '../reducers/users';
import { KeyboardAvoidingView, 
  TouchableOpacity, 
  Switch, View, Text, TextInput, Dimensions,
  StyleSheet, Image, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from "expo-image-picker";

export default function AidantProfilScreen1({ navigation }) {

  const BACKEND_ADDRESS = '192.168.10.177:3000';

  //récupération info user au moment d'appuyer sur le bouton suivant
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value)

    const [hasPermission, setHasPermission] = useState(false);

    const [name, setName] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [age, setAge] = useState(null);
    const [sexe, setSexe] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [zip, setZip] = useState(null);
    const [car, setCar] = useState(false);
    const [rate, setRate] = useState(null);

  //menu dropdown pour le sexe
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Femme', value: 'femme'},
      {label: 'Homme', value: 'homme'},
      {label: 'Indifférent', value: 'indifférent'},
    ]);

  //Gestion de la photo de profil
    const [photo, setphoto] = useState("");

    useEffect(() => {
      (async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

  //Image upload from device library w/ ImagePickerExpo
    const handleImageUpload = async () => {

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      // check if user canceled the image selection // selectedImage state updated with uri
      // if (!result.canceled) {
        // setphoto(result.uri);
        console.log(result);
        const photo = result.assets[0].uri
        // console.log('photo', result.uri);

        const formData = new FormData();
        formData.append('photoFromFront', {
          uri: photo,
          name: 'photo.jpg',
          type: 'image/jpeg',
        });

        fetch(`http://${BACKEND_ADDRESS}/upload`, {
          method: 'POST',
          body: formData,
        }).then((response) => response.json())
          .then((data) => {
            console.log('upload', data)
            data.result && dispatch(addPhoto(data.url));
          });
      // }

    };


  // if (!hasPermission) {
  //   return <View />;
  // }


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
  
    if (!validateTel(phone)) {
      setPhoneError(true);
      isValid = false;
    } else {
      setPhoneError(false);
    }
  
    if (!validateZip(zip)) {
      setZipError(true);
      isValid = false;
    } else {
      setZipError(false);
    }
  
    if (!validatebirthYear(age)) {
      setbirthYearError(true);
      isValid = false;
    } else {
      setbirthYearError(false);
    }
  
    if (isValid) {
      //console.log(user)
      dispatch(updateUser({name, firstName, phone, age, sexe, city, zip, address, photo,
        aidant: {
          car: car,
          rate: rate,
        }
      }))
      //console.log(user)
      navigation.navigate('AidantProfilScreen2');
    }
  };
    
  

  return (
<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>

      {/* image de profil */}
      <View style={styles.imageProfil}>
        <TouchableOpacity onPress={handleImageUpload}>
          <Image source={photo ? { uri: photo } : require("../assets/userPicture.png")}
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
        <TextInput 
          style={styles.input} 
          value={name}
          onChangeText={value => setName(value)} 
          placeholder="Nom" />
      </View>

      {/* prénom de l'aidant */}
      <View style={styles.containerInput}>
        <Text>Prénom</Text>
        <TextInput 
          style={styles.input} 
          value={firstName}
          onChangeText={value => setFirstName(value)} 
          placeholder="Prénom" />
      </View>

      {/* téléphone de l'aidant */}
      <View style={styles.containerInput}>
          <Text>Téléphone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={value => setPhone(value)} 
            placeholder="Téléphone"/>
      </View>
      {phoneError && <Text style={{color:"red", textAlign: "center", marginBottom: 10}}>Téléphone non valide</Text>}

      {/* adresse de l'aidant */}
      <View style={styles.containerInput}>
        <Text>Adresse</Text>
        <TextInput style={styles.input} 
          value={address}
          onChangeText={value => setAddress(value)} 
          placeholder="Adresse" />
      </View>


      <View style={styles.doubleInput}>
        {/* code postal de l'aidant */}
        <View style={styles.smallcontainerInput}>
          <Text>Code Postal</Text>
          <TextInput style={styles.codePostal} 
            value={zip}
            onChangeText={value => setZip(value)} 
            placeholder="CP" />
        </View>

        {/* ville de l'aidant */}
        <View style={styles.smallcontainerInput}>
          <Text>Ville</Text>
          <TextInput style={styles.city} 
            value={city}
            onChangeText={value => setCity(value)} 
            placeholder="Ville" />
        </View>
    </View>
        {zipError && <Text style={{color:"red", textAlign: "center", marginBottom: 10}}>Code postal non valide</Text>}

    <View style={styles.doubleInput}>
      {/* âge de l'aidant */}
      <View style={styles.smallcontainerInput}>
        <Text>Naissance</Text>
        <TextInput style={styles.smallinput}
          value={age}
          onChangeText={value => setAge(value)} 
          placeholder="AAAA" />
      </View>
      
      {/* sexe de l'aidant */}
      <View style={styles.smallcontainerInput}>
          <Text>Sexe</Text>
          <DropDownPicker style={{width: 120, marginLeft: 15, borderColor: '#5ABAB6'}} 
            placeholderStyle={{color: "grey"}} 
            disabledStyle={{opacity: 0.5}}
            open={open}
            value={value}
            items={items}
            placeholder="Sexe"
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            dropDownContainerStyle={{ width: 120, marginLeft: 15, marginBottom: 15, borderColor: '#5ABAB6' }}
            onSelectItem={(item) => {
              setSexe(item.value)}
            }/>
      </View>
    </View>
    {birthYearError && <Text style={{color:"red", textAlign: "center", marginBottom: 10}}>Année de naissance non valide</Text>}

    {/* tarif horaire l'aidant */}
    <View style={styles.tarifcontainerInput}>
      <Text>Taux horaire</Text>
      <TextInput style={styles.city} 
        value={rate}
        onChangeText={value => setRate(value)} 
        placeholder="Taux horaire" />
    </View>

    {/* permis l'aidant */}
    <View style={styles.tarifcontainerInput}>
      <Text>Permis B</Text>
      <Switch style={{marginLeft: 30}}
        value={car}
        onValueChange={(value) => setCar(value)}
        trackColor={{ false: '#D9D9D9', true: '#5ABAB6' }}
      />
    </View>

    {/* Bouton suivant */}
    <View style={styles.buttonContainer}>
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
    //bouton suivant
    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      marginTop: 50,
      height:windowHeight* 0.1,
    },
    button: {
      backgroundColor: '#5ABAB6',
      width: windowWidth * 0.4,
      margin: 20,
      borderRadius: '5%',
      padding: 10,
      alignItems: 'center',
    },
    buttonText: {
      fontFamily: 'Manrope',
      fontSize: 16,
      color: 'white',
    },
  })