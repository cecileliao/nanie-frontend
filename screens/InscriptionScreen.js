import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Checkbox from 'expo-checkbox';

import { useDispatch } from 'react-redux';
import { updateUser } from '../reducers/users';

// Grabbed from emailregex.com
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default function InscriptionScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);
  
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isParent, setIsParent] = useState(false);

 

  //mise à jour de l'email au clic sur connexion en vérifiant le regex
  const handleSubmit = () => {
    if(selectedProfile === 'parent' || selectedProfile === 'aidant'){
      if (EMAIL_REGEX.test(email)) {
        if (!password || password.trim() === '') {
          setErrorMessage('Le mot de passe ne peut pas être vide.'); // Set the error message for empty password
        } else if (password.length < 6) {
          setErrorMessage('Le mot de passe doit avoir au moins 6 caractères.'); // Set the error message for short password
        } else {
          if (selectedProfile === 'parent') {
            dispatch(updateUser({email, password, isParent}))
            navigation.navigate('ParentProfilScreen1', { name: 'ParentProfilScreen1' });
          } else {
            dispatch(updateUser({email, password, isParent}))
            navigation.navigate('AidantProfilScreen1', { name: 'AidantProfilScreen1' });
          }
        }
      } else {
        setErrorMessage(`Le format de l'email est invalide.`); // Set the error message for invalid email
      }
    } else {
      setErrorMessage('Vous devez obligatoirement sélectionner un profil.'); // Set the error message for empty profile
    }
  };
// variables pour le profil de l'utilisateur
  const handleParent = () => {
    setIsParent(true);
    setSelectedProfile('parent');
  };
  const handleAidant = () => {
    setIsParent(false);
    setSelectedProfile('aidant');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        
        <View style={styles.container}>

          <View style={styles.topContainer}>
            <Image style={styles.image} source={require('../assets/nanieLogoGreen.png')} />
          </View>

          <View style={styles.centerContainer}>
            <View style={styles.emailLabelContainer}>
              <Text style={styles.label}>Email</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#868686"
                autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
                keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
                textContentType="emailAddress" // https://reactnative.dev/docs/textinput#textcontenttype-ios
                autoComplete="email" // https://reactnative.dev/docs/textinput#autocomplete-android
                value={email}
                onChangeText={value => setEmail(value)}
                style={styles.input}
              />
            </View>
            <View style={styles.mdpLabelContainer}>
              <Text style={styles.label}>Mot de passe</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Mot de passe"
                placeholderTextColor="#868686"
                secureTextEntry={true}
                value={password}
                onChangeText={value => setPassword(value)}
                style={styles.input}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                title='Parent' 
                style={styles.checkbox}
                value={selectedProfile === 'parent'}
                onValueChange={handleParent}
                color={selectedProfile === 'parent' ? '#5ABAB6' : undefined}
              />
              <Text style={styles.checkboxLabel}>Parent</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                title='Aidant' 
                style={styles.checkbox} 
                value={selectedProfile === 'aidant'}
                onValueChange={handleAidant}
                color={selectedProfile === 'aidant' ? '#5ABAB6' : undefined}
              />
              <Text style={styles.checkboxLabel}>Aidant</Text>
            </View>
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
          </View>

          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
              <Text style={styles.textButton}>Inscription</Text>
            </TouchableOpacity>
          </View>

        </View>

      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  topContainer: {
    height: windowHeight * 0.20,
    flexDirection:'row',
    alignItems: "flex-start",
  },
  centerContainer: {
    height: windowHeight * 0.40,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  bottomContainer: {
    height: windowHeight * 0.25
  },

  //logo
  image: {
    width: windowWidth * 0.7,
    resizeMode: 'contain',
    position: "relative",
    top: '-45%',
  },

  // bouton inscription
  button: {
    backgroundColor: '#785C83',
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

  //input email et mot de passe
  emailLabelContainer: {
    width: windowWidth * 0.12, // white background color width, depends on label name length
    backgroundColor: "white", // Same color as background
    alignSelf: "flex-start", // Have View be same width as Text inside
    paddingHorizontal: 1, // Amount of spacing between border and first/last letter
    marginStart: 10, // How far right do you want the label to start
    zIndex: 1, // Label must overlap border
    elevation: 1, // Needed for android
    shadowColor: "white", // Same as background color because elevation: 1 creates a shadow that we don't want
    position: "relative", // Needed to be able to precisely overlap label with border
    top: '9%', // Vertical position of label. Eyeball it to see where label intersects border.
    left: '5%',
  },
  mdpLabelContainer: {
    width: windowWidth * 0.28, // white background color width, depends on label name length
    backgroundColor: "white", // Same color as background
    alignSelf: "flex-start", // Have View be same width as Text inside
    paddingHorizontal: 1, // Amount of spacing between border and first/last letter
    marginStart: 10, // How far right do you want the label to start
    zIndex: 1, // Label must overlap border
    elevation: 1, // Needed for android
    shadowColor: "white", // Same as background color because elevation: 1 creates a shadow that we don't want
    position: "relative", // Needed to be able to precisely overlap label with border
    top: '9%', // Vertical position of label. Eyeball it to see where label intersects border.
    left: '5%',
  },
  label: {
    width: windowWidth * 0.3,
    textAlign: 'left',
    color: '#5ABAB6',
    margin: 2,
    fontSize: 16,
    fontFamily: 'Manrope',
    },
  inputContainer: {
    width: windowWidth * 0.6,
    borderWidth: 1, // Create border
    borderRadius: 8, 
    borderColor: '#5ABAB6',
    padding: 20, 
    margin: 20,
    zIndex: 0, // Ensure border has z-index of 0
  },
  input: {
    width: windowWidth * 0.6,
    fontSize: 16,
    fontFamily: 'Manrope',
  },
  error: {
    marginTop: 10,
    color: 'red',
    fontFamily: 'Manrope',
  },

  // checkbox
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxLabel: {
    textAlign: 'center',
    color: '#5ABAB6',
    fontSize: 16,
    padding: 3,
    fontFamily: 'Manrope',
  },
  checkbox: {
    margin: 8,
    borderColor: '#5ABAB6',
  }
});
