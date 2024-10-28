const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const API_ENDPOINTS = {
  EPISODES: `${API_BASE_URL}/episode`,
  CHARACTERS: `${API_BASE_URL}/character`,

  getEpisodesWithParams: (page, search) =>
    `${API_BASE_URL}/episode?page=${page}&name=${search}`,
};

export default API_ENDPOINTS;
