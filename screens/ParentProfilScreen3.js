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

export default function ParentProfilScreen3({ navigation }) {

// mise en place du input + compteur

  //description détaillée de l'aîné
  const [longBio, setlongBio] = useState("");
  //description de la perle rare
  const [gemProfil, setgemProfil] = useState("");

  //afficher le nombre de caractères restants sur le textInput
  const [longIntroremainingCharacters, setlongIntroRemainingCharacters] = useState(300);
  const [gemProfilremainingCharacters, setgemProfilRemainingCharacters] = useState(300);

  //pour le nombre de caractères de la description détaillée
  useEffect(() => {
    const charactersCount = longBio.length;
    const longremainingCount = 300 - charactersCount;
    setlongIntroRemainingCharacters(longremainingCount);
  }, [longBio]);

  //pour le nombre de caractères de la description détaillée
  useEffect(() => {
          const charactersCount = gemProfil.length;
          const gemProfilRemainingCount = 300 - charactersCount;
          setgemProfilRemainingCharacters(gemProfilRemainingCount);
  }, [gemProfil]);


  //récupération info user au moment d'appuyer sur le bouton suivant
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value)

  // bouton suivant
  const handleNext = () => {
      dispatch(updateUser({longBio, 
        parent: {
          nameParent: user.parent.nameParent, // récuperer les infos des précédentes pages sinon elles seront perdues
          firstNameParent: user.parent.firstNameParent, 
          shortBio: user.parent.shortBio,
          gemProfil: gemProfil, // attention bien remettre les : nameParent ici sinon cela ne fonctionne pas meme si c'est le meme nom
        }}))
      navigation.navigate('ParentProfilScreen4');
  };

  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>


        {/* Description détaillée */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.firsttitle}>Présentation détaillée de mon aîné</Text>
          <TextInput
              style={styles.longinput}
              value={longBio}
              onChangeText={value => setlongBio(value)} 
              placeholder="Description de mon aîné, de ses interêts, sa personnalité, ses besoins ..."
              placeholderTextColor="#868686"
              textAlignVertical="top" //sur android pour center le placeholder en haut
              multiline={true} //sur ios pour center le placeholder en haut
              maxLength={300} //taille max de la phrase
          />
          <View style={styles.characterCountContainer}>
            <Text style={styles.characterCountText}>{longIntroremainingCharacters}</Text>
          </View>
        </View>

        {/* Perle rare */}
        <View style={styles.perlerareContainer}>
          <Text style={styles.title}>La perle rare recherchée</Text>
          <TextInput
              style={styles.longinput}
              value={gemProfil}
              onChangeText={value => setgemProfil(value)} 
              placeholder="Description du profil de personne recherché ..."
              placeholderTextColor="#868686"
              textAlignVertical="top" //sur android pour center le placeholder en haut
              multiline={true} //sur ios pour center le placeholder en haut
              maxLength={300} //taille max de la phrase
          />
          <View style={styles.characterCountContainer}>
            <Text style={styles.characterCountText}>{gemProfilremainingCharacters}</Text>
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
  descriptionContainer: {
    height:windowHeight * 0.26,
  },
  perlerareContainer: {
    height:windowHeight * 0.26,
  },
  //input text
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