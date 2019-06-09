console.log('Client side javascript is loaded!');

const weatherForm = document.querySelector('form');
const loaderParagraph = document.querySelector('#loader');
const resultParagraph = document.querySelector('#result');

loaderParagraph.textContent = '';
resultParagraph.textContent = '';

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const address = document.querySelector('input');

  resultParagraph.textContent = '';
  loaderParagraph.textContent = 'Searching...';

  fetch(`/weather?address=${address.value}`)
  .then(response => response.json().then(data => {
    loaderParagraph.textContent = '';
    if (data.error) {
      console.error(data.error);
      resultParagraph.textContent = data.error;
      return;
    } else {
      console.log(data.location);
      resultParagraph.textContent = data.forecast;
    }
  }));

});
