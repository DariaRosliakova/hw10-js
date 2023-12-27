import Notiflix from 'notiflix';
import { toggleLoader, showError } from './index';

const BASE_URL1 = `https://api.thecatapi.com/v1/breeds`;
const BASE_URL2 = `https://api.thecatapi.com/v1/images/search`;
const API_KEY =
  'live_KMQtqDctz8ozi9Fa5EriQ7MNveOIMXnIx5FSx57Uy1ocKdShPOF6Dq1uhE5l5heX';

export function fetchBreeds() {
  toggleLoader(true);
  return fetch(`${BASE_URL1}`).then(response => {
    if (!response.ok) {
      toggleLoader(false);
      showError();
      throw new Error(response.status);
    }
    toggleLoader(false);
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  toggleLoader(true);
  return fetch(`${BASE_URL2}?breed_ids=${breedId}&api_key=${API_KEY}`).then(
    response => {
      if (!response.ok) {
        toggleLoader(false);
        showError();
        throw new Error(response.status);
      }
      toggleLoader(false);
      return response.json();
    }
  );
}
