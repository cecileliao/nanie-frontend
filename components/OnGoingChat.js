import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';


const OnGoingChat = () => {



      

return (
<View contentContainerStyle={styles.container}>
    <View style={styles.onGoingChatContainter}>
    <Image source={require('../assets/aidant.png')} style={{ width: 60, height: 60, borderRadius: 50, marginLeft: 5 }} />
    <View style={styles.textContainer}>
        <Text>08/05/2023 15:02</Text>
        <Text style={styles.nameText}>A: Emma Lorrain</Text>
        <Text
        numberOfLines={Math.floor(50 / 16)}
        style={styles.text}>Merci pour votre confirmation. Je vous confirme l'heure de ma venue mercredi après-midi pour 2 heures
        </Text>
    </View>
    <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Supprimer</Text>
      </TouchableOpacity>

    </View>
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
    width: windowWidth * 0.25,
    borderRadius: '4%',
    padding: 10,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Manrope',
    fontSize: 14,
    color: 'white',
  },
});

export default OnGoingChat;