import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CharacterCard from '../components/CharacterCard';
import {
  removeFavorite,
  setFavorites,
  loadFavorites,
} from '../store/favoritesSlice';
import styles from '../styles/favoritesScreenStyles';

const FavoritesScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);
  const [search, setSearch] = useState('');
  const [filteredFavorites, setFilteredFavorites] = useState(favorites);

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = await loadFavorites();
      dispatch(setFavorites(storedFavorites));
    };
    fetchFavorites();
  }, []);

  useEffect(() => {
    const filtered = favorites.filter(character =>
      character.name.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredFavorites(filtered);
  }, [search, favorites]);

  const confirmRemoveFavorite = character => {
    Alert.alert(
      'Favorilerden Kaldır',
      `${character.name} isimli karakteri favorilerden kaldırmak istediğinize emin misiniz?`,
      [
        {text: 'Hayır'},
        {text: 'Evet', onPress: () => dispatch(removeFavorite(character.id))},
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favori Karakterler</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Favori karakter ara..."
        value={search}
        onChangeText={text => setSearch(text)}
      />

      <FlatList
        data={filteredFavorites}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.characterContainer}>
            <CharacterCard
              character={item}
              onPress={() =>
                navigation.navigate('CharacterDetail', {characterId: item.id})
              }
            />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => confirmRemoveFavorite(item)}>
              <Text style={styles.deleteButtonText}>Sil</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Favori karakter bulunmamaktadır.</Text>
        }
      />
    </View>
  );
};

export default FavoritesScreen;
