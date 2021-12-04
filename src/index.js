import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { debounce } from 'lodash';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

export const refs = {
  inputForm: document.querySelector('input#search-box'),
  list: document.querySelector('.country-list'),
  cardInfo: document.querySelector('.country-info'),
};

refs.inputForm.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const inputtedValue = refs.inputForm.value;

  clearField();

  if (inputtedValue === ' ' || inputtedValue.trim() === '') {
    Notify.info('Input field must not be empty');
    return;
  }

  fetchCountries(inputtedValue);
}

function clearField() {
  refs.list.innerHTML = ' ';
  refs.cardInfo.innerHTML = ' ';
}
