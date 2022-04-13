import * as d3 from 'd3'
import { csv, json } from 'd3-fetch'


// Pour importer les données
// import file from '../data/data.csv'
//console.log("pikachu")
//Récipération des données
/*
Promise.all([
    json('pokemon\data\donnes-pokemon.json'),
]).then(([data]) =>{
    console.log("datapok", pokemon)
})
*/



let seasonSelected = false;

function fetchData() {

    let pokemonsPerSeason = [];
    let season1Pokemons = [];
    let season2Pokemons = [];
    let season3Pokemons = [];
    let season4Pokemons = [];
    let season5Pokemons = [];
    let season6Pokemons = [];
    let pokemonsPerType = []
    let elementsSchema = NaN

    d3.json('../donnees-pokemon.json')
        .then(function (data) {
            // console.log("pokemon", data)

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
            //console.log(season1Pokemons)
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
                } else if (pokemon.Type1 == "Rock") {
                    rockPokemons.push(pokemon);
                } else if (pokemon.Type1 == "Psychic") {
                    psychicPokemons.push(pokemon)
                } else if (pokemon.Type1 == "Water") {
                    waterPokemons.push(pokemon)
                }
                else if (pokemon.Type1 == "Electric") {
                    electricPokemons.push(pokemon)
                }
                else if (pokemon.Type1 == "Grass") {
                    grassPokemons.push(pokemon)
                } else if (pokemon.Type1 == "Normal") {
                    normalPokemons.push(pokemon)
                } else if (pokemon.Type1 == "Fighting") {
                    fightingPokemons.push(pokemon)
                } else if (pokemon.Type1 == "Poison") {
                    poisonPokemons.push(pokemon)
                } else if (pokemon.Type1 == "Bug") {
                    bugPokemons.push(pokemon)
                } else if (pokemon.Type1 == "Flying") {
                    flyingPokemons.push(pokemon)
                } else if (pokemon.Type1 == "Ice") {
                    icePokemons.push(pokemon)
                } else if (pokemon.Type1 == "Dark") {
                    darkPokemons.push(pokemon)
                } else if (pokemon.Type1 == "Fire") {
                    firePokemons.push(pokemon)
                } else if (pokemon.Type1 == "Dragon") {
                    dragonPokemons.push(pokemon)
                }
            });


            //Regrouppement des données dans un objet pour faciliter son utilisation
            let orderedDatas = {}
            orderedDatas.seasons = {
                1: season1Pokemons,
                2: season2Pokemons,
                3: season3Pokemons,
                4: season4Pokemons
            }

            //Tri des pokemons
            //console.log("metal", dragonPokemons)
            displaySection(orderedDatas);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function toggleSection(section) {
    // Supprime/Ajoute la classe active sur la section
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector(`${section}-section`)?.classList.add('active')
}

function toggleNav(section) {
    // Supprime/Ajoute la classe active sur le lien
    document.querySelector('nav a.active')?.classList.remove('active')
    document.querySelector(`nav a[href="${section}"]`)?.classList.add('active')
}


//Display des sections:
// Affichage d'une section
function displaySection(fetchedData) {
    // S'il n'y a pas de hash (par ex, on est sur "localhost:8080/"), le défaut devient '#home'
    const section = window.location.hash || '#home'
    //console.log("section", section)

    // Chargement des éléments custom par section
    switch (section) {
        case '#home':
            //Gestion de l'affichage de la section
            let activeSections = document.querySelectorAll('.active');
            //console.log('Rien')
            activeSections.forEach(section => {
                section.classList.add('hidden')
            });
            activeSections.forEach(section => {
                section.classList.remove('active')
            });
            document.querySelector('.resume').classList.add('active');
            document.querySelector('.resume').classList.remove('hidden');

            drawResumeDatas(fetchedData, 1);
            break;
        case '#forces-faiblesses':
            //Gestion de l'affichage de la section
            activeSections = document.querySelectorAll('.active');
            //console.log('avtives', activeSections)
            activeSections.forEach(section => {
                section.classList.add('hidden')
            });
            activeSections.forEach(section => {
                section.classList.remove('active')
            });
            document.querySelector('.forces-faiblesses').classList.add('active');
            document.querySelector('.forces-faiblesses').classList.remove('hidden');


            drawForcesFaiblessesData(fetchedData)
            break;

        case '#schema-elements':
            //Gestion de l'affichage de la section
            activeSections = document.querySelectorAll('.active');
            //console.log('avtives', activeSections)
            activeSections.forEach(section => {
                section.classList.add('hidden')
            });
            activeSections.forEach(section => {
                section.classList.remove('active')
            });
            document.querySelector('.schema-elements').classList.add('active');
            document.querySelector('.schema-elements').classList.remove('hidden');
            break;

        case '#pokemons-par-type':
            //Gestion de l'affichage de la section
            activeSections = document.querySelectorAll('.active');
            //console.log('avtives', activeSections)
            activeSections.forEach(section => {
                section.classList.add('hidden')
            });
            activeSections.forEach(section => {
                section.classList.remove('active')
            });
            document.querySelector('.pokemons-par-type').classList.add('active');
            document.querySelector('.pokemons-par-type').classList.remove('hidden');
            break;

        case '#combat':
            //Gestion de l'affichage de la section
            activeSections = document.querySelectorAll('.active');
            //console.log('avtives', activeSections)
            activeSections.forEach(section => {
                section.classList.add('hidden')
            });
            activeSections.forEach(section => {
                section.classList.remove('active')
            });
            document.querySelector('.combat').classList.add('active');
            document.querySelector('.combat').classList.remove('hidden');
            break;
    }
}



function chooseColorDisplayOnType(pokemon) {
    if (pokemon.Type1 == "Ghost") {
        return "black";
    } else if (pokemon.Type1 == "Grass") {
        return "Olive"
    }
    else if (pokemon.Type1 == "Ground") {
        return "Wheat";
    } else if (pokemon.Type1 == "Rock") {
        return "Tan"
    } else if (pokemon.Type1 == "Psychic") {
        return "Violet"
    } else if (pokemon.Type1 == "Water") {
        return "blue"
    }
    else if (pokemon.Type1 == "Electric") {
        return "violet"
    }
    else if (pokemon.Type1 == "Normal") {
        return "WhiteSmoke"
    } else if (pokemon.Type1 == "Fighting") {
        return "Tomato"
    } else if (pokemon.Type1 == "Poison") {
        return "Purple"
    } else if (pokemon.Type1 == "Bug") {
        return "DarkSlateGrey"
    } else if (pokemon.Type1 == "Flying") {
        return "DarkKhaki"
    } else if (pokemon.Type1 == "Ice") {
        return "LightCyan";
    } else if (pokemon.Type1 == "Dark") {
        return "DimGrey"
    } else if (pokemon.Type1 == "Fire") {
        return "DarkOrange"
    } else if (pokemon.Type1 == "Dragon") {
        return "LightCoral"
    }
}

function deleteSvgEls() {
    //Effacement de l'ensemble des éléments dessinés précédemment dans les svg

    let svgEls = document.querySelectorAll('svg')
    console.log("delete")
    svgEls.forEach(svgEl => {
        let svgChidlren = svgEl.childNodes
        //console.log(svgChidlren)
        svgChidlren.forEach(element => {
            let parent = element.parentNode;
            console.log("deleted", parent)
            element.remove();
            console.log(element)
        });
    });
}


function drawResumeDatas(orderedDatas, currentSeason) {
    //console.log("dessin")
    //Dessiner
    const margin = { top: 10, right: 40, bottom: 10, left: 40 };
    const resumeWidth = screen.width / 2 - margin.left - margin.right;
    const resumeHeight = screen.width * 4 / 5 - margin.top - margin.bottom;

    //Effacement des circles resumés
    d3.select('.circle-resume').remove()

    let resumeSvg = d3.select('.resume-svg')
    resumeSvg.attr("width", resumeWidth + margin.left + margin.right)
        .attr("height", resumeHeight + margin.top + margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    let groupe = resumeSvg.append('g').attr('class', 'circle-resume')

    //Création de cercles dont la couleur dépend du type du pokemon
    let lineCircle = 0;
    let colCircle = 0;

    groupe.selectAll("seasonsPokemon")
        .data(orderedDatas.seasons[currentSeason])
        .join(enter => enter
            .append("circle")
            .attr("cx", (d, i) => { if (i % 12 == 0) { colCircle = 0; console.log("colCircle", colCircle) } else { colCircle++ } return (colCircle * 40 - 40) })
            //affichage des cercles en ligne
            .attr("cy", (d, i) => { if (i % 12 == 0) { lineCircle++; } return (lineCircle * 45 - 20) })
            .attr("r", d => 15)
            .style("fill", d => chooseColorDisplayOnType(d))
            .attr("transform", "translate(100, 10)")
            .attr("class", (d) => d.Name)
            .attr("class", (d) => `pokeCircle ${d.Name}`)
            .attr('data-name', (d) => `${d.Name}`))

    // Dessin des textes
    let lineText = 0;
    let colText = 0;

    groupe.selectAll('text')
        .data(orderedDatas.seasons[currentSeason])
        .join(enter => enter.append('text')
            .attr('x', (d, i) => { if (i % 12 == 0) { colText = 0; } else { colText++ } return (colText * 40 + 50) })
            .attr("y", (d, i) => { if (i % 12 == 0) { lineText++; } return (lineText * 45 + 15) })
            .attr("font-size", 6)
            .attr("font-family", "Calibri")
            .attr("font-weight", "bold")
            .attr("class", "pokeText")
            .text(d => d.Name.length > 10 ? d.Name.slice(0, 9) : d.Name))

    //Ajout de la responsivité des boutons
    let reumeButtons = document.querySelectorAll('.season-select-button')
    reumeButtons.forEach(button => {
        button.addEventListener("click", (e) => { let currentSeason = e.target.dataset.season; drawResumeDatas(orderedDatas, currentSeason) })
    });
}


function drawForcesFaiblessesData(fetchedData) {
    //Dimensions du svgs montrant les forces et les faiblesses
    const margin = { top: 10, right: 40, bottom: 10, left: 40 };
    const forcesFaiblessesWidth = screen.width / 2 - margin.left - margin.right ;
    const forcesFaiblessesHeight = screen.width * 4 / 5 - margin.top - margin.bottom;

    //Dimensions du svg montrant listant les types
    const marginElementsList = { top: 10, right: 40, bottom: 10, left: 40 };
    const ElementsListWidth = screen.width / 2 - margin.left - margin.right;
    const ElementsListHeight = screen.width * 4 / 5 - margin.top - margin.bottom;


    //chaque type dans un objet avec la liste des forces et des faiblesses
    //Afin de gagner du temps, la propriété type est changée en Type1 pour pouvoir par la suite utiliser chooseDisplayColorOnType
    const elements = [
        {Type1: "Ghost", weaknesses: [], strengths: []},
        {Type1: "Grass", weaknesses: [], strengths: []},
        {Type1: "Ground", weaknesses: [], strengths: []},
        {Type1: "Rock", weaknesses: [], strengths: []},
        {Type1: "Psychic", weaknesses: [], strengths: []},
        {Type1: "Water", weaknesses: [], strengths: []},
        {Type1: "Electric", weaknesses: [], strengths: []},
        {Type1: "Normal", weaknesses: [], strengths: []},
        {Type1: "Fighting", weaknesses: [], strengths: []},
        {Type1: "Poison", weaknesses: [], strengths: []},
        {Type1: "Bug", weaknesses: [], strengths: []},
        {Type1: "Flying", weaknesses: [], strengths: []},
        {Type1: "Ice", weaknesses: [], strengths: []},
        {Type1: "Dark", weaknesses: [], strengths: []},
        {Type1: "Fire", weaknesses: [], strengths: []},
        {Type1: "Dragon", weaknesses: [], strengths: []}
    ]


    
    //Effacement des ancienns forces et faiblesses
    d3.select('.forces-faiblesses-drawn').remove() 
    let forcesFaiblessesSvg = d3.select('.forces-faiblesses-svg');
    forcesFaiblessesSvg.attr("width", forcesFaiblessesWidth + margin.left + margin.right)
        .attr("height", forcesFaiblessesHeight + margin.top + margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    let groupeForcesFaiblesses = forcesFaiblessesSvg.append('g').attr('class', 'forces-faiblesses-drawn')


    //Effacement de l'ancienne d'éléments
    d3.select('.elements-list-drawn').remove() 
    let listeElementsSvg = d3.select('.liste-elements-svg');
    listeElementsSvg.attr("width", ElementsListWidth + margin.left + margin.right)
        .attr("height", ElementsListHeight + margin.top + margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    let groupeElementsList = listeElementsSvg.append('g').attr('class', 'elements-list-drawn')

    //Création de cercles  pour chacun des types dont la couleur dépend du type du pokemon
    let lineCircle = 0;
    let colCircle = 0;
    groupeElementsList.selectAll("elementsList")
        .data(elements)
        .join(enter => enter
            .append("circle")
            .attr("cx", (d, i) => { if (i % 3 == 0) { colCircle = 0; console.log("colCircle", colCircle) } else { colCircle++ } return (colCircle * 160 - 40) })
            //affichage des cercles en ligne
            .attr("cy", (d, i) => { if (i % 3 == 0) { lineCircle++; } return (lineCircle * 100 - 34) })
            .attr("r", d => 34)
            .style("fill", d => chooseColorDisplayOnType(d))
            .attr("transform", "translate(100, 10)")
            .attr('data-type', (d) => `${d.Name}`))

    // Dessin des textes
    let lineText = 0;
    let colText = 0;

    groupeElementsList.selectAll('text')
        .data(elements)
        .join(enter => enter.append('text')
            .attr('x', (d, i) => { if (i % 3 == 0) { colText = 0; } else { colText++ } return (colText * 160 + 40) })
            .attr("y", (d, i) => { if (i % 3 == 0) { lineText++; } return (lineText * 100 + 25) })
            .attr("font-size", 14)
            .attr("font-family", "Calibri")
            .attr("font-weight", "bold")
            .attr("class", "pokeText")
            .attr("color", "white")
            .text(d => d.Type1.length > 10 ? d.Type1.slice(0, 9) : d.Type1))

    //Ajout de la responsivité des boutons
    let reumeButtons = document.querySelectorAll('.season-select-button')
    reumeButtons.forEach(button => {
        button.addEventListener("click", (e) => { let currentSeason = e.target.dataset.season; drawResumeDatas(orderedDatas, currentSeason) })
    });


    console.log("forcesFaib", fetchedData)
}

// On link la fonction "displaySection" à l'événement hashchange pour être averti d'un changement de hash dans l'url
window.addEventListener('hashchange', () => fetchData())

// Affichage au chargement pour traiter l'url en cours (exemple: on ouvre un lien dans un nouvel onglet)
fetchData()