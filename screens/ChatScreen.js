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

  const BACKEND_ADDRESS = 'nanie-backend.vercel.app';

  //récupérer infos du réducer pour user
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch();

  // afficher avec le useEffect tous les messages déjà postés en base de données pour cette conversation (mission)
  useEffect(() => {
    if (!user.token || !user.idMission) {
      return;
    }

    fetch(`http://${BACKEND_ADDRESS}/messages/allmessages/${user.token}/${user.idMission}`)
    .then(response => response.json())
    .then(data => {
      data.result && dispatch(loadMessages(data.messages));
    });
  }, [user.token, user.idMission]);

  

  // set un état pour mettre à jour le nouveau message
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    fetch(`http://${BACKEND_ADDRESS}/messages/addMessage/${user.idMission}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, idMission: user.idMission, contentMsg: newMessage }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          const createdMessage = {
            ...data.message,
            author: {
              firstName: data.message.author.firstName || '',
              name: data.message.author.name || '',
              isParent: data.message.author.isParent || false,
              photo: data.message.author.photo || '',
            },
          };
          dispatch(addMessage({ ...createdMessage, isSending: true }));
          setNewMessage('');
        }
      });
  };


  // scrollviewRef + KeyboardAwareScrollView pour voir l'input (remplace KeyboardAvoidingView)
  const scrollViewRef = useRef();
  const handleScrollToEnd = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  // definir les constantes pour les composants de messages (map de composant remplacée par data de flatlist)
  const messages = useSelector((state) => state.messages.value) || [];

  return (
    <View contentContainerStyle={styles.container}>

      <View style={styles.missionContainer}>
        <Mission idMission={user.idMission}/>
      </View>
          
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        style={styles.bottomContainer}
      >
        <View style={styles.messageContainer}>
          {messages.length > 0 &&
            <FlatList
              ref={scrollViewRef} // accéder à la ScrollView à l'intérieur de FlatList + méthode scrollToEnd() = défile auto liste vers le bas après ajout de message, dernier message reste visible sans avoir à scroller manuellement.
              data={messages} // tableau des messages (messageData)
              renderItem={({ item }) => {
                if (!item) {
                  return <View style={styles.emptyContainer}></View>
                } else if (item.isSending) {
                  return <Chat {...item} author={{ ...item.author }} />;
                } else {
                  return <Chat {...item} />;
                }
              }} // renvoi les composants Chat
              keyExtractor={(item, index) => index.toString()} // indice
              onContentSizeChange={() => handleScrollToEnd()}
              onLayout={() => handleScrollToEnd()}
              contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }} // ajuste l'espacement entre les messages lorsqu'ils s'ajoute en bas
            />
          }
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

    </View>
  )}

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: 'white',
    },
    missionContainer:{
      height: windowHeight * 0.15,
      backgroundColor: 'white',
    },
    bottomContainer:{
      backgroundColor: 'white',
    },
    messageContainer: {
      height: windowHeight * 0.60,
      flexDirection: 'column-reverse',
      backgroundColor: 'white',
    },
    emptyContainer: {
      flex: 1,
      backgroundColor: 'white',
    },
    inputContainer: {
      height: windowHeight * 0.10,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      margin: 18,
      backgroundColor: 'white',
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