import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image, FlatList, SafeAreaView } from 'react-native';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { sorvetinho, storage } from "../firebase";
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';

export default function Home({ navigation }) {

  const [sorvetes, setSorvetes] = useState([]);

  async function deleteSorvete(id) {
    try {
      await deleteDoc(doc(sorvetinho, "sorvetes", id));
      Alert.alert("O sorvete foi deletado.");
    } catch (error) {
      console.error("O sorvete não foi deletado, tente novamente | ", error);
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(sorvetinho, 'sorvetes'), (querySnapshot) => {
      const lista = [];
      querySnapshot.forEach((doc) => {
        lista.push({ ...doc.data(), id: doc.id });
      });
      setSorvetes(lista);
    });
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sorvetes</Text>
      <FlatList
        data={sorvetes}
        renderItem={({ item }) => (
          <View style={styles.recipeContainer}>
            <View style={styles.recipeDetails}>
              <Text style={styles.recipeText}>sabor: {item.sabor}</Text>
              <Text style={styles.recipeText}>Recheio: {item.recheio}</Text>
              <Text style={styles.recipeText}>Recipiente: {item.recipiente}</Text>
              <Text style={styles.recipeText}>Preparo: {item.preparo}</Text>
              {item.image && item.image[1] && (
                <Image source={{ uri: item.image[1] }} style={styles.recipeImage} />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => deleteSorvete(item.id)} style={styles.button}>
                <Text style={styles.buttonText}>Deletar Sorvete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Cadastrar")}>
        <Text style={styles.buttonText}>Adicionar sorvete</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}