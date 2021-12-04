import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './index';

export function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then((response) => response.json())
    .then((results) => {
      if (results.length > 10) {
        return Notify.warning(
          'Too many matches found. Please enter a more specific name.'
        );
      }

      if (results.length === 10 || results.length >= 2) {
        refs.list.innerHTML = ' ';

        for (const {
          name: { common },
          flags: { svg },
        } of results) {
          refs.list.insertAdjacentHTML(
            'beforeend',
            `<li class="list-item"><img src="${svg}" alt="${common}" class="list-flag">${common}</li>`
          );
        }
      }

      if (results.length === 1) {
        refs.cardInfo.innerHTML = ' ';

        for (const {
          name: { common },
          capital,
          flags: { svg },
          population,
          languages,
        } of results) {
          refs.cardInfo.innerHTML = `
            <img class="card-img" src="${svg}" alt="${common}">
            <h2 class="country-name">Country: ${common}</h2>
            <p class="capital">Capital: ${capital}</p>
            <p class="population">Population: ${population}</p>
            <p class="languages">Languages: ${Object.values(languages).join(
              ', '
            )}</p>
        `;
        }
      }
    });
}
