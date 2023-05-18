import { StyleSheet, View, Text, Image } from 'react-native';
import { showHeart } from '../modules/showHeart';

const avisData = [
  {
    photoUrl: require('../assets/userPicture.png'),
    nom: 'John Doe',
    datePublication: '01/03/2023',
    etoiles: 2.5,
    texteAvis: "Je suis très satisfait des services à la personne que j'ai reçus. L'aide à domicile qui s'est occupée de moi était extrêmement professionnelle et attentionnée. Elle a fait un excellent travail en prenant soin de mes besoins quotidiens et en m'offrant un soutien moral précieux."
  },
  {
    photoUrl: require('../assets/carrot-solid.png'),
    datePublication: '15/03/2023',
    nom: 'Jane Smith',
    etoiles: 3.3,
    texteAvis: "J'ai été agréablement surpris par la qualité des services à la personne que j'ai reçus. L'assistant personnel que j'ai engagé était compétent et toujours à l'heure. Il m'a aidé à gérer mes tâches domestiques et m'a apporté un soulagement considérable. Je le recommande vivement."
  },
  {
    photoUrl: require('../assets/music-solid.png'),
    datePublication: '02/04/2023',
    nom: 'Alice Johnson',
    etoiles: 4.9,
    texteAvis: "Les services à la personne ont été d'une grande aide pour ma famille. Notre nounou était extrêmement attentionnée et bienveillante envers nos enfants. Elle a créé un environnement sûr et stimulant pour eux, et nous pouvions nous reposer en sachant qu'ils étaient entre de bonnes mains."
  },
  {
    photoUrl: require('../assets/person-cane-solid.png'),
    nom: 'Bob Williams',
    datePublication: '19/04/2023',
    etoiles: 4.4,
    texteAvis: "J'ai eu recours à des services d'aide à domicile après une chirurgie, et cela a été une expérience très positive. L'assistant qui m'a été assigné était compétent et patient. Il m'a aidé avec mes besoins quotidiens, m'a accompagné lors de mes rendez-vous médicaux et m'a permis de me rétablir plus rapidement."
  },
  {
    photoUrl: require('../assets/pump-soap-solid.png'),
    nom: 'Sarah Brown',
    datePublication: '07/05/2023',
    etoiles: 4.7,
    texteAvis: "Les services à la personne ont grandement amélioré la qualité de vie de mon grand-père âgé. L'aide à domicile qui s'occupe de lui est extrêmement bienveillante et lui offre une compagnie précieuse. Elle l'aide avec les tâches ménagères, les courses et les sorties, ce qui lui permet de rester autonome et de rester connecté à la communauté."
  }
];

export default function Avis() {
  return (
    <View style={styles.container}>
      {avisData.map((avis, index) => (
        <View style={styles.block} key={index}>
          <View style={styles.image}>
            <Image source={avis.photoUrl} style={{ width: 50, height: 50 }} />
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
