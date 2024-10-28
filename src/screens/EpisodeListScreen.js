import React, {useEffect, useState} from 'react';
import {View, FlatList, TextInput, ActivityIndicator} from 'react-native';
import EpisodeCard from '../components/EpisodeCard';
import Pagination from '../components/Pagination';
import API_ENDPOINTS from '../config/config';

const EpisodeListScreen = ({navigation}) => {
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchEpisodes();
  }, [currentPage, search]);

  const fetchEpisodes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        API_ENDPOINTS.getEpisodesWithParams(currentPage, search),
      );
      const data = await response.json();
      setEpisodes(data.results || []);
      setTotalPages(data.info.pages || 1);
    } catch (error) {
      console.error('Bölüm verilerini çekerken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, padding: 10}}>
      <TextInput
        placeholder="Bölüm arayın..."
        value={search}
        onChangeText={text => {
          setSearch(text);
          setCurrentPage(1);
        }}
        style={{
          padding: 10,
          marginBottom: 10,
          backgroundColor: '#bbb',
          borderRadius: 8,
        }}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <FlatList
          data={episodes}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <EpisodeCard
              episode={item}
              onPress={() =>
                navigation.navigate('EpisodeDetail', {episodeId: item.id})
              }
            />
          )}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </View>
  );
};

export default EpisodeListScreen;
