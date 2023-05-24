import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector} from 'react-redux';
import { removeDispo, removeSearchDate} from '../reducers/users';
import moment from 'moment-timezone';
import 'moment/locale/fr';

const Disponibilite = (props) => {

  const BACKEND_ADDRESS = '192.168.10.128:3000';
  
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch()
  
///////////////////////formatage date
  //formatage de la date pour l'afficher sous format DD/MM/YYYYY
  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
  };

  //formatage de l'heure pour ne pas afficher les secondes
  const formatTime = (date) => {
    // Set l'heure à l'heure de la bonne timezone
    const newDate = moment(date).tz('Europe/Paris');
  
    // Formater la nouvelle date
    return newDate.format('HH:mm');
  };

///////suppression d'une disponibilité

    
  //fonction de suppression appelée quand je clique sur mon bouton de croix
  //token et id de la dispo récupéré via le body 
  // via le store pour le token et via Dispo du CalendarScreen1
    
  const deleteAvailability = () => {
    //suppression des dates de recherche pour le parent
        dispatch(removeSearchDate())

    //suppression de la disponibilité pour l'aidant
        fetch(`http://${BACKEND_ADDRESS}/aidantUsers/deleteDispo`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: user.token, availabilityId: props.availabilityId }),
        })
        .then(res => res.json())
          .then(data => {
            if (data.result) {
              // La disponibilité a été supprimée avec succès
     
              dispatch(removeDispo(props.availabilityId)) //suppression dans le store

            } else {
              // La disponibilité n'a pas été supprimée 
                console.log("erreur ");
            }
          });
      } 

      

  return (

<View contentContainerStyle={styles.container}>
  <View style={styles.dispodeletecontainer}>
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
          <TouchableOpacity onPress={() => deleteAvailability()}>
                  <Image
                        source={require("../assets/delete.png")}
                        style={{width: windowWidth * 0.1, height: windowHeight * 0.06, marginLeft: 25 }}/>
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
  dispocontainer: {
    margin: 10,
  },
  dispodeletecontainer: {
    flexDirection: "row",
    alignItems: "center",
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
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 10,
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