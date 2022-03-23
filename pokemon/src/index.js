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

d3.json('../donnees-pokemon.json')
		.then( function(data) {
            console.log("pokemon",data)
				const notesParEleve = data.reduce((r, d) => {
  				const notes = r[d.nom] || []
  				return { ...r, [d.nom]: [...notes, d.note] }
			}, {})

			 	})
		.catch(function(error){
				console.log(error);
				})
		// { Alice: [5, 6], Bob: [4, 3] }

