import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addIdMission } from '../reducers/users';
import { useDispatch } from 'react-redux';


export default function OnGoingChat(props) {

  const BACKEND_ADDRESS = 'nanie-backend.vercel.app';

  const dispatch = useDispatch();

  const navigation = useNavigation();
  const handlePress = () => {
    dispatch(addIdMission({ idMission: props.idMission }))
    navigation.navigate('ChatScreen', { idMission: props.idMission })
  }


  const handleDelete = () => {
    fetch(`http://${BACKEND_ADDRESS}/missions/${props.idMission}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idMission: props.idMission }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.result) {
          console.log("La mission a été supprimée avec succès"); // suppression dans la BDD
          props.onDelete(); // Appeler la fonction onDelete du composant parent
        } else {
          // La mission n'a pas été supprimée
          console.error(data.error);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };


//numberOfLines est une prop (propriété) qui spécifie le nombre de lignes de texte à afficher avant de tronquer le contenu

return (
<View contentContainerStyle={styles.container}>
  <TouchableOpacity onPress={()=> handlePress()}>

    <View style={styles.onGoingChatContainter}>
      <Image source={{ uri: props.photo }} style={{ width: 60, height: 60, borderRadius: 50, marginLeft: 5 }} />
      <View style={styles.textContainer}>
          <Text>{props.dateMsg}</Text>
          <Text style={styles.nameText}>{props.firstName} {props.name}</Text>
          <Text
          numberOfLines={Math.floor(50 / 16)}
          style={styles.text}>{props.contentMsg}
          </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={()=> handleDelete()}>
          <Text style={styles.buttonText}>Supprimer</Text>
      </TouchableOpacity>
    </View>

  </TouchableOpacity>
</View>
    );
};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onGoingChatContainter: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 4,
    borderColor: "#5ABAB6",
    width: windowWidth * 0.95,
    height: windowHeight * 0.13,
    margin: 10,
  },
  text:{
    fontFamily: 'Manrope',
    fontSize: 12,
    maxHeight: 50,
    marginTop: 3
  },
  nameText:{
    fontFamily: 'Manrope',
    fontSize: 15,
    marginTop: 3
  },
  textContainer: {
    width: windowWidth * 0.48,
    height: windowHeight * 0.11,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#C8716E',
    width: windowWidth * 0.24,
    borderRadius: '4%',
    padding: 8,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Manrope',
    fontSize: 14,
    color: 'white',
  },
});