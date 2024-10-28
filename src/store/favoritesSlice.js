import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

const saveFavoritesToStorage = async favorites => {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const loadFavorites = async () => {
  const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      if (state.favorites.length < 10) {
        state.favorites.push(action.payload);
        saveFavoritesToStorage(state.favorites);
      } else {
        alert(
          'Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.',
        );
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        fav => fav.id !== action.payload,
      );
      saveFavoritesToStorage(state.favorites);
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const {addFavorite, removeFavorite, setFavorites} =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
