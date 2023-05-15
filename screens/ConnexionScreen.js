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
          {emailError && <Text style={styles.error}>Invalid email address</Text>}
          <TextInput
            placeholder="Mot de passe"
            onChangeText={(value) => setPassword(value)}
            value={password}
            style={styles.input}
          />
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
  inputContainer: {
    width: windowWidth * 0.4,
    backgroundColor: "white",
    padding: 30,
    borderRadius: 1,
  },
  input: {
    width: '100%',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
});
