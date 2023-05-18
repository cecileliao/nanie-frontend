import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

const start = '11-07-2023 16:00';
const end = '11-07-2023 22:00';

export default function Mission() {
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <View style={styles.content}>
          <View style={styles.left}>
            <Text style={styles.text}>Début</Text>
            <Text style={styles.text2}>{start}</Text>
            <Text style={styles.text}>Fin</Text>
            <Text style={styles.text2}>{end}</Text>
          </View>
          <View style={styles.right}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Suivant</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRed}>
              <Text style={styles.buttonText}>Refuser</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;

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
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  right: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  text: {
    fontFamily: 'Manrope',
    marginBottom: 4,
  },
  text2: {
    fontFamily: 'Manrope',
    marginBottom: 4,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#5ABAB6',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    width: windowWidth * 0.25,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
  buttonRed: {
    backgroundColor: '#C8716E',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    width: windowWidth * 0.25,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
