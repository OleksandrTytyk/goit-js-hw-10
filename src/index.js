import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './js/fetchCountries';
// import { refs } from './js/refs';
// import { renderCountryInfo, renderCountryList, clear } from './js/renderMarkup';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


input.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(e) {
  e.preventDefault();

  const country = e.target.value.trim();
  if (!country) {
    clear();
    return;
  }

  fetchCountries(country)
    .then(creatMarkup)
    .catch(error => Notiflix.Notify.failure(`${error}`));

  function creatMarkup(data) {
    if (data.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else if (data.length >= 2 && data.length <= 10) {
      renderCountryList(data);
    } else if (data.length === 1) {
      renderCountryInfo(data);
    }
  }
}

function renderCountryInfo(data) {
  const markup = data
    .map(({ name, capital, population, flags, languages }) => {
      const nameLanguages = languages.map(language => language.name);
      return `
  <img class="countryFlag-info" src="${
    flags.svg
  }" alt="flag" width="200px" height="125px">
  <h2 class="countryName-info">${name}</h2>
  <div class="countryTitleInfo">
    <p><b>Capital:</b> ${capital}</p>
    <p><b>Population:</b> ${population}</p>
    <p><b>Languages:</b> ${nameLanguages.join(', ')}</p>
  </div>`;
    })
    .join('');
  clear();

  countryInfo.innerHTML = markup;
}

function renderCountryList(data) {
  const markup = data
    .map(({ name, flags }) => {
      return `
      <div class="countryListMarkup">
  <img class="countryFlag-list" src="${flags.svg}" alt="flag" width="50px" height="30px">
  <h2 class="countryName-list">${name}</h2>
  </div>`;
    })
    .join('');
  clear();

  countryList.innerHTML = markup;
}

function clear() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
