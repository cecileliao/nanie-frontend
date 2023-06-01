import React, { useState, useEffect }  from 'react'
import { useSelector} from 'react-redux';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
// import moment from 'moment-timezone';
// import 'moment/locale/fr';
import { useNavigation } from '@react-navigation/native';


export default function OnGoingChat(props) {




  const navigation = useNavigation();
  const handleValidate = () => {
    navigation.navigate('ChatScreen')
  }




return (
<View contentContainerStyle={styles.container}>
  <TouchableOpacity onPress={()=> handleValidate()}>

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
    <TouchableOpacity style={styles.button}>
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