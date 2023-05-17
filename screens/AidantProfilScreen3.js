import { View, Text, Image, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAidant } from '../reducers/users';
    
const blocks = [
  {
    image: require('../assets/person-cane-solid.png'),
    title: 'Balade',
    description: 'Sortir avec l’aîné à pied ou en voiture, pour se rendre au parc, magasins, ciné...',
  },
  {
    image: require('../assets/pump-soap-solid.png'),
    title: 'Hygiène',
    description: 'Assurer l’hygiène complète (aider à changer les vêtements, toilette, dents, ..)',      },
  {
    image: require('../assets/carrot-solid.png'),
    title: 'Alimentation',
    description: 'Préparer des repas équilibrés et adaptés aux besoins des personnes âgées.',
  },
  {
    image: require('../assets/music-solid.png'),
    title: 'Divertissement',
    description: 'Accompagner la personne dans la lecture, les jeux de cartes, les activités artistiques ...',
  },
];
    
export default function AidantProfilScreen3() {

    //récupération info user au moment d'appuyer sur le bouton suivant
    const dispatch = useDispatch();
    //récupérer infos du réducer pour user
    const user = useSelector((state) => state.user.value)
    //console.log(user);

    //gérer l'état des toggles - initialisés à false
  const [switchesState, setSwitchesState] = useState(Array(blocks.length).fill(false));    
    // fonction appelée au changement du toggle. Prends en paramètre l'index du toggle
  const toggleSwitch = (index) => {
    // copie de l'état avec spread opérateur
    const newState = [...switchesState];
    //inverser l'état du toggle entre activé et désactivé
    newState[index] = !newState[index];
    //mise à jour état des toggle avec nouvelle copie modifiée 
    setSwitchesState(newState);
  };
 

  const handleValidate = () => {
    // recupérer talents selectionnés avec le toggle
    const selectedTalents = blocks.reduce((result, block, index) => {
      result[block.title.toLowerCase()] = switchesState[index];
      return result;
    }, {});
    // récupérer les valeurs des inputs
    const profilValues = {
      photoAidant: null,
      nameAidant: null,
      firstNameAidant: null,
      phoneAidant: null,
      ageAidant: null,
      sexeAidant: null,
      addressAidant: null,
      zipAidant: null,
      cityAidant: null,
      ratebyHour: null,
      car: false,
      introBioAidant: null,
      longBioAidant: null,
      abilitiesAidant: null,
      talents: {
        mobility: false,
        hygiene: false,
        cooking: false,
        entertainment: false,
        // ...selectedTalents // Inclure les talents sélectionnés ici
      }
    };
    

    //const [token, setToken] = useState(false);
    //if token ??
    fetch('http:/192.168.10.126:3000/aidantUsers/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profilValues),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(updateAidant(profilValues));
        }
      });
  };
    
    
  return (
    <View style={styles.container}>
      <Text style={styles.pagetitle}>Mes Talents</Text>
    
      {blocks.map((block, index) => (
        <View style={styles.block} key={index}>
          <View style={styles.blockContent}>
            <View style={styles.image}>
              <Image
                source={block.image}
                style={[
                  styles.image,
                  { tintColor: switchesState[index] ? '#5ABAB6' : '#868686' },
                ]}/>
            </View>
            <View style={styles.textContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{block.title}</Text>
                <Switch
                  style={styles.toggle}
                  trackColor={{ false: '#D9D9D9', true: '#5ABAB6' }}
                  thumbColor={switchesState[index] ? '#FFFFF' : '#F4F3F4'}
                  onValueChange={() => toggleSwitch(index)}
                  value={switchesState[index]}/>
              </View>
              <Text style={styles.text}>{block.description}</Text>
            </View>
          </View>
        </View>
      ))}
    
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText} onPress={handleValidate}>Valider</Text>
      </TouchableOpacity>
    </View>
  );
}
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#ffff'
  },
  pagetitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#785C83',
    fontFamily: "Recoleta",
  },
  block: {
    width: '90%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5ABAB6',
    marginBottom: 8,
    padding: 8,
  },
    blockContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
    image: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
      image: {
    width: 24,
    height: 25,
    marginRight: 15,
  },
    textContainer: {
    flex: 1,
  },
    title: {
    fontFamily: "Recoleta",
    fontWeight: 'bold',
    fontSize:15,
    marginBottom: 8,
  },
    titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
    toggle: {
    marginBottom: 8,
  },
    text: {
    marginBottom: 8,
    fontFamily: "Manrope",
    fontSize: 13
  },
    buttonText: {
    color: 'white',
    fontFamily: "Manrope",
  },
    button: {
    backgroundColor: '#5ABAB6',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    width: 120,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});    