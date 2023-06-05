import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text,  
  KeyboardAvoidingView, 
  Dimensions, 
  Image, 
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
  


export default function Chat(props) {

  //récupérer infos du réducer pour user
  const user = useSelector((state) => state.user.value)


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
      <View style={styles.chatContainer}>
        <View style={user.isParent ? styles.familleChat : styles.aidantChat}>
          <Image source={{ uri: props.author.photo }} style={{ width: 50, height: 50, borderRadius: 50 }} />
          <Text style={styles.chatText}>{props.contentMsg}</Text>
          <Text style={styles.time}>{props.dateMsg}</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'white',
  },
  chatContainer: {
    flex: 1,
    width: windowWidth * 0.95
  },
  familleChat: {
    width: '85%',
    alignSelf: 'flex-start',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#5ABAB6',
    marginBottom: 15,
    marginTop: 15,
    padding: 8,
  },
  aidantChat: {
    width: '85%',
    alignSelf: 'flex-end',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#785C83',
    marginBottom: 8,
    padding: 8,
  },
  chatText: {
    fontFamily: 'Manrope',
  },
  time: {
    fontSize: 10,
    color: '#000000',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    width: '90%',
  },
  chatInput: {
    flex: 3,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#785C83',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.25,
  },
});