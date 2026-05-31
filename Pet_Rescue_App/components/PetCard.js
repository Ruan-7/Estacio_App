import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function PetCard({ pet }) {
    return (
        <View style={styles.card}>
            {pet.imageUrl ? (
                <Image source={{uri: pet.imageUrl}} style={styles.image} />
            ) : (
                <View style={styles.noImage}>
                    <Text style={styles.emoji}>🐾</Text>
                </View>
            )}

            <View style={styles.info}>
                <Text style={styles.name}>{pet.nome}</Text>
                <Text style={styles.detail}>🐾 {pet.especie} • {pet.color}</Text>
                <Text style={styles.detail}>📍 {pet.local}</Text>
                <Text style={styles.detail}>📞 {pet.contato}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: '#E0E0E0',
  },
  noImage: {
    width: 100,
    height: 100,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 40,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  detail: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
});