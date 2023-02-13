import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './js/fetchCountries';
// import refs from './js/refs';
import { renderCountryInfo, renderCountryList, clear } from './js/renderMarkup';

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

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
