import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text,  
  KeyboardAvoidingView, 
  Dimensions, 
  Image, 
  Platform,
} from 'react-native';
import { moment } from 'moment'; 
import 'moment/locale/fr';
import { useSelector } from 'react-redux';

// const conversation = [
//     {sender: 'famille', message: 'Bonjour Emma, votre profil sérieux a attiré mon attention! J’aurais besoin d’un peu d’aide pour ma maman la semaine prochaine (du mardi 12 au jeudi 14 inclus). Seriez vous disponible ces jours?'},
//     {sender: 'aidant', message: 'Bonsoir Léa, Oui, bien-sûr, je serais ravie de veiller sur Ginette pendant votre absence ! Je suis disponible ces jours à toute heure. Souhaitez vous discuter par téléphone ? Si votre maman a des envies particulières, n’hésitez pas à m’en faire part.'},
//     {sender: 'famille', message: 'Oui, parfait, je reviens vers vous d’ici ce soir avec plus de détails.  Belle journée !'},
//     // {sender: 'aidant', message: 'Parfait Léa, je reste disponible si vous souhaitez des information complémentaires. A bientôt !'},
//   ];

const BACKEND_ADDRESS = '192.168.10.161:3000';
// {conversation.map((chat, index) => (
//   // style : determiner si le chat provient de la famille ou de l'aidant
//   <View key={index} style={chat.sender === 'famille' ? styles.familleChat : styles.aidantChat}>
//     <Image source={chat.sender === 'famille' ? require('../assets/famille.png') : require('../assets/aidant.png')} style={{ width: 50, height: 50, borderRadius: 50 }} />
//     <Text style={styles.chatText}>{chat.message}</Text>
//     {/* <Text style={styles.time}>{moment().format('DD-MM-YYYY HH:mm')}</Text> */}
//   </View>
// ))}


export default function Chat(props) {

  //récupérer infos du réducer pour user
  const user = useSelector((state) => state.user.value)
  // console.log('props', props)
  // props {"author": {"firstName": null, "isParent": false, "name": null, "photo": null}, "contentMsg": "Hi", "dateMsg": "5/24/2023, 5:39:54 PM"}

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
      <View style={styles.chatContainer}>
        <View style={user.isParent ? styles.familleChat : styles.aidantChat}>
          <Image source={{ uri: props.author.photo }} style={{ width: 50, height: 50, borderRadius: 50 }} />
          <Text style={styles.chatText}>{props.contentMsg}</Text>
          <Text style={styles.time}>{props.dateMsg}</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'white',
  },
  chatContainer: {
    flex: 1,
    width: windowWidth * 0.95
  },
  familleChat: {
    width: '85%',
    alignSelf: 'flex-start',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#5ABAB6',
    marginBottom: 15,
    marginTop: 15,
    padding: 8,
  },
  aidantChat: {
    width: '85%',
    alignSelf: 'flex-end',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#785C83',
    marginBottom: 8,
    padding: 8,
  },
  chatText: {
    fontFamily: 'Manrope',
  },
  time: {
    fontSize: 10,
    color: '#000000',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    width: '90%',
  },
  chatInput: {
    flex: 3,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#785C83',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.25,
  },
});