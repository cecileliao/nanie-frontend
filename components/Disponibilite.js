import React from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import moment from 'moment';
import 'moment/locale/fr';

const Disponibilite = (props) => {

      ///////////////////////formatage date
  //formatage de la date pour l'afficher sous format DD/MM/YYYYY
  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
  };

  //formatage de l'heure pour ne pas afficher les secondes
  const formatTime = (date) => {
    return moment(date).format('HH:mm');
  };

   

  return (

<View contentContainerStyle={styles.scrollContainer}>
        <View style={styles.dispocontainer}>
            <View style={styles.debutfincontainer}>
                <Text style={styles.text}>Debut</Text>
                <Text style={styles.textStart}>{formatDate(props.startingDay)}</Text>
                <Text style={styles.textStartHour}>{formatTime(props.startingHour)}</Text>
            </View>
            <View style={styles.debutfincontainer}>
                <Text style={styles.text}>Fin</Text>
                <Text style={styles.textEndDay}>{formatDate(props.endingDay)}</Text>
                <Text style={styles.textEndHour}>{formatTime(props.endingHour)}</Text>
            </View>
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
  dispocontainer: {
    borderWidth: 1.5,
    borderRadius: 4,
    borderColor: "#5ABAB6",
    width: windowWidth * 0.9,
    height: windowHeight * 0.13,
    margin: 10,
  },
  debutfincontainer: {
    flexDirection: "row",
    alignItems: 'center',
    margin: 13,
  },
  text: {
    fontSize: 17,
    fontFamily: 'Manrope',
    color: "#868686"
  },
  textStart: {
    fontSize: 17,
    fontFamily: 'Manrope',
    marginLeft: 12,
  },
  textEndDay: {
    fontSize: 17,
    fontFamily: 'Manrope',
    marginLeft: 36,
  },
  textStartHour: {
    fontSize: 17,
    fontFamily: 'Manrope',
    marginLeft: 20,
  },
  textEndHour: {
    fontSize: 17,
    fontFamily: 'Manrope',
    marginLeft: 20,
  },
});

export default Disponibilite;