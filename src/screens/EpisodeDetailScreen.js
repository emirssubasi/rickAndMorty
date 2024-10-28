import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TextInput, ActivityIndicator} from 'react-native';
import CharacterCard from '../components/CharacterCard';
import API_ENDPOINTS from '../config/config';
import styles from '../styles/episodeDetailScreenStyles';

const EpisodeDetailScreen = ({route, navigation}) => {
  const {episodeId} = route.params;
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchEpisodeDetails();
  }, []);

  useEffect(() => {
    const filtered = characters.filter(character =>
      character.name.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredCharacters(filtered);
  }, [search, characters]);

  const fetchEpisodeDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_ENDPOINTS.EPISODES}/${episodeId}`);
      const data = await response.json();
      setEpisode(data);
      fetchCharacters(data.characters);
    } catch (error) {
      console.error('Bölüm detayını çekerken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCharacters = async characterUrls => {
    const characterIds = characterUrls
      .map(url => url.split('/').pop())
      .join(',');
    const response = await fetch(`${API_ENDPOINTS.CHARACTERS}/${characterIds}`);
    const data = await response.json();
    const characterData = Array.isArray(data) ? data : [data];
    setCharacters(characterData);
    setFilteredCharacters(characterData);
  };

  if (loading || !episode) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{episode.name}</Text>
      <Text style={styles.subtitle}>Yayın Tarihi: {episode.air_date}</Text>
      <Text style={styles.subtitle}>Bölüm Kodu: {episode.episode}</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Karakter ara..."
        value={search}
        onChangeText={text => setSearch(text)}
      />

      <FlatList
        data={filteredCharacters}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <CharacterCard
            character={item}
            onPress={() =>
              navigation.navigate('CharacterDetail', {characterId: item.id})
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.noResults}>Sonuç Bulunamadı</Text>
        }
      />
    </View>
  );
};

export default EpisodeDetailScreen;
