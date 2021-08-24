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
    e.preventDefault();
    resetSearch();
    const name = e.target.value
    // console.log(e.target.value);
    fetch(`https://restcountries.eu/rest/v2/name/${name}`)
        .then(response => response.json())
        .then(data => renderCollection(data))
        // .then(data => console.log(data))
        .catch(err => console.log(err))
   
};

function createCountry({ name, population, flag, capital, languages }) {
     resetSearch();
    const language = languages.map(el => `<li>${el.name}</li>`).join(' ')
  
    const country = `
    <article>
  <h1>${name}</h1>
  <img src="${flag}" alt="">
  <p>${capital}</p>
  <p>${population}</p>
  <ul>${language}</ul>
</article>
`
    refs.container.insertAdjacentHTML('beforeBegin', country)
 }


function createCountries({ name }) {
     resetSearch();
    const countriesList = `
    <ul>
  <li>${name}</li>
</ul>
    `
    refs.container.insertAdjacentHTML('beforeBegin', countriesList)
 }

function resetSearch() {
    refs.container.innerHTML = '';
}
// function leng(languages) {
//      arr.forEach(el => createElement(el))
// };
 
// изначальная функция
// function renderCollection(arr) {
//     arr.forEach(el => createCountry(el))
// }
function renderCollection(arr) {
      resetSearch()
    if (arr.length === 1) {
       
        arr.forEach(el => createCountry(el))
        return
    }
    else if (arr.length <= 10 && arr.length >= 2) {
       
        arr.forEach(el => createCountries(el))
        return
    }
    else{ alert({text: 'Too many matches found. Please enter a more specific query!'}) }
   
}



// function renderCollection(arr) {

//     arr.forEach(el => createCountry(el))
    
    
    // {

    //     if (arr.length === 1) {  }


    //     // if (arr.length > 10{
    //  
    //     // ) 

    //     // if (arr.length <= 10) {
    //     //     createCountries(el)
    //     // }
    //     // else { }

    // } )
// }






// я делал шаблонной строкой и там где массив просто писал стрелку через map()
// <ul class="languages_list">Languages: 
//                 ${languages.map(value => `<li class="language">${value.name}</li>`).join(" ")}
//               </ul> 



//название, столица, население, языки и флаг.
//name:
//flag: "https://restcountries.eu/data/pol.svg"
//capital: "Warsaw"
//languages: Array(1) name: "Polish"
//population: 38437239

// fetch(`https://restcountries.eu/rest/v2/name/{name} = ${value}`)

//


