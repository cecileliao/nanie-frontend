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
} from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateEmail } from '../reducers/user';

// Grabbed from emailregex.com
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default function ConnexionScreen({ navigation }) {
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.value);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  // useEffect(() => {
  //   if(user.email){
  //     navigation.navigate('TabNavigator', { screen: 'Message' });
  //   }
  // }, []);

  const handleSubmit = () => {
    if (EMAIL_REGEX.test(email)) {
      dispatch(updateEmail(email));
      navigation.navigate('TabNavigator', { screen: 'Message' });
    } else {
      setEmailError(true);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/nanieLogoGreen.png')} />
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
          {emailError && <Text style={styles.error}>Invalid email address</Text>}
        <View style={styles.mdpLabelContainer}>
          <Text style={styles.label}>Mot de passe</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Mot de passe"
            onChangeText={(value) => setPassword(value)}
            value={password}
            style={styles.input}
          />
        </View>
        <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Connexion</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: windowWidth * 0.7,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#785C83',
    width: windowWidth * 0.4,
    margin: 20,
    borderRadius: '5%',
    padding: 10,
    alignItems: 'center',
  },
  textButton: {
    // fontFamily: 'Manrope',
    fontSize: 15,
    color: 'white',
  },
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
    top: '3.8%', // Vertical position of label. Eyeball it to see where label intersects border.
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
    top: '3.8%', // Vertical position of label. Eyeball it to see where label intersects border.
    left: '5%',
  },
  label: {
    width: windowWidth * 0.3,
    textAlign: 'left',
    color: '#5ABAB6',
    margin: 2,
    fontSize: 16,
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
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
});
