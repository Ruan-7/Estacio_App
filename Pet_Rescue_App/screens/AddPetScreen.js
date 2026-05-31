import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function AddPetScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [cor, setCor] = useState('');
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [contato, setContato] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nome || !especie || !local || !contato) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios!');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'pets'), {
        nome,
        especie,
        cor,
        local,
        descricao,
        contato,
        imageUrl,
        status: 'perdido',
        createdAt: serverTimestamp(),
      });
      Alert.alert('Sucesso!', 'Pet cadastrado com sucesso!');
      setNome('');
      setEspecie('');
      setCor('');
      setLocal('');
      setDescricao('');
      setContato('');
      setImageUrl('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o pet.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cadastrar Pet Perdido</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome do Pet *"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Espécie (Cão/Gato/Outro) *"
        value={especie}
        onChangeText={setEspecie}
      />
      <TextInput
        style={styles.input}
        placeholder="Cor / Raça"
        value={cor}
        onChangeText={setCor}
      />
      <TextInput
        style={styles.input}
        placeholder="Local onde foi visto por último *"
        value={local}
        onChangeText={setLocal}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição adicional"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={3}
      />
      <TextInput
        style={styles.input}
        placeholder="Contato (WhatsApp/Tel) *"
        value={contato}
        onChangeText={setContato}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="URL da imagem do pet (opcional)"
        value={imageUrl}
        onChangeText={setImageUrl}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Cadastrar Pet</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});