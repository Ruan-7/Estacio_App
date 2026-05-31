import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function PetDetailScreen({ route, navigation }) {
  const { pet } = route.params;
  const [editing, setEditing] = useState(false);
  const [nome, setNome] = useState(pet.nome);
  const [especie, setEspecie] = useState(pet.especie);
  const [cor, setCor] = useState(pet.cor);
  const [local, setLocal] = useState(pet.local);
  const [descricao, setDescricao] = useState(pet.descricao || '');
  const [contato, setContato] = useState(pet.contato);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, 'pets', pet.id), {
        nome,
        especie,
        cor,
        local,
        descricao,
        contato,
      });
      Alert.alert('Sucesso!', 'Pet atualizado!');
      setEditing(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkFound = async () => {
    Alert.alert('Pet Encontrado!', 'Marcar este pet como encontrado?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Confirmar',
        onPress: async () => {
          try {
            await updateDoc(doc(db, 'pets', pet.id), { status: 'encontrado' });
            Alert.alert('Sucesso!', 'Pet marcado como encontrado!');
            navigation.goBack();
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar.');
          }
        },
      },
    ]);
  };

  const handleDelete = async () => {
    Alert.alert('Excluir', 'Tem certeza que deseja excluir este pet?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteDoc(doc(db, 'pets', pet.id));
            Alert.alert('Sucesso!', 'Pet excluído!');
            navigation.goBack();
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir.');
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {pet.imageUrl ? (
        <Image source={{ uri: pet.imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.noImage}>
          <Text style={styles.emoji}>🐾</Text>
        </View>
      )}

      {editing ? (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Nome"
          />
          <TextInput
            style={styles.input}
            value={especie}
            onChangeText={setEspecie}
            placeholder="Espécie"
          />
          <TextInput
            style={styles.input}
            value={cor}
            onChangeText={setCor}
            placeholder="Cor"
          />
          <TextInput
            style={styles.input}
            value={local}
            onChangeText={setLocal}
            placeholder="Local"
          />
          <TextInput
            style={styles.input}
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Descrição"
            multiline
            numberOfLines={3}
          />
          <TextInput
            style={styles.input}
            value={contato}
            onChangeText={setContato}
            placeholder="Contato"
          />
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleUpdate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>Salvar</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setEditing(false)}
          >
            <Text style={styles.btnText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.info}>
          <Text style={styles.name}>{pet.nome}</Text>
          <Text style={styles.detail}>🐾 {pet.especie} • {pet.cor}</Text>
          <Text style={styles.detail}>📍 {pet.local}</Text>
          {pet.descricao && (
            <Text style={styles.detail}>📝 {pet.descricao}</Text>
          )}
          <Text style={styles.detail}>📞 {pet.contato}</Text>

          <TouchableOpacity style={styles.foundBtn} onPress={handleMarkFound}>
            <Text style={styles.btnText}>✅ Marcar como Encontrado</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editBtn} onPress={() => setEditing(true)}>
            <Text style={styles.btnText}>✏️ Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.btnText}>🗑️ Excluir</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#E0E0E0',
  },
  noImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 80,
  },
  form: {
    padding: 16,
  },
  info: {
    padding: 16,
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
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  foundBtn: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  editBtn: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  deleteBtn: {
    backgroundColor: '#F44336',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 40,
  },
  saveBtn: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  cancelBtn: {
    backgroundColor: '#999',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 40,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});