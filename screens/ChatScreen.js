import React, { useState, useEffect, useRef } from 'react'
import { 
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet, 
  ScrollView, 
  Platform, 
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { loadMessages, addMessage } from '../reducers/messages';
import Mission from "../components/Mission";
import Chat from "../components/Chat";


export default function ChatScreen() {

  const BACKEND_ADDRESS = '192.168.10.161:3000';

  //récupérer infos du réducer pour user
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch();

  // afficher avec le useEffect tous les messages déjà postés en base de données pour cette conversation (mission)
  useEffect(() => {
  if (!user.token) {
    return;
  }
  //penser à dispatcher l'idMission dans le store lors du clic sur la conversation sur la page de toutes les conversations
  fetch(`http://${BACKEND_ADDRESS}/messages/allmessages/${user.idMission}`)
    .then(response => response.json())
    .then(data => {
      data.result && dispatch(loadMessages(data.messages));
    });
  }, [setNewMessage]);

  
  const messagesData = useSelector((state) => state.messages.value);

  const reversedMessages = messagesData ? [...messagesData].reverse() : [];
  const messages = reversedMessages.map((data, i) => {
    return <Chat key={i} {...data} />;
  });
  

  // set un état pour mettre à jour le nouveau message
  const [newMessage, setNewMessage] = useState('');
  // ${user.idMission}
  // user.idMission

  const handleSendMessage = () => {
    fetch(`http://${BACKEND_ADDRESS}/messages/addMessage/646e03c9247b2b21b1ee131a`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, idMission: '646e03c9247b2b21b1ee131a', contentMsg: newMessage }),
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

  const scrollViewRef = useRef();

  useEffect(() => {
    // ...
    // Ajoutez cette ligne pour déclencher le défilement vers le bas après chaque nouveau message
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messagesData]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>

        <View style={styles.missionContainer}>
          <Mission/>
        </View>

        <View style={styles.messageContainer}>
          <ScrollView ref={scrollViewRef}>
          {messages}
          </ScrollView>
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

    </KeyboardAvoidingView>
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
      height: windowHeight * 0.5,
      flexDirection: 'row-reverse',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: 18,
      width: windowWidth * 0.9,
      height: windowHeight * 0.2,
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