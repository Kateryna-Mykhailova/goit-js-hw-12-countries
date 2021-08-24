import './sass/main.scss';
import { alert, error, info } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';


const refs = {
    form: document.querySelector('#form'),
    input: document.querySelector('#search'),
    container: document.querySelector('.container')
};

refs.input.addEventListener('input', debounce(onTextInput, 500));
// let name = '';

function onTextInput(e) {
    e.preventDefault();
    removeMarkup()
    const name = e.target.value
    // console.log(e.target.value);
    fetch(`https://restcountries.eu/rest/v2/name/${name}`)
        .then(response => response.json())
        .then(data => renderCollection(data))
        .catch(err => console.log(err))
    // .catch(err => error({ text: `По запросу "${name}" ничего не найдено` }))
    // .catch( onError(name))
        // .catch(err => {
        //     console.log(err)
        //     onError(name)
        // })
};

// function onError(name) {
  
//    alert({ text: `По запросу "${name}" ничего не найдено` })
// }

function createCountry({ name, population, flag, capital, languages }) {
   
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
    refs.container.insertAdjacentHTML('beforeend', country)
 }


function createCountries({ name }) {
    const countriesList = `
    <ul>
  <li>${name}</li>
</ul>
    `
    refs.container.insertAdjacentHTML('beforeend', countriesList)
 }

function removeMarkup() {
    // console.log('reset');
    refs.container.innerHTML = ' ';
}
// function leng(languages) {
//      arr.forEach(el => createElement(el))
// };
 
// изначальная функция
// function renderCollection(arr) {
//     arr.forEach(el => createCountry(el))
// }

// function getCollectionElement(arr) {
//     arr.forEach(el => return el)
// }

function renderCollection(arr) {
 
    if (arr.length === 1) {
        // console.log('1');
        arr.forEach(el => createCountry(el))
    }
    else if (arr.length <= 10 && arr.length > 1) {
        //  console.log('2');
        arr.forEach(el => createCountries(el))
    }
    else if (arr.length > 10) {
        //  console.log('error');
        info({ text: 'Too many matches found. Please enter a more specific query!' })
    }
    else {
        error ({ text: 'No results' })
     }
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