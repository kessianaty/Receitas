import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 20,
    },
    recipeContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      padding: 15,
      marginVertical: 10,
      width: '100%',
      alignItems: 'center',
    },
    recipeDetails: {
      alignItems: 'center',
    },
    recipeText: {
      fontSize: 16,
      marginVertical: 5,
    },
    recipeImage: {
      width: 100,
      height: 100,
      marginTop: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
    },
    button: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
      marginVertical: 10,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    addButton: {
      backgroundColor: '#28A745',
      padding: 10,
      borderRadius: 5,
      marginVertical: 20,
    },
    formContainer: {
      width: '100%',
      alignItems: 'center',
    },
    input: {
      width: '100%',
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginVertical: 10,
    },
    previewImage: {
      width: 100,
      height: 100,
      marginVertical: 10,
    },
  });
  
 export default styles;
