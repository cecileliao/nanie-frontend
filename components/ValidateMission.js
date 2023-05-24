import React, { useState, useEffect }  from 'react'
import { useSelector} from 'react-redux';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';


const ValidateMission = () => {
    //récupération du token dans le store de l'utilisateur associé à la mission
    const user = useSelector((state) => state.user.value);

  //stocker les données utilisateur et les afficher au chargement de la page
  const [userAidant, setUserAidant] = useState(null);
  const [userParent, setUserParent] = useState(null);

    const BACKEND_ADDRESS = '192.168.10.145:3000';

    useEffect(() => {
      fetch(`http://${BACKEND_ADDRESS}/aidantUsers/Infos/izRJZnp8vwPCJv1e7LwzJKMcUzZtH9K9`)
        .then(response => response.json())
        .then(data => {
          if (data.result) {
            setUserAidant(data);
          }
        });
    }, []);

//console.log(userAidant)
      

return (
<View contentContainerStyle={styles.container}>
    <View style={styles.onGoingChatContainter}>
        <View style={styles.leftContainter}>
        <Image source={require('../assets/aidant.png')} style={{ width: 70, height: 70, borderRadius: 50, marginBottom: 15 }} />
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Evaluer</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.nameText} >Du 08/05/2023 au 04/02/2023</Text>
            <Text style={styles.nameText}>Emma Lorrain</Text>
            <Text style={styles.nameText}>0668908789</Text>
            <Text style={styles.nameText}>10 rue du Général Poirier</Text>
            <Text style={styles.nameText}>75001 Paris</Text>
            <Text style={styles.nameText}>5x20 = 100€</Text>
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
  },
  onGoingChatContainter: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 4,
    borderColor: "#5ABAB6",
    width: windowWidth * 0.95,
    height: windowHeight * 0.2,
    margin: 10,
  },
  nameText:{
    fontFamily: 'Manrope',
    fontSize: 15,
    marginTop: 3
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
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Manrope',
    fontSize: 14,
    color: 'white',
  },
});

export default ValidateMission;