// import refs from "refs";

export function renderCountryInfo(data) {
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

  refs.countryInfo.innerHTML = markup;
}

export function renderCountryList(data) {
  const markup = data
    .map(({ name, flags }) => {
      return `
      <div class="countryList">
  <img class="countryFlag-list" src="${flags.svg}" alt="flag" width="50px" height="30px">
  <h2 class="countryName-list">${name}</h2>
  </div>`;
    })
    .join('');
  clear();

  refs.countryList.innerHTML = markup;
}

export function clear() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}