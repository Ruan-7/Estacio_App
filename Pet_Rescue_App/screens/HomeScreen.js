import React, {useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import {collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase/config';
import PetCard from '../components/PetCard';

export default function HomeScreen({ navigation }) {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    const q = query(collection(db, 'pets'), where('status', '==', 'perdido'));

    const listendb = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
        setPets(data);
        setLoading(false);
    });

    return () => listendb();
}, []);

if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
}

return (
    <View style={styles.container}>
        {pets.length === 0 ?(
            <View style={styles.centerContainer}>
                <Text style={styles.emptyText}>Nenhum pet perdido cadastrado</Text>
            </View>
        ) : (
            <FlatList
                data={pets}
                keyExtractor={(item) => item.id}
                renderItem={({item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('PetDetail', { pet: item })}>
                        <PetCard pet={item} />
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContent}
            />
        )}
    </View>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
  },
});

