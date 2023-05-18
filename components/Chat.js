import React , { useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Dimensions, Image, TextInput, Button, Platform } from 'react-native';
    // import { moment } from 'moment'; 

const start = '12-07-2023 09:00';
const end = '14-07-2023 21:00';

const conversation = [
    {sender: 'famille', message: 'Bonjour Emma, votre profil sérieux a attiré mon attention! J’aurais besoin d’un peu d’aide pour ma maman la semaine prochaine (du mardi 12 au jeudi 14 inclus). Seriez vous disponible ces jours?'},
    {sender: 'aidant', message: 'Bonsoir Léa, Oui, bien-sûr, je serais ravie de veiller sur Ginette pendant votre absence ! Je suis disponible ces jours à toute heure. Souhaitez vous discuter par téléphone ? Si votre maman a des envies particulières, n’hésitez pas à m’en faire...'},
    {sender: 'famille', message: 'Oui, parfait, je reviens vers vous d’ici ce soir avec plus de détails.  Belle journée !'},
    // {sender: 'aidant', message: 'Parfait Léa, je reste disponible si vous souhaitez des information complémentaires. A bientôt !'},
  ];

export default function Mission() {
const [newMessage, setNewMessage] = useState('');

//récupérer infos du réducer pour user
const user = useSelector((state) => state.user.value)

const handleSendMessage = () => {
  fetch(`http://192.168.10.124:3000/message/${user.token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: user.token, content: newMessage }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
        // if (data.result) {

        // }
        // data.result && dispatch(addMessage(data.message));
        //setNewMessage('');
      });
    };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
      <View style={styles.chatContainer}>
        {conversation.map((chat, index) => (
            // style : determiner si le chat provient de la famille ou de l'aidant
            <View key={index} style={chat.sender === 'famille' ? styles.familleChat : styles.aidantChat}>
            <Image source={chat.sender === 'famille' ? require('../assets/famille.png') : require('../assets/aidant.png')} style={{ width: 50, height: 50, borderRadius: 50 }} />
            <Text style={styles.chatText}>{chat.message}</Text>
            {/* <Text style={styles.time}>{moment().format('DD-MM-YYYY HH:mm')}</Text> */}
          </View>
        ))}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.chatInput}
            placeholder="Ecrire un message"
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
            <Text style={styles.buttonText}>Envoyer</Text>
          </TouchableOpacity>
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
      backgroundColor: '#ffff',
    },
    buttonText: {
      color: 'white',
    },
    chatContainer: {
      flex: 1,
      padding: 16,
    },
    familleChat: {
      width: '85%',
      alignSelf: 'flex-start',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#5ABAB6',
      marginBottom: 8,
      padding: 8,
    },
    aidantChat: {
      width: '90%',
      alignSelf: 'flex-end',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#785C83',
      marginBottom: 8,
      padding: 8,
    },
    chatText: {
      fontFamily: 'Manrope',
    },
    //   time: {
    //   fontSize: 10,
    //   color: '#000000',
    //   alignSelf: 'flex-end',
    //   marginTop: 4,
    // },
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
        borderRadius: 8,
        paddingHorizontal: 8,
        marginRight: 8,
      },
      sendButton: {
        backgroundColor: '#5ABAB6',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth * 0.25,
      },
    });