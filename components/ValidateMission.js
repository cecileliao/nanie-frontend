import React, { useState, useEffect }  from 'react'
import { useSelector} from 'react-redux';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import moment from 'moment-timezone';
import 'moment/locale/fr';
import { useNavigation } from '@react-navigation/native';



const ValidateMission = (props) => {
  const navigation = useNavigation();
  const handleValidate = () => {
    navigation.navigate('EvaluationScreen')
  }
    //récupération du token dans le store de l'utilisateur associé à la mission
    const user = useSelector((state) => state.user.value);

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


  //stocker les données utilisateur et les afficher au chargement de la page
  const [userAidant, setUserAidant] = useState(null);
  const [userParent, setUserParent] = useState(null);

    const BACKEND_ADDRESS = '192.168.1.14:3000';

    /// a revoir

    useEffect(() => {
      fetch(`http://${BACKEND_ADDRESS}/aidantUsers/Infos/${user.token}}`) //récupère infos de l'aidant 
        .then(response => response.json())
        .then(data => {
          if (data.result) {
            setUserAidant(data);
          }
        });
    }, []);


      

return (
<View contentContainerStyle={styles.container}>
    <View style={styles.onGoingChatContainter}>
        <View style={styles.leftContainter}>
        <Image source={require("../assets/aidant.png")} style={{ width: 90, height: 90, borderRadius: 50, marginBottom: 15 }} />
        <TouchableOpacity style={styles.button} onPress={handleValidate}>
            <Text style={styles.buttonText}>Evaluer</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.nameText} >Du 03/06 à 09h</Text>
            <Text style={styles.nameText} >Au 03/06 à 18h</Text>
            <View style={{flexDirection:"row", marginTop: 5}}>
              <Text style={styles.nameText}>Emma</Text>
              <Text style={styles.nameText}>Lorrain</Text>
            </View>
            <Text style={styles.nameText}>0679751590</Text>
            
            <View style={{flexDirection:"row"}}>
              <Text style={styles.nameText}>Paris</Text>
              <Text style={styles.nameText}>75015</Text>
            </View>
            <Text style={styles.nameText}>{props.adress}</Text>
            <Text style={styles.nameText}>Total: 9 x 28 = 252€</Text>
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
  leftContainter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  onGoingChatContainter: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 4,
    borderColor: "#5ABAB6",
    width: windowWidth * 0.95,
    height: windowHeight * 0.23,
    margin: 10,
  },
  nameText:{
    fontFamily: 'Manrope',
    fontSize: 15,
    marginTop: 5,
    marginLeft: 5
  },
  textContainer: {
    marginLeft: 20,
  },
  button: {
    backgroundColor: '#5ABAB6',
    width: windowWidth * 0.24,
    borderRadius: '4%',
    padding: 8,
    marginLeft: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Manrope',
    fontSize: 14,
    color: 'white',
  },
});

export default ValidateMission;