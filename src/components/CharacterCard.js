import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from '../styles/characterCardStyles';

const CharacterCard = ({character, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{uri: character.image}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.status}>
          {character.status} - {character.species}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CharacterCard;
