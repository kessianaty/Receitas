import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { sorvetinho, storage } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';

export default function Cadastrar({navigation}){

    const [ image, setImage ] = useState('');
    const [ file, setFile ] = useState([]);
    const [ sabor, setsabor ] = useState('');   
    const [ recheio, setrecheio ] = useState('');
    const [ recipiente, setrecipiente ] = useState('');
    const [ preparo, setPreparo ] = useState('');

    async function addSorvete(fileType, url, createdAt) {
      const docRef = await addDoc(collection(sorvetinho, 'sorvetes'), {
          sabor: sabor, 
          recheio: recheio,
          recipiente: recipiente,
          preparo: preparo,
          image: [ fileType,
            url,
            createdAt,]
      });
      setsabor({sabor: ''})
      setrecheio({recheio: ''})
      setrecipiente({recipiente: ''})
      setPreparo({preparo: ''})
      alert("Nova sorvete adicionado com sucesso");
      navigation.navigate("Home");
  };

      useEffect(() => {
        const unsubscribe = onSnapshot(collection(sorvetinho, "sorvetes"), (snapshot) => {
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
    
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            await uploadImage(result.assets[0].uri, "image");
        }
    };
    

    return(
      <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Cadastrar Sorvete</Text>
        <TextInput 
  style={styles.input}
  placeholder='Sabor' 
  placeholderTextColor={'#2F4F4F'}
  onChangeText={setsabor} 
  value={sabor} 
/>        
<TextInput   
  style={styles.input}
  placeholder='Recheio' 
  placeholderTextColor={'#2F4F4F'}
  onChangeText={setrecheio} 
  value={recheio} 
/>
<TextInput 
  style={styles.input}
  placeholder='Recipiente' 
  placeholderTextColor={'#2F4F4F'}
  onChangeText={setrecipiente} 
  value={recipiente} 
/>
<TextInput 
  style={styles.input}
  placeholder='Preparo' 
  placeholderTextColor={'#2F4F4F'}
  onChangeText={setPreparo} 
  value={preparo} 
/>

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Escolher Imagem</Text>
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={styles.previewImage} />
        )}
        <TouchableOpacity style={styles.button} onPress={() => addSorvete("image", image, new Date().toISOString())}>
          <Text style={styles.buttonText}>Enviar Sorvete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    );
}
