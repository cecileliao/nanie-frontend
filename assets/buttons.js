<View>
    <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Suivant</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.buttonPurple}>
        <Text style={styles.buttonText}>Editer</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.buttonRed}>
        <Text style={styles.buttonText}>Refuser</Text>
</TouchableOpacity>


</View>


const styles = StyleSheet.create({
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
    buttonText: {
        color: 'white',
    },
    buttonPurple: {
    backgroundColor: '#785C83',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    width: 120,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
    },
    buttonRed: {
    backgroundColor: '#C8716E',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    width: 120,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',        
    }

  });    