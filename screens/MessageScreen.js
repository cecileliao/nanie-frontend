import { View, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import OnGoingChat from '../components/OnGoingChat';
import { useState, useEffect }  from 'react'
import { useSelector, useDispatch} from 'react-redux';

export default function MessageScreen() {

  //récupérer infos du réducer pour user
  const user = useSelector((state) => state.user.value)

  const BACKEND_ADDRESS = '192.168.1.14:3000';

  const [conversation, setConversation] = useState([])
  const token = useSelector((state) => state.token.value)
  const dispatch = useDispatch();

  // afficher avec le useEffect tous les messages déjà postés en base de données pour cette conversation (mission)
  useEffect(() => {
  if (!user.token) {
    return;
  }
  fetch(`http://${BACKEND_ADDRESS}/allmessages/${user.token}`)
    .then(response => response.json())
    .then(data => {
      if(data){
        setConversation(data.lastMessages)
      }
      
    });
  }, []);

  const allConversations = conversation.map((data,i) => {

    return (
      <OnGoingChat
        key = {i}
        name = {data.name}
        firstName = {data.firstName}
        contentMsg = {data.contentMsg}
        photo = {data.photo}
        dateMsg = {data.dateMsg}
      />
    )
  })


  return (
<SafeAreaView style={styles.container}>
  <ScrollView contentContainerStyle={styles.scrollContainer}>
  {conversation ? (
      <View>
        {allConversations}
      </View>
        ) : (
      <View>
        <Image
        source={require("../assets/pasdeMessage.png")}
                      style={{width: windowWidth * 0.92, height: windowHeight * 0.31}}/>
        <Text style={styles.text}>Vous n’avez pas de conversation en cours</Text>
      </View>
    )}
  </ScrollView>
</SafeAreaView>
  )
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#868686',
    fontFamily: 'Manrope',
    fontSize: 15,
    marginTop: 25
},
  })