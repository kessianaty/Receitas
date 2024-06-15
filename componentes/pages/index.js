import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { firestore } from "../firebase"; 
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore"; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home({ navigation }) {
  const [sorvetes, setSorvetes] = useState([]);

  // Função para deletar um documento do Firestore
  async function deleteSorvete(id) {
    try {
      await deleteDoc(doc(firestore, "sorvetes", id)); // Aqui também
      Alert.alert("O sorvete foi deletado com sucesso.");
    } catch (error) {
      console.error("Erro ao deletar sorvete:", error);
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'sorvetes'), (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setSorvetes(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titulo}>Lista de Sorvetes</Text>
      </View>

      <FlatList
        data={sorvetes}
        renderItem={({ item }) => {
          return (
            <View style={styles.sorvete}>

              <TouchableOpacity onPress={() => navigation.navigate('Alterar', { id: item.id, sabor: item.sabor, preco: item.preco, data: item.data, cliente: item.cliente })}>
                <View style={styles.itens}>
                  <Text style={styles.tituloSorvete}> Sabor: <Text style={styles.textoSorvete}>{item.sabor}</Text></Text>
                  <Text style={styles.tituloSorvete}> Preço: <Text style={styles.textoSorvete}>{item.preco}</Text></Text>
                  <Text style={styles.tituloSorvete}> Data: <Text style={styles.textoSorvete}>{item.data}</Text></Text>
                  <Text style={styles.tituloSorvete}> cliente: <Text style={styles.textoSorvete}>{item.cliente}</Text></Text>
                  {item.image && item.image[1] && (
                <Image source={{ uri: item.image[1] }} style={styles.recipeImage} />
              )}
                </View>
              </TouchableOpacity>

              <View style={styles.botaoDeletar}>
                <TouchableOpacity onPress={() => deleteSorvete(item.id)}>
                  <MaterialCommunityIcons name="delete-empty" size={30} color="#FE2E64" />
                </TouchableOpacity>
              </View>

            </View>
          );
        }}
      />
      
      <TouchableOpacity style={styles.botaoAdicionar} onPress={() => navigation.navigate('Cadastrar')}>
        <MaterialCommunityIcons name="plus-circle-outline" size={60} color="#B404AE" />
      </TouchableOpacity>
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
  titulo: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DF01A5'
  },
  sorvete: {
    backgroundColor: '#BF00FF',
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 20,
    borderBottomColor: '#ccc',
  },
  itens: {
    flex: 1,
  },
  tituloSorvete: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  textoSorvete: {
    fontSize: 16,
    color: '#fff'
  },
  botaoDeletar: {
    marginLeft: 10,
  },
  botaoAdicionar: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    color: '#00BFFF'
  },
});