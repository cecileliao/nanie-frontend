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
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/users';
import DropDownPicker from 'react-native-dropdown-picker';

// Grabbed from emailregex.com
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default function ConnexionScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [profilError, setProfilError] = useState(false);


  const [isParent, setParent] = useState(false);
  const [isAidant, setAidant] = useState(false);

  //menu dropdown pour le sexe
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Parent', value: 'Parent'},
    {label: 'Aidant', value: 'Aidant'},
  ]);

  // // pour ne pas avoir à se reconnecter au rechargement de l'app
  // useEffect(() => {
  //   if(user.email !== null){
  //     navigation.navigate('TabNavigator', { screen: 'Message' });
  //   }
  // }, []);

  //mise à jour de l'email au clic sur connexion en vérifiant le regex
  const handleConnexion = () => {
    if (isParent) {
      if (EMAIL_REGEX.test(email)) {
        fetch('http://192.168.1.21:3000/parentUsers/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        })
        .then(response => response.json())
        .then(data => {
          if (data.result) {
            dispatch(login({ email, token: data.token }));
            setEmail('');
            setPassword('');
            navigation.navigate('TabNavigator', { screen: 'Message' });
          } else {
            setErrorMessage(true);
          }
        }) // fin du fetch parent
      } else {
        setEmailError(true);
      } // fin du if regex
    } // fin du if parent

    else if (isAidant) {
      if (EMAIL_REGEX.test(email)) {
        fetch('http://192.168.1.21:3000/aidantUsers/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        })
        .then(response => response.json())
        .then(data => {
          if (data.result) {
            dispatch(login({ email, token: data.token }));
            setEmail('');
            setPassword('');
            navigation.navigate('TabNavigator', { screen: 'Message' });
          } else {
            setErrorMessage(true);
          }
        }) // fin du fetch aidant
      } else {
        setEmailError(true);
      } // fin du if regex
    } // fin du else if aidant

    else {
      setProfilError(true);
    } // fin du if global
  };

  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.container}>

          <View style={styles.topContainer}>
            <Image style={styles.image} source={require('../assets/nanieLogoGreen.png')} />
          </View>

          <View style={styles.centerContainer}>
            <DropDownPicker style={{width: 120, marginLeft: 15, borderColor: '#5ABAB6'}} placeholderStyle={{color: "grey"}} disabledStyle={{opacity: 0.5}}
              open={open}
              value={value}
              items={items}
              placeholder="Profil"
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              dropDownContainerStyle={{ width: 120, marginLeft: 15, marginBottom: 15, borderColor: '#5ABAB6' }}
              onSelectItem={(item) => {
                if (item.value === 'Parent') {
                  setParent(true)
                } else {
                  setAidant(true)
                }
              }}
              />
            {profilError && <Text style={styles.error}>Choisir un profil</Text>}
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
              {emailError && <Text style={styles.error}>Format d'email incorrect.</Text>}
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
            {errorMessage && <Text style={styles.error}>Email/Password inexistant ou non valide</Text>}
          </View>

          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={() => handleConnexion()} style={styles.button} activeOpacity={0.8}>
              <Text style={styles.textButton}>Connexion</Text>
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
    height: windowHeight * 0.30,
    flexDirection: 'column',
    justifyContent: 'center',
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
  // bouton connexion
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
  //input
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
    top: '12%', // Vertical position of label. Eyeball it to see where label intersects border.
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
    top: '12%', // Vertical position of label. Eyeball it to see where label intersects border.
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
    borderRadius: 8, // Not needed. Just make it look nicer.
    borderColor: '#5ABAB6',
    padding: 20, // Also used to make it look nicer
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
});
