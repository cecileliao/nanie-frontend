import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

//gestion des coeurs en fonction de la note globale
function showHeart(note) {
  const heartFull = Math.floor(note);
  const heartEmpty = 5 - Math.ceil(note);

  const heart = [];
  for (let i = 0; i < heartFull; i++) {
    heart.push(
      <FontAwesomeIcon key={i} icon={faHeart} style={{ color: '#785C83' }} />
    );
  }

  if (note % 1 !== 0) {
    const decimalHeart = (
      <FontAwesomeIcon
        key={heartFull}
        icon={faHeart}
        style={{ color: '#785C83', clipPath: `inset(0 ${(1 - (note % 1)) * 100}% 0 0)` }}
      />
    );
    heart.push(decimalHeart);
  }

  for (let i = 0; i < heartEmpty; i++) {
    heart.push(
      <FontAwesomeIcon key={i + heartFull} icon={faHeart} style={{ color: '#D9D9D9' }} />
    );
  }

  return heart;
}
  
  module.exports = { showHeart };