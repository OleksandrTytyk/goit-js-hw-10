export default function fetchCountries(country) {
  return fetch(
    `https://restcountries.com/v2/name/${country}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error('Oops, there is no country with that name');
      
    }
    return response.json();
  });
}
