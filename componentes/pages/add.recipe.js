import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { firestore, storage } from "../firebase"; 
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc, onSnapshot } from "firebase/firestore"; 
import * as ImagePicker from 'expo-image-picker';

export default function Cadastrar({ navigation }) {
  const [ image, setImage ] = useState('');
  const [ file, setFile ] = useState([]);
  const [sabor, setSabor] = useState('');
  const [preco, setPreco] = useState('');
  const [data, setData] = useState('');
  const [cliente, setCliente] = useState('');

  async function addSorvete(fileType, url, createdAt) {
    try {
      const docRef = await addDoc(collection(firestore, 'sorvetes'), {
        sabor: sabor,
        preco: preco,
        data: data,
        cliente: cliente,
        image: {
          fileType: fileType,   // Ensure fileType is a string or another valid Firestore data type
          url: url,             // Ensure url is a string (e.g., download URL from Firebase Storage)
          createdAt: createdAt  // Ensure createdAt is a valid Firestore timestamp (e.g., new Date().toISOString())
        }
      });
      console.log("Sorvete cadastrado com ID: ", docRef.id);
      Alert.alert("Cadastro", "Sorvete cadastrado com sucesso");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao cadastrar sorvete: ", error);
      Alert.alert("Erro", "Erro ao cadastrar sorvete. Por favor, tente novamente.");
    }
  }
  
  

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, "sorvetes"), (snapshot) => {
        const files = [];
        snapshot.forEach(doc => {
            files.push({ ...doc.data(), id: doc.id });
        });
        setFile(files);
    });
    return () => unsubscribe();
}, []);

async function uploadImage(uri, fileType) {
  const response = await fetch(uri);
  const blob = await response.blob();
  
  // Generate a unique filename using timestamp
  const uniqueFileName = new Date().getTime() + "_" + fileType;
  const storageRef = ref(storage, "images/" + uniqueFileName);
  
  const uploadTask = uploadBytesResumable(storageRef, blob);

  uploadTask.on(
      "state_changed",
      async () => {
          if (uploadTask && uploadTask.snapshot) {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              await addSorvete(fileType, downloadURL, new Date().toISOString());
              setImage("");
          }
      }
  );
}

async function pickImage() {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [16, 16],
    quality: 1,
  });

  if (!result.cancelled) {
    setImage(result.assets[0].uri);
    await uploadImage(result.assets[0].uri, "image");
  }
};

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titulo}> Cadastro de Sorvete </Text>
      </View>
      <View>
        <TextInput
          autoCapitalize='words'
          style={styles.input}
          placeholder="Digite o sabor do sorvete"
          onChangeText={setSabor}
          value={sabor}
        />
        <TextInput
          style={styles.input}
          placeholder='Digite o preço do sorvete'
          onChangeText={setPreco}
          value={preco}
          keyboardType='numeric'
        />
         <TextInput
          style={styles.input}
          placeholder='Digite a data da compra'
          onChangeText={setData}
          value={data}
          keyboardType='numeric'
        />
         <TextInput
          style={styles.input}
          placeholder='Digite o cliente'
          onChangeText={setCliente}
          value={cliente}
        />
         <TouchableOpacity style={styles.input} onPress={pickImage}>
          <Text style={styles.buttonText}>Escolher Imagem</Text>
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={styles.previewImage} />
        )}
        <TouchableOpacity
          style={styles.btnenviar}
          onPress={addSorvete}>
          <Text style={styles.btntxtenviar}> Cadastrar Sorvete </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5A9D0',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: '#F8E0E6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 15,
    borderRadius: 10,
  },
  btnenviar: {
    marginTop: 20,
    backgroundColor: '#610B21',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  btntxtenviar: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  titulo: {
    marginVertical: 40,
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});