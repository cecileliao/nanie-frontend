import React, { useEffect, useState } from 'react';
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

import { useDispatch, useSelector } from 'react-redux';
import { updateAidant } from '../reducers/users';

// Grabbed from emailregex.com
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default function InscriptionScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState(null);

  const [isParent, setParent] = useState(false);
  const [isAidant, setAidant] = useState(false);

  // pour ne pas avoir à se reconnecter au rechargement de l'app
  useEffect(() => {
    if(user.email){
      navigation.navigate('TabNavigator', { screen: 'Message' });
    }
  }, []);

  //mise à jour de l'email au clic sur connexion en vérifiant le regex
  const handleSubmit = () => {
    if (EMAIL_REGEX.test(email)) {
      if (isParent){
        dispatch(updateParent({ email, password }));
        setEmail('');
        setPassword('');
        navigation.navigate('ParentProfilScreen1', { name: 'ParentProfilScreen1' })
      } else {
        dispatch(updateAidant({ email, password }));
        setEmail('');
        setPassword('');
        navigation.navigate('AidantProfilScreen1', { name: 'AidantProfilScreen1' });
      }
    } else {
      setEmailError(true);
    }
  };

// variables pour le profil de l'utilisateur
  const handleParent = () => {
    setParent(!isParent);
  };
  const handleAidant = () => {
    setAidant(!isAidant);
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
                autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
                keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
                textContentType="emailAddress" // https://reactnative.dev/docs/textinput#textcontenttype-ios
                autoComplete="email" // https://reactnative.dev/docs/textinput#autocomplete-android
                onChangeText={(value) => setEmail(value)}
                value={email}
                style={styles.input}
              />
            </View>
              {emailError && <Text style={styles.error}>L'adresse email est erronée</Text>}
            <View style={styles.mdpLabelContainer}>
              <Text style={styles.label}>Mot de passe</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Mot de passe"
                secureTextEntry={true}
                onChangeText={(value) => setPassword(value)}
                value={password}
                style={styles.input}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                title='Parent' 
                style={styles.checkbox} 
                value={isParent} 
                onValueChange={setParent}
                color={isParent ? '#5ABAB6' : undefined}
                onPress={()=> handleParent}
              />
              <Text style={styles.checkboxLabel}>Parent</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                title='Aidant' 
                style={styles.checkbox} 
                value={isAidant} 
                onValueChange={setAidant}
                color={isAidant ? '#5ABAB6' : undefined}
                onPress={()=> handleAidant}
              />
              <Text style={styles.checkboxLabel}>Aidant</Text>
            </View>
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
