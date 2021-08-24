import './sass/main.scss';
import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import debounce from 'lodash.debounce';

const refs = {
    form: document.querySelector('#form'),
    input: document.querySelector('#search'),
    container: document.querySelector('.container')
};

refs.input.addEventListener('input', debounce(onTextInput, 500));

function onTextInput(e) {
    e.preventDefault()
    const name = e.target.value
    // console.log(e.target.value);
    fetch(`https://restcountries.eu/rest/v2/name/${name}`)
        .then(response => response.json())
        .then(data => renderCollection(data))
        // .then(data => console.log(data))
        .catch(err => console.log(err))
};

function createElement({ name, population, flag, capital, languages}) {
    // const language = 
    const article = `
    <article>
  <h1>${name}</h1>
  <img src="${flag}" alt="">
  <p>${capital}</p>
  <p>${population}</p>
  <ul>${languages.name}</ul>
</article>
`
    refs.container.insertAdjacentHTML('beforeBegin', article)
 }


// function leng(languages) {
//      arr.forEach(el => createElement(el))
// };
 
function renderCollection(arr) {
    arr.forEach(el => createElement(el))
}










//название, столица, население, языки и флаг.
//name:
//flag: "https://restcountries.eu/data/pol.svg"
//capital: "Warsaw"
//languages: Array(1) name: "Polish"
//population: 38437239

// fetch(`https://restcountries.eu/rest/v2/name/{name} = ${value}`)

//


// function onTextInputS() {
//     console.log(refs.input.value);
// }
// alert({
//     text: 'Notice me, senpai!'
// });
  
// console.log(debounce);

//https://restcountries.eu/rest/v2/name/{name}

// debounce(test, 2000);

// function test() {
//     console.log("вап");
//  }


