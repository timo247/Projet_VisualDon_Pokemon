import * as d3 from 'd3'
import { csv, json } from 'd3-fetch'


// Pour importer les données
// import file from '../data/data.csv'
console.log("pikachu")

//Récipération des données
/*
Promise.all([
    json('pokemon\data\donnes-pokemon.json'),
]).then(([data]) =>{
    console.log("datapok", pokemon)
})
*/


let pokemonsPerSeason = [];
let season1Pokemons = [];
let season7Pokemons = [];
let season2Pokemons = [];
let season3Pokemons = [];
let season4Pokemons = [];
let season5Pokemons = [];
let season6Pokemons = [];
let pokemonsPerType = []
let elementsSchema = NaN


d3.json('../donnees-pokemon.json')
    .then(function (data) {
        console.log("pokemon", data)

        //Tri des pokemons par saison
        data.forEach(pokemon => {
            if (data.indexOf(pokemon) <= 167) {
                season1Pokemons.push(pokemon)
            } else if (data.indexOf(pokemon) >= 168 && data.indexOf(pokemon) <= 271) {
                season2Pokemons.push(pokemon)
            } else if (data.indexOf(pokemon) >= 271 && data.indexOf(pokemon) <= 431) {
                season3Pokemons.push(pokemon)
            } else if (data.indexOf(pokemon) >= 432 && data.indexOf(pokemon) <= 552) {
                season4Pokemons.push(pokemon)
            }
        });

        console.log(season1Pokemons)


        //Tri des pokemons par type:
        let dragonPokemons = []
        let firePokemons = []
        let waterPokemons = []
        let grassPokemons = []
        let electricPokemons = []
        let ghostPokemons = []
        let bugPokemons = []
        let normalPokemons = []
        let psychicPokemons = []
        let groundPokemons = []
        let fightingPokemons = []
        let icePokemons = []
        let darkPokemons = []
        let rockPokemons = []
        let poisonPokemons = []
        let flyingPokemons = []

        data.forEach(pokemon => {
            if (pokemon.Type1 == "Ghost") {
                ghostPokemons.push(pokemon)
            } else if (pokemon.Type1 == "Grass") {
                grassPokemons.push(pokemon)
            }
            else if (pokemon.Type1 == "Ground") {
                groundPokemons.push(pokemon);
            } else if(pokemon.Type1 == "Rock"){
                rockPokemons.push(pokemon);
            } else  if (pokemon.Type1 == "Psychic")
            {
                psychicPokemons.push(pokemon)
            } else  if (pokemon.Type1 == "Water")
            {
                waterPokemons.push(pokemon)
            } 
            else  if (pokemon.Type1 == "Electric")
            {
                electricPokemons.push(pokemon)
            } 
            else  if (pokemon.Type1 == "Grass")
            {
                grassPokemons.push(pokemon)
            } else  if (pokemon.Type1 == "Normal")
            {
                normalPokemons.push(pokemon)
            } else  if (pokemon.Type1 == "Fighting")
            {
                fightingPokemons.push(pokemon)
            } else  if (pokemon.Type1 == "Poison")
            {
                poisonPokemons.push(pokemon)
            } else  if (pokemon.Type1 == "Bug")
            {
                bugPokemons.push(pokemon)
            } else  if (pokemon.Type1 == "Flying")
            {
                flyingPokemons.push(pokemon)
            } else  if (pokemon.Type1 == "Ice")
            {
                icePokemons.push(pokemon)
            } else  if (pokemon.Type1 == "Dark")
            {
                darkPokemons.push(pokemon)
            } else  if (pokemon.Type1 == "Fire")
            {
                firePokemons.push(pokemon)
            } else  if (pokemon.Type1 == "Dragon")
            {
                dragonPokemons.push(pokemon)
            } 
        });
        //Dessiner


        //Tri des pokemons
        console.log("metal", dragonPokemons)
































        const notesParEleve = data.reduce((r, d) => {
            const notes = r[d.nom] || []
            return { ...r, [d.nom]: [...notes, d.note] }
        }, {})

    })
    .catch(function (error) {
        console.log(error);
    })
		// { Alice: [5, 6], Bob: [4, 3] }

