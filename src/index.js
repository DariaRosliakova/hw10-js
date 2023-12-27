import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
axios.defaults.headers.common['x-api-key'] =
  'live_KMQtqDctz8ozi9Fa5EriQ7MNveOIMXnIx5FSx57Uy1ocKdShPOF6Dq1uhE5l5heX';

const select = document.querySelector('.breed-select');
const info = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

loader.style.display = 'none';
error.style.display = 'none';

export function toggleLoader(load) {
  loader.style.display = load ? 'block' : 'none';
  select.style.display = load ? 'none' : 'block';
  info.style.display = load ? 'none' : 'block';
  error.style.display = 'none';
}

export function showError() {
  error.style.display = 'block';
  select.style.display = 'none';
  info.style.display = 'none';
}

fetchBreeds()
  .then(data => {
    data.forEach(item => {
      let option = document.createElement('option');
      option.value = item.id;
      option.text = item.name;
      select.appendChild(option);
    });
  })
  .catch(error => console.log(error));

select.addEventListener('change', onSearchCat);
function onSearchCat(e) {
  const breedName = e.target.value.trim();
  fetchCatByBreed(breedName)
    .then(arr => createMarkup(arr))
    .catch(error => console.log(error));
}
function createMarkup(arr) {
  const markup = arr
    .map(item => {
      return `<img src="${item.url}" alt="${item.breeds[0].name}" width="500" >
      <h1>${item.breeds[0].name}</h1>
      <p>${item.breeds[0].description}</p>
      <p>Temperament: ${item.breeds[0].temperament}</p>`;
    })
    .join('');
  info.innerHTML = markup;
}
