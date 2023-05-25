import { StyleSheet, View, Text, Image } from 'react-native';
import { showHeart } from '../modules/showHeart';

const avisData = [
  {
    photoUrl: require('../assets/LéaMarguerite.png'),
    nom: 'Léa Colin',
    datePublication: '15/04/2023',
    etoiles: 5,
    texteAvis: "Hervé a été extrèmement patient avec ma mère. Il est responsable, jovial, ponctuel, et cuisine très bien. Je vous le recommende vivement. Merci Hervé!"
  },
  {
    photoUrl: require('../assets/Louise.png'),
    datePublication: '15/03/2023',
    nom: 'Louise Lebon',
    etoiles: 5,
    texteAvis: "J'ai été agréablement surpris par la qualité des services d'Hervé. Il a été extrèmement rassurant et cela m'a permis de décompresser pour un week end!"
  },
  {
    photoUrl: require('../assets/amin.png'),
    nom: 'Amin Brown',
    datePublication: '17/01/2023',
    etoiles: 4,
    texteAvis: "Hervé nous a permis de partir sereinement en week end. A notre retour, ma mère avait perdu 10 ans, et m'a raconté ses discussions avec Hervé pendant des semaines :)"
  },
  {
    photoUrl: require('../assets/alice.png'),
    datePublication: '12/03/2023',
    nom: 'Alice Johnson',
    etoiles: 5,
    texteAvis: "Grâce à Hervé, j'ai pu partir sereinement fêter l'anniversaire de ma meilleure amie! Avec lui, ma maman s'est sentie très à l'aise et ils ont joué au poker comme dans le bon vieux temps!"
  },
  {
    photoUrl: require('../assets/julie.png'),
    nom: 'Julie Duquet',
    datePublication: '03/03/2023',
    etoiles: 5,
    texteAvis: "Mon papa était très sceptique de l'expérience, et au bout de 3 minutes, il m'a pratiquement viré de chez moi pour être tranquille avec Hervé, lol! Nous le recontacterons très vite pour de nouvelles aventures!"
  },
];

export default function Avis() {
  return (
    <View style={styles.container}>
      {avisData.map((avis, index) => (
        <View style={styles.block} key={index}>
          <View style={styles.image}>
            <Image source={avis.photoUrl} style={{ width: 50, height: 50, borderRadius: 50 }} />
          </View>
          <View style={styles.content}>
            <View style={styles.infosAvis}>
              <Text style={styles.title}>{avis.nom}</Text>
              <Text style={styles.text}>Date de publication: {avis.datePublication}</Text>
              <Text style={styles.text}>Avis: {avis.etoiles}    {showHeart(avis.etoiles)}</Text>
            </View>
            <Text style={styles.texteAvis}>{avis.texteAvis}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#ffff',
  },
  block: {
    flexDirection: 'row',
    width: '90%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5ABAB6',
    marginBottom: 8,
    padding: 8,
  },
  image: {
    marginRight: 8,
    borderRadius: 50,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  infosAvis: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontFamily: 'Manrope',
    marginBottom: 4,
  },
  text: {
    fontFamily: 'Manrope',
    marginBottom: 4,
  },
  texteAvis: {
    marginTop: 8,
    fontFamily: 'Manrope',
  },
});
