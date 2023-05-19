import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/users';
import { 
    TouchableOpacity, 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    Keyboard,
    TouchableWithoutFeedback, 
    Dimensions,
    KeyboardAvoidingView,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

export default function ParentProfilScreen2({ navigation }) {

  const [name, setName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [age, setAge] = useState(null);
  const [sexe, setSexe] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [zip, setZip] = useState(null);

  //etat pour afficher erreur si mauvaise structure
  const [zipError, setZipError] = useState(false);
  const [birthYearError, setbirthYearError] = useState(false);

  const validateZip = (zip) => {
    const ZIP_REGEX = /^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$/;
    return ZIP_REGEX.test(zip);
  };

  const validatebirthYear = (birthyear) => {
    const BIRTH_REGEX = /^(19|20)\d{2}$/;
    return BIRTH_REGEX.test(birthyear);
  };
    
  //menu dropdown pour le sexe
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Femme', value: 'femme'},
    {label: 'Homme', value: 'homme'},
    {label: 'Indifférent', value: 'indifférent'},
  ]);

  // mise en place du input + compteur
    //phrase intro de l'aidant
    const [introBio, setintroBio] = useState("");
    //afficher le nombre de caractères restants sur le textInput
    const [shortIntroremainingCharacters, setshortIntroRemainingCharacters] = useState(100);
    //pour le nombre de caractères de la phrase d'introduction
    useEffect(() => {
      const charactersCount = introBio.length;
      const shortremainingCount = 100 - charactersCount;
      setshortIntroRemainingCharacters(shortremainingCount);
    }, [introBio]);


  //récupération info user au moment d'appuyer sur le bouton suivant
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value)

  // bouton suivant
  const handleNext = () => {
    
    let isValid = true; // est-ce que tous les regex sont valides ?
  
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
      dispatch(updateUser({name, firstName, age, sexe, city, zip, address, introBio}))

      navigation.navigate('ParentProfilScreen3');
    }
  };
  // console.log(user)


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>

        <View style={styles.profilContainer}>

          <Text style={styles.firsttitle}>Profil de mon aîné</Text>

          {/* nom de l'aîné */}
          <View style={styles.containerInput}>
            <Text>Nom</Text>
            <TextInput 
              style={styles.input} 
              value={name}
              onChangeText={value => setName(value)} 
              placeholder="Nom" />
          </View>

          {/* prénom de l'aîné */}
          <View style={styles.containerInput}>
            <Text>Prénom</Text>
            <TextInput 
              style={styles.input} 
              value={firstName}
              onChangeText={value => setFirstName(value)} 
              placeholder="Prénom" />
          </View>

          {/* adresse de l'aîné */}
          <View style={styles.containerInput}>
            <Text>Adresse</Text>
            <TextInput style={styles.input} 
              value={address}
              onChangeText={value => setAddress(value)} 
              placeholder="Adresse" />
          </View>

          <View style={styles.doubleInput}>
            {/* code postal de l'aîné */}
            <View style={styles.smallcontainerInput}>
              <Text>Code Postal</Text>
              <TextInput style={styles.codePostal} 
                value={zip}
                onChangeText={value => setZip(value)} 
                placeholder="CP" />
            </View>

            {/* ville de l'aîné */}
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
            {/* âge de l'aîné */}
            <View style={styles.smallcontainerInput}>
              <Text>Age</Text>
              <TextInput style={styles.smallinput}
                value={age}
                onChangeText={value => setAge(value)} 
                placeholder="AAAA" />
            </View>
            
            {/* sexe de l'aîné */}
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
                dropDownContainerStyle={{ width: 120, marginLeft: 15, marginBottom: 15, borderColor: '#5ABAB6', backgroundColor: 'white', opacity: 1 }}
                onSelectItem={(item) => {
                  setSexe(item.value)}
                }
              />
            </View>
          </View>
            {birthYearError && <Text style={{color:"red", textAlign: "center", marginBottom: 10}}>Année de naissance non valide</Text>}
        </View>

        {/* Phrase intro */}
        <View style={styles.introContainer}>
          <Text style={styles.title}>Votre aîné en quelques mots</Text>
          <TextInput
              style={styles.introInput}
              value={introBio}
              onChangeText={value => setintroBio(value)} 
              placeholder="Phrase d’introduction sur votre aîné ..."
              textAlignVertical="top" //sur android pour center le placeholder en haut
              multiline={true} //sur ios pour center le placeholder en haut
              maxLength={100} //taille max de la phrase
          />
          <View style={styles.characterCountContainer}>
            <Text style={styles.characterCountText}>{shortIntroremainingCharacters}</Text>
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
    justifyContent: 'space-around', // par défaut justify-content: 'flex-start', pour que le padding du keyboardavoiding fonctionne il faut le mettre sur flex-end ou center
  },
  introContainer: {
    height:windowHeight * 0.15,
    position: 'relative',
    zIndex: -1, // pour afficher le background du dropdown menu
  },
  //input text
  input: {
    width: windowWidth * 0.66,
    height: windowHeight * 0.035,
    borderBottomColor: '#5ABAB6',
    borderBottomWidth: 1,
  },
  introInput:{
    height:windowHeight * 0.10,
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
  //titres
  firsttitle: {
    fontFamily: "Recoleta",
    fontSize: 20,
    color: "#785C83",
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 20,
    height: windowHeight * 0.04,
    width: windowWidth * 0.9,
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
  buttonText: {
    fontFamily: 'Manrope',
    fontSize: 16,
    color: 'white',
  },
    })