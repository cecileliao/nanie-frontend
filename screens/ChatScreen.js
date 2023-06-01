import React, { useState, useEffect, useRef } from 'react'
import { 
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,  
  FlatList, // remplace Scrollview pour une liste optimisée qui rend les éléments à mesure qu'ils deviennent visibles à l'écran
  Dimensions,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import { loadMessages, addMessage } from '../reducers/messages';
import Mission from "../components/Mission";
import Chat from "../components/Chat";


export default function ChatScreen() {

  const BACKEND_ADDRESS = '192.168.1.21:3000';

  //récupérer infos du réducer pour user
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch();

  // afficher avec le useEffect tous les messages déjà postés en base de données pour cette conversation (mission)
  useEffect(() => {
  if (!user.token) {
    return;
  }
  //penser à dispatcher l'idMission dans le store lors du clic sur la conversation sur la page de toutes les conversations
  fetch(`http://${BACKEND_ADDRESS}/messages/allmessages/64706701113410b9cfcee642`)
    .then(response => response.json())
    .then(data => {
      data.result && dispatch(loadMessages(data.messages));
    });
  }, [setNewMessage]);

  

  // set un état pour mettre à jour le nouveau message
  const [newMessage, setNewMessage] = useState('');
  // ${user.idMission}
  // user.idMission

  const handleSendMessage = () => {
    fetch(`http://${BACKEND_ADDRESS}/messages/addMessage/64706701113410b9cfcee642`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, idMission: '64706701113410b9cfcee642', contentMsg: newMessage }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          const createdMessage = { 
            ...data.message, 
            author: {firstName: user.firstName, name: user.name, isParent: user.isParent, photo: user.photo} 
          };
          dispatch(addMessage(createdMessage));
          // console.log(dispatch(addMessage(createdMessage)))
          // {"payload": {"author": {"firstName": null, "isParent": false, "name": null, "photo": null}, "contentMsg": "Are you there ?", "dateMsg": "5/24/2023, 5:39:54 PM"}, "type": "messages/addMessage"}
          setNewMessage('');
        }
      });
  };


  // scrollviewRef + KeyboardAwareScrollView pour voir l'input (remplace KeyboardAvoidingView)
  const scrollViewRef = useRef();
  // scroll automatiquement vers le bas pour afficher le dernier message envoyé
  useEffect(() => {
    handleScrollToEnd();
  }, [messagesData]);

  const handleScrollToEnd = () => {
    scrollViewRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  // definir les constantes pour les composants de messages (map de composant remplacée par data de flatlist)
  const messagesData = useSelector((state) => state.messages.value);
  const messages = messagesData || [];

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
        <View style={styles.missionContainer}>
          <Mission/>
        </View>

        <View style={styles.messageContainer}>
          <FlatList
            ref={scrollViewRef} // accéder à la ScrollView à l'intérieur de FlatList + méthode scrollToEnd() = défile auto liste vers le bas après ajout de message, dernier message reste visible sans avoir à scroller manuellement.
            data={messages} // tableau des messages (messageData)
            renderItem={({ item }) => <Chat {...item} />} // renvoi les composants Chat
            keyExtractor={(item, index) => index.toString()} // indice
            inverted // afficher les messages les plus récents en bas
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }} // ajuste l'espacement entre les messages lorsqu'ils s'ajoute en bas
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.chatInput}
            placeholder="Ecrire un message"
            placeholderTextColor="#868686"
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
            <Text style={styles.buttonText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
    </KeyboardAwareScrollView>
  )}

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: '#ffff',
    },
    missionContainer:{
      height: windowHeight * 0.2
    },
    messageContainer: {
      flex: 1,
      flexDirection: 'column-reverse',
    },
    messageContent: {
      flexGrow: 1,
      justifyContent: 'flex-end',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: 18,
      width: windowWidth * 0.9,
      height: windowHeight * 0.15,
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
    buttonText: {
      color: 'white',
    },
})