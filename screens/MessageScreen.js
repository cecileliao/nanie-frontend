import { View, Image, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import OnGoingChat from '../components/OnGoingChat';
import { useState, useEffect }  from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { deleteMission } from '../reducers/users';

export default function MessageScreen() {

  const BACKEND_ADDRESS = '192.168.1.21:3000';

  // récupérer infos du réducer pour user
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch();

  const [conversation, setConversation] = useState([])

  // afficher avec le useEffect le dernier message de toutes les conversations déjà postés en base de donnée pour ce user
  useEffect(() => {
    if (user?.token){
      fetch(`http://${BACKEND_ADDRESS}/messages/allchats/${user.token}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.lastMessages) {
          setConversation(data.lastMessages);
        }
      });
    } else {
      return;
    }
  }, [user?.token]);


  // supprimer une mission
  const handleMissionDelete = (missionId) => {
    // Supprimer la mission de la liste des conversations
    const updatedConversation = conversation.filter(item => item.idMission !== missionId);
    setConversation(updatedConversation);
    // Dispatch l'action pour supprimer la mission du store Redux
    dispatch(deleteMission(missionId));
  };

  
  const allConversations = conversation?.map((data,i) => {
    return (
      <OnGoingChat
        key = {i}
        name = {data.name}
        firstName = {data.firstName}
        contentMsg = {data.contentMsg}
        photo = {data.photo}
        dateMsg = {data.dateMsg}
        idMission = {data.idMission}
        onDelete={() => handleMissionDelete(data.idMission)}
      />
    )
  })


  return (
  <SafeAreaView style={styles.container}>

    {conversation && conversation.length > 0 ? (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {allConversations}
      </ScrollView>
      ) : (
      <View style={styles.noMessageContainer}>
        <Image
        source={require("../assets/pasdeMessage.png")}
        style={{width: windowWidth * 0.92, height: windowHeight * 0.31}}/>
        <Text style={styles.text}>Vous n’avez pas de conversation en cours</Text>
      </View>
      )}

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
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noMessageContainer: {
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