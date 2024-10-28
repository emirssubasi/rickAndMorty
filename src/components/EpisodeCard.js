import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../styles/episodeCardStyles';

const EpisodeCard = ({episode, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{episode.name}</Text>
      <Text style={styles.subtitle}>
        {episode.episode} - {episode.air_date}
      </Text>
    </TouchableOpacity>
  );
};

export default EpisodeCard;
