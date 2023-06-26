import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/users';
import { 
    TouchableOpacity, 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    Image, 
    Keyboard,
    TouchableWithoutFeedback, 
    Dimensions,
    KeyboardAvoidingView,
} from 'react-native'
import * as ImagePicker from "expo-image-picker";


export default function ParentProfilScreen1({ navigation }) {

  const BACKEND_ADDRESS = 'nanie-backend.vercel.app';

  //récupération info user au moment d'appuyer sur le bouton suivant
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value)

    const [hasPermission, setHasPermission] = useState(false);

  //Set les états
    const [nameParent, setNameParent] = useState(null);
    const [firstNameParent, setFirstNameParent] = useState(null);
    const [phone, setPhone] = useState(null);
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
      if (!result.canceled) {
        setphoto(result.uri);
        // console.log(result);
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
            // console.log('upload', data)
            data.result && dispatch(updateUser({photo: data.url}));
          });
     }

    };


  // if (!hasPermission) {
  //   return <View />;
  // }


  //Afficher erreur si mauvaise structure
    const [phoneError, setPhoneError] = useState(false);
    const validateTel = (phone) => {
      const PHONE_REGEX = /^[+0-9]+$/;
      return PHONE_REGEX.test(phone);
    };

  //description du parent
    const [shortBio, setShortbio] = useState('');
  //afficher le nombre de caractères restants sur le textInput
    const [shortbioRemainingCharacters, setShortbioRemainingCharacters] = useState(300);
  //pour le nombre de caractères de la description détaillée
    useEffect(() => {
      const charactersCount = shortBio.length;
      const longremainingCount = 300 - charactersCount;
      setShortbioRemainingCharacters(longremainingCount);
    }, [shortBio]);
  
  // fonction bouton Suivant 
    const handleNext = () => {
      if (!validateTel(phone)) {
        setPhoneError(true);
      } else {
        setPhoneError(false);
        dispatch(updateUser({ phone, photo, 
          parent: {
            nameParent: nameParent, //attention bien remettre les : nameParent ici sinon cela ne fonctionne pas meme si c'est le meme nom
            firstNameParent: firstNameParent, 
            shortBio: shortBio
          }}))
          
        navigation.navigate('ParentProfilScreen2');
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
          <TouchableOpacity style={styles.photoText} onPress={handleImageUpload}>
            <Text>Ajouter/modifier une photo de famille.</Text>
            <Text>Vous avec votre Parent</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Mon profil de proche {'('}contact{')'}</Text>
          {/* nom du Parent */}
          <View style={styles.containerInput}>
              <Text>Nom</Text>
              <TextInput 
                style={styles.input} 
                value={nameParent}
                onChangeText={value => setNameParent(value)} 
                placeholder="Nom"
                placeholderTextColor="#868686" />
          </View>
          {/* prénom du Parent */}
          <View style={styles.containerInput}>
              <Text>Prénom</Text>
              <TextInput 
                style={styles.input} 
                value={firstNameParent}
                onChangeText={value => setFirstNameParent(value)} 
                placeholder="Prénom"
                placeholderTextColor="#868686" />
          </View>
          {/* téléphone du parent */}
          <View style={styles.containerInput}>
              <Text>Téléphone</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={value => setPhone(value)} 
                placeholder="Téléphone"
                placeholderTextColor="#868686"/>
          </View>
          {phoneError && <Text style={{color:"red", textAlign: "center", marginBottom: 10}}>Téléphone non valide</Text>}

          {/* Présentation courte */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.title}>Présentation courte</Text>
            <TextInput
                style={styles.longinput}
                value={shortBio}
                onChangeText={value => setShortbio(value)}
                placeholder="Description de mes liens et ma relation avec l’aîné ..."
                placeholderTextColor="#868686"
                textAlignVertical="top" //sur android pour center le placeholder en haut
                multiline={true} //sur ios pour center le placeholder en haut
                maxLength={300} //taille max de la phrase
            />
            <View style={styles.characterCountContainer}>
              <Text style={styles.characterCountText}>{shortbioRemainingCharacters}</Text>
            </View>
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
    descriptionContainer: {
      height:windowHeight * 0.26,
    },
    imageProfil: {
      flexDirection: "row",
      alignItems:"center",
    },
    photoText: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      width: windowWidth * 0.66,
      height: windowHeight * 0.035,
      borderBottomColor: '#5ABAB6',
      borderBottomWidth: 1,
    },
    longinput: {
      height: windowHeight * 0.20,
      borderColor: '#5ABAB6',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      fontSize: 13,
      marginLeft:20,
      marginRight:25,
      marginBottom:25,
      fontFamily: 'Manrope',
    },
    // compteur
    characterCountContainer: {
      position: 'absolute',
      bottom: -10,
      right: 40,
      backgroundColor: 'white',
      borderRadius: 5,
    },
    characterCountText: {
      color: '#868686',
      fontSize: 12,
      fontFamily: 'Manrope',
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
    title: {
      height: windowHeight * 0.04,
      width: windowWidth * 0.9,
      fontFamily: "Recoleta",
      fontSize: 20,
      color: "#785C83",
      marginLeft: 20,
      marginBottom: 10,
      marginTop: 30,
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