import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateParent } from '../reducers/users';
import { 
    TouchableOpacity, 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    Image, 
    Keyboard,
    TouchableWithoutFeedback, 
} from 'react-native'
import * as ImagePicker from "expo-image-picker";

export default function ParentProfilScreen1({ navigation }) {

  //photo de profil
  const [photoParent, setphotoParent] = useState("");

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
      dispatch(updateParent({photoParent: result.uri}))}
  };

    // Presentation du Parent
    const [shortbioParent, setShortbioParent] = useState("");

    //afficher le nombre de caractères restants sur le textInput
    const [shortbioRemainingCharacters, setShortbioRemainingCharacters] = useState(300);
    
    //pour le nombre de caractères de la description détaillée
    useEffect(() => {
      const charactersCount = shortbioParent.length;
      const shortbioRemainingCount = 300 - charactersCount;
      setShortbioRemainingCharacters(shortbioRemainingCount);
    }, [shortbioParent]);


    //récupération info user au moment d'appuyer sur le bouton suivant
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value)

    const handleShortbioParent = (text) => {
      setShortbioParent(text)
      dispatch(updateParent())
    }

    // bouton suivant
    const handleNext = () => {
      navigation.navigate('ParentProfilScreen2');
    };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>

        {/* image de profil */}
        <View style={styles.imageProfil}>
          <TouchableOpacity onPress={handleImageUpload}>
            <Image 
              source={photoParent ? { uri: photoParent } : require("../assets/userPicture.png")}
              style={{ width: 96, height: 96, margin: 20 }} 
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleImageUpload}>
            <Text>Ajouter/modifier une photo de famille.</Text>
            <Text>Vous avec votre Parent</Text>
          </TouchableOpacity>
        </View>


        <Text style={styles.title}>Mon profil de proche {'('}contact{')'}</Text>

        {/* nom du Parent */}
        <View style={styles.containerInput}>
          <Text>Nom</Text>
          <TextInput style={styles.input} value={user.nameParent} onChangeText={text => dispatch(update({nameParent: text}))} placeholder="Nom" />
        </View>

        {/* prénom du Parent */}
        <View style={styles.containerInput}>
          <Text>Prénom</Text>
          <TextInput style={styles.input} value={user.firstNameParent} onChangeText={text => dispatch(updateParent({firstNameParent: text}))} placeholder="Prénom" />
        </View>

        {/* téléphone du Parent */}
        <View style={styles.containerInput}>
          <Text>Téléphone</Text>
          <TextInput style={styles.input} value={user.phoneParent} onChangeText={text => dispatch(updateParent({phoneParent: text}))} placeholder="Téléphone" />
        </View>

        {/* Présentation courte */}
        <View style={styles.shortbioContainer}>
          <Text style={styles.title}>Présentation courte</Text>
          <TextInput
              style={styles.longinput}
              value={user.shortBioParent}
              onChangeText={text => handleShortbioParent(text)}
              placeholder="Description de mes liens et ma relation avec l’aîné ..."
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
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center', // par défaut justify-content: 'flex-start', pour que le padding du keyboardavoiding fonctionne il faut le mettre sur flex-end ou center
    },
    //image
    imageProfil: {
      flexDirection: "row",
      alignItems:"center",
    },
    //titre
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
    //input
    containerInput: {
      fontSize: 13,
      flexDirection: "row",
      alignItems:"center",
      justifyContent: "space-between",
      marginLeft:20,
      marginRight:25,
      marginBottom:25,
    },
    input: {
      width: 250,
      height:26,
      borderBottomColor: '#5ABAB6',
      borderBottomWidth: 1,
    },
    //shortbio
    shortbioContainer: {
      height:windowHeight * 0.26,
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
    textButton: {
      fontFamily: 'Manrope',
      fontSize: 16,
      color: 'white',
    },
    })