document.addEventListener('DOMContentLoaded', init)
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const sectionMain = document.querySelector('main')


function init(){
fetch(TRAINERS_URL).then(resp => resp.json())
  .then(resp => createCard(resp)).then(resp => addOrRelease())
}

function createCard(json){
  json.forEach(obj => {
    let template = `<div class="card" data-id="${obj.id}"><p>${obj.name}</p>
      <button class="add-pokemon" data-trainer-id="${obj.id}">Add Pokemon</button>
      <ul>` + addPokemons(obj) + `</ul> </div>`

  sectionMain.innerHTML += template
  })
}

function addPokemons(obj){
  let ul = ``
  obj.pokemons.forEach(pokemon => {
    ul += `<li>${pokemon.nickname} (${pokemon.species})
            <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
  })
  return ul
}

function addOrRelease(){
  document.addEventListener('click', function(e){
    e.preventDefault()
    let trainer_id = e.target.parentElement.dataset.id
    if (e.target.className === 'add-pokemon'){
      fetch(POKEMONS_URL, {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ trainer_id: `${trainer_id}`})
    })
    }
    else if (e.target.className === 'release'){
      let pokemonId = e.target.dataset.pokemonId
      fetch(POKEMONS_URL+`/${pokemonId}`, {
         method: 'DELETE',
         headers: {'Content-Type': 'application/json'}
       })
    }
  })


}
