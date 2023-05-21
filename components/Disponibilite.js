import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import { useSelector} from 'react-redux';
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
    // Soustraire 2 heures à la date donnée
    const newDate = moment(date).subtract(2, 'hours');
  
    // Formater la nouvelle date
    return newDate.format('HH:mm');
  };

///////suppression d'une disponibilité

  //récupération du token dans le store quand l'utilisateur se connecte
  const user = useSelector((state) => state.user.value);
    //récupération des dispos depuis le reducer
    const availabilities = useSelector((state) => state.user.availabilities);
    

    const deleteAvailability = (token, availabilityId) => {
      console.log('Availability ID to delete:', availabilityId);
      console.log('User availabilities:', user.availabilities);

      const availability = user.availabilities.find(item => item.availabilityId === availabilityId);
      console.log('Found availability:', availability);
      if (availability) {
        fetch(`http://192.168.1.46:3000/aidantUsers/deleteDispo/${user.token}/${availability.availabilityId}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (response.ok) {
              // La disponibilité a été supprimée avec succès
              // Mettez à jour l'état ou effectuez d'autres actions nécessaires
            } else {
              // La requête a échoué avec un statut d'erreur
              return response.json().then(errorData => {
                console.log('Erreur lors de la suppression de la disponibilité :', errorData.error);
              });
            }
          });
      } else {
        console.log("Disponibilité introuvable");
      }
    };

   

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
          <TouchableOpacity onPress={() => deleteAvailability(user.token, props.availabilityId)}>
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