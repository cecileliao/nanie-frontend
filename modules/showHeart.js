import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

//gestion des coeurs en fonction de la note globale
function showHeart(note) {

  const rating = note || 0; // Si la note est null ou undefined, on la remplace par 0

  // if (note === null || note === undefined) {
  //   // Cas où il n'y a pas d'avis, retourner les 5 coeurs grisés
  //   return Array(5).fill(
  //     <FontAwesomeIcon key={Math.random()} icon={faHeart} style={{ color: '#D9D9D9' }} />
  //   );
  // }


  // const heartFull = Math.floor(note);
  // const heartEmpty = 5 - Math.ceil(note);

  const heartFull = Math.floor(rating);
  const heartEmpty = 5 - heartFull;

  const heart = [];
//ajouter les coeurs pleins au tableau 
  for (let i = 0; i < heartFull; i++) {
    heart.push(
      <FontAwesomeIcon key={i} icon={faHeart} style={{ color: '#785C83' }} />
    );
  }
// //si partie décimale coeur partiel ajouté au tableau
//   if (note % 1 !== 0) {
//     const decimalHeart = (
//       <FontAwesomeIcon
//         key={heartFull}
//         icon={faHeart}
//         style={{ color: '#785C83', clipPath: `inset(0 ${(1 - (note % 1)) * 100}% 0 0)` }}
//       />
//     );
//     heart.push(decimalHeart);
//   }

//jouter les cœurs vides (gris)
  for (let i = 0; i < heartEmpty; i++) {
    heart.push(
      <FontAwesomeIcon key={i + heartFull} icon={faHeart} style={{ color: '#D9D9D9' }} />
    );
  }

  return heart;
}
  
  module.exports = { showHeart };