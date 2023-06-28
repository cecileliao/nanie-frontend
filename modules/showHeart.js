import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

//gestion des coeurs en fonction de la note globale
function showHeart(note) {

  const rating = note || 0; // Si la note est null ou undefined, on la remplace par 0


  const heartFull = Math.floor(rating); //permet d'arrondir
  const heartEmpty = 5 - heartFull;

  const heart = [];
//ajouter les coeurs pleins au tableau 
  for (let i = 0; i < heartFull; i++) {
    heart.push(
      <FontAwesomeIcon key={i} icon={faHeart} style={{ color: '#785C83', marginLeft: 1 }} />
    );
  }

//ajouter les cœurs vides (gris)
  for (let i = 0; i < heartEmpty; i++) {
    heart.push(
      <FontAwesomeIcon key={i + heartFull} icon={faHeart} style={{ color: '#D9D9D9', marginLeft: 1 }} />
    );
  }

  return heart;
}
  
  module.exports = { showHeart };