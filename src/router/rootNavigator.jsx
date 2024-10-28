import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EpisodeListScreen from '../screens/EpisodeListScreen';
import EpisodeDetailScreen from '../screens/EpisodeDetailScreen';
import CharacterDetailScreen from '../screens/CharacterDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import {Image} from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const EpisodeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="EpisodeList"
      component={EpisodeListScreen}
      options={{title: 'Bölüm Listesi'}}
    />
    <Stack.Screen
      name="EpisodeDetail"
      component={EpisodeDetailScreen}
      options={{title: 'Bölüm Detayları'}}
    />
    <Stack.Screen
      name="CharacterDetail"
      component={CharacterDetailScreen}
      options={{title: 'Karakter Detayları'}}
    />
  </Stack.Navigator>
);

const RootNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Bölümler"
      component={EpisodeStack}
      options={{
        tabBarLabel: 'Bölümler',
        tabBarLabelStyle: {fontSize: 16},
        tabBarIcon: ({color, size}) => (
          <Image
            source={require('../assets/episodes-icon.png')}
            style={{width: size, height: size, tintColor: color}}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Favoriler"
      component={FavoritesScreen}
      options={{
        tabBarLabel: 'Favori Karakterler',
        tabBarLabelStyle: {fontSize: 16},
        tabBarIcon: ({color, size}) => (
          <Image
            source={require('../assets/favorites-icon.png')}
            style={{width: size, height: size, tintColor: color}}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default RootNavigator;
