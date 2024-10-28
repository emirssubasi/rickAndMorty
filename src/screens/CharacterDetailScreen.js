import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addFavorite, removeFavorite} from '../store/favoritesSlice';
import styles from '../styles/characterDetailScreenStyles';
import API_ENDPOINTS from '../config/config';


const CharacterDetailScreen = ({route}) => {
  const {characterId} = route.params;
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const favorites = useSelector(state => state.favorites.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCharacterDetails();
  }, []);

  const fetchCharacterDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_ENDPOINTS.CHARACTERS}/${characterId}`,
      );
      const data = await response.json();
      setCharacter(data);
    } catch (error) {
      console.error('Karakter detaylarını çekerken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = favorites.some(fav => fav.id === character?.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(character.id));
    } else {
      if (favorites.length >= 10) {
        Alert.alert(
          'Favori Limiti Aşıldı',
          'Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.',
        );
      } else {
        dispatch(addFavorite(character));
      }
    }
  };

  if (loading || !character) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: character.image}} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.info}>Status: {character.status}</Text>
      <Text style={styles.info}>Species: {character.species}</Text>
      <Text style={styles.info}>Gender: {character.gender}</Text>
      <Text style={styles.info}>Origin: {character.origin.name}</Text>
      <Button
        title={isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
        onPress={handleFavoriteToggle}
        color={isFavorite ? 'red' : 'green'}
      />
    </View>
  );
};

export default CharacterDetailScreen;
