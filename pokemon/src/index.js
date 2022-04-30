import * as d3 from 'd3'
import { csv, json } from 'd3-fetch'

//Indiquer plus explicitement qu'il faut cliquer sur les ronds
//Ajouter des animations

let dataToUpdate = { pokemonsPerType: [] }


function fetchData() {
    let season1Pokemons = [];
    let season2Pokemons = [];
    let season3Pokemons = [];
    let season4Pokemons = [];

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
            let steelPokemons = []
            let fairyPokemons = []

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
                } else if (pokemon.Type1 == "Steel") {
                    steelPokemons.push(pokemon)
                } else if (pokemon.Type1 == "Fairy") {
                    fairyPokemons.push(pokemon)
                }
            });

            dataToUpdate.pokemonsPerType = {
                Dragon: dragonPokemons,
                Grass: grassPokemons,
                Fire: firePokemons,
                Ice: icePokemons,
                Dark: darkPokemons,
                Ghost: ghostPokemons,
                Steel: steelPokemons,
                Electric: electricPokemons,
                Ground: groundPokemons,
                Bug: bugPokemons,
                Fairy: fairyPokemons,
                Water: waterPokemons,
                Flying: flyingPokemons,
                Normal: normalPokemons,
                Psychic: psychicPokemons,
                Poison: poisonPokemons,
                Fighting: fightingPokemons,
                Rock: rockPokemons
            }

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
            // console.log(error);
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


            drawForcesFaiblessesData(fetchedData, "Fire")
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


            drawSchemaElements();
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


            drawPokemonsParType(fetchedData);
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
    // console.log("ChooseColor", pokemon)
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
    } else if (pokemon.Type1 == "Fairy") {
        return "MistyRose"
    } else if (pokemon.Type1 == "Steel") {
        return "SlateGrey"
    }
}

function drawResumeDatas(orderedDatas, currentSeason) {
    console.log("dessin")
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


function drawForcesFaiblessesData(fetchedData, elementToDisplay) {
    //Dimensions du svgs montrant les forces et les faiblesses
    const margin = { top: 10, right: 40, bottom: 10, left: 40 };
    const forcesFaiblessesWidth = screen.width / 2 - margin.left - margin.right;
    const forcesFaiblessesHeight = screen.width * 4 / 5 - margin.top - margin.bottom;

    //Dimensions du svg montrant listant les types
    const marginElementsList = { top: 10, right: 40, bottom: 10, left: 40 };
    const ElementsListWidth = screen.width / 2 - margin.left - margin.right;
    const ElementsListHeight = screen.width * 4 / 5 - margin.top - margin.bottom;


    //chaque type dans un objet avec la liste des forces et des faiblesses
    //Afin de gagner du temps, la propriété type est changée en Type1 pour pouvoir par la suite utiliser chooseDisplayColorOnType
    const elements = [
        { Type1: "Ghost", weaknesses: ["Dark"], strengths: ["Psychic", "Ghost"] },
        { Type1: "Grass", weaknesses: ["Fire", "Grass", "Poison", "Flying", "Bug", "Dragon", "Steel"], strengths: ["Water", "Ground", "Rock"] },
        { Type1: "Ground", weaknesses: ["Grass", "Bug"], strengths: ["Fire", "Electric", "Rock", "Poison", "Steel"] },
        { Type1: "Rock", weaknesses: ["Fighting", "Ground", "Steel"], strengths: ["Fire", "Electric", "Flyinf", "Bug"] },
        { Type1: "Psychic", weaknesses: ["Psychic", "Steel"], strengths: ["Fighting", "Poison"] },
        { Type1: "Water", weaknesses: ["Water", "Grass", "Dragon"], strengths: ["Fire", "Ground", "Rock"] },
        { Type1: "Electric", weaknesses: ["Grass", "Electric", "Dragon"], strengths: ["Water", "Flying"] },
        { Type1: "Normal", weaknesses: ["Rock", "Steel"], strengths: [] },
        { Type1: "Fighting", weaknesses: ["poison", "Flying", "Psychic", "Fairy"], strengths: ["Normal", "Ice", "Rock", "Dark", "Steel"] },
        { Type1: "Poison", weaknesses: ["Poison", "Rock", "Ground", "Ghost"], strengths: ["Grass", "Fairy"] },
        { Type1: "Bug", weaknesses: ["Fire", "Flying", "Poison", "Fighting", "Rock", "Steel", "Fairy"], strengths: ["Grass", "Psychic", "Dark"] },
        { Type1: "Flying", weaknesses: ["Electric", "Rock", "Steel"], strengths: ["Grass", "Fighting", "Bug"] },
        { Type1: "Ice", weaknesses: ["Fire", "Water", "Ice", "Steel"], strengths: ["Ice", "Ground", "Flying", "Dragon"] },
        { Type1: "Dark", weaknesses: ["Fighting"], strengths: ["Dark", "Fairy"] },
        { Type1: "Fire", weaknesses: ["Fire", "Water", "Rock"], strengths: ["Grass", "Ice"] },
        { Type1: "Dragon", weaknesses: ["Steel"], strengths: ["Dragon"] },
        { Type1: "Fairy", weaknesses: ["Fire", "Poison"], strengths: ["Fighting", "Ghost", "Dragon"] },
        { Type1: "Steel", weaknesses: ["Fire", "Water", "Electric", "Steel"], strengths: ["Ice", "Ghost", "Dragon"] }
    ]


    //Ecran forces et faiblesses  
    //Effacement des ancienns forces et faiblesses
    d3.select('.forces-faiblesses-drawn').remove()
    let forcesFaiblessesSvg = d3.select('.forces-faiblesses-svg');
    forcesFaiblessesSvg.attr("width", forcesFaiblessesWidth + margin.left + margin.right)
        .attr("height", forcesFaiblessesHeight + margin.top + margin.bottom)
        .attr("font-size", 14)
        .attr("font-family", "Calibri")
        .attr("transform", "translate(" + margin.left + "," + (-30) + ")");
    let groupeForcesFaiblesses = forcesFaiblessesSvg.append('g').attr('class', 'forces-faiblesses-drawn')


    //Faiblesses
    let selectedType = elements.filter(el => el.Type1 == elementToDisplay);
    // console.log("selectedType", selectedType[0].Type1)
    groupeForcesFaiblesses.selectAll("forcesEtFaiblessesList")
        .data(selectedType[0].Type1)
        .join(enter => enter
            .append("text").attr("class", "faiblessesHeader").attr("width", "400").attr("y", 100).attr("x", 54)
            .attr("font-size", 18)
            .attr("font-family", "Calibri")
            .text(d => `Element ${selectedType[0].Type1} is weak against`)
        )

    let colForcesFaiblesses = 0;
    let lineForcesFaiblesses = 0;
    groupeForcesFaiblesses.selectAll("forcesEtFaiblessesList")
        .data(selectedType[0].weaknesses)
        .join(enter => enter
            .append("text")
            .attr("font-size", 14)
            .attr("font-family", "Calibri")
            .attr("font-weight", "bold")
            .attr("x", (d, i) => { if (i % 3 == 0) { colForcesFaiblesses = 0; console.log("colCircle", colForcesFaiblesses) } else { colForcesFaiblesses++ } return (colForcesFaiblesses * 160 + 594) })
            .attr("y", (d, i) => { if (i % 3 == 0) { lineForcesFaiblesses++; } return (lineForcesFaiblesses * 100 + 66) })
            .attr("class", "elementForceFaiblesse")
            .style("fill", d => { let obj = { Type1: d }; return chooseColorDisplayOnType(obj) })
            .attr("transform", "translate(100, 10)")
            .attr('data-type', (d) => `${d}`)
            .text(d => d.length > 10 ? d.slice(0, 9) : d)
            .transition()
            .duration(1000) 
            .attr('transform', 'translate(-540,0)')  
        )


    //Forces
    groupeForcesFaiblesses.selectAll("forcesEtFaiblessesList")
        .data(selectedType[0].Type1)
        .join(enter => enter
            .append("text").attr("class", "faiblessesHeader").attr("width", "400").attr("y", 390).attr("x", 54).attr("font-size", 18)
            .attr("font-family", "Calibri")
            .text(d => `Element ${selectedType[0].Type1} is strong against`)
        )
    colForcesFaiblesses = 0;
    lineForcesFaiblesses = 0;
    groupeForcesFaiblesses.selectAll("forcesEtFaiblessesList")
        .data(selectedType[0].strengths)
        .join(enter => enter
            .append("text")
            .attr("font-size", 14)
            .attr("font-family", "Calibri")
            .attr("font-weight", "bold")
            .attr("x", (d, i) => { if (i % 3 == 0) { colForcesFaiblesses = 0; console.log("colCircle", colForcesFaiblesses) } else { colForcesFaiblesses++ } return (colForcesFaiblesses * 160 +594) })
            .attr("y", (d, i) => { if (i % 3 == 0) { lineForcesFaiblesses++; } return (lineForcesFaiblesses * 100 + 366) })
            .attr("class", "elementForceFaiblesse")
            .style("fill", d => { let obj = { Type1: d }; return chooseColorDisplayOnType(obj) })
            .attr("transform", "translate(100, 10)")
            .attr('data-type', (d) => `${d}`)
            .text(d => d.length > 10 ? d.slice(0, 9) : d)
            .transition()
            .duration(1000) 
            .attr('transform', 'translate(-540,0)')  
        )



    //liste des éléments
    //Effacement de l'ancienne d'éléments
    d3.select('.elements-list-drawn').remove()
    let listeElementsSvg = d3.select('.liste-elements-svg');
    listeElementsSvg.attr("width", ElementsListWidth + margin.left + margin.right)
        .attr("height", ElementsListHeight + margin.top + margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    let groupeElementsList = listeElementsSvg.append('g').attr('class', 'elements-list-drawn')

    //Création de cercles  pour chacun des types dont la couleur dépend du type du pokemon accompagné de son titre
    let lineCircle = 0;
    let colCircle = 0;
    groupeElementsList.selectAll("elementsList")
        .data(elements)
        .join(enter => enter
            .append("circle")
            .attr("cx", (d, i) => { if (i % 3 == 0) { colCircle = 0; console.log("colCircle", colCircle) } else { colCircle++ } return (colCircle * 160 +500) })
            //affichage des cercles en ligne
            .attr("cy", (d, i) => { if (i % 3 == 0) { lineCircle++; } return (lineCircle * 100 - 34) })
            .attr("r", d => 34)
            .attr("class", "elementCircle")
            .attr("fill", d => chooseColorDisplayOnType(d))
            .attr("transform", "translate(100, 10)")
            .attr('data-type', (d) => `${d.Type1}`)
            .transition()
            .duration(1000) 
            .attr('transform', 'translate(-440,0)')  
        )

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
            .attr("class", "elementText")
            .attr("color", "white")
            .text(d => d.Type1.length > 10 ? d.Type1.slice(0, 9) : d.Type1)
            .attr('data-type', (d) => `${d.Type1}`)
        )

    //Rassemblement de tous les cercles et les textes dans un array elementsGroups pour leur ajouter de la responsivité
    let elementCircles = document.querySelectorAll('.elementCircle');
    let elementTexts = document.querySelectorAll('.elementText');
    let elementsGroups = [];
    elementCircles.forEach(element => {  elementsGroups.push(element)});
    elementTexts.forEach(element => { elementsGroups.push(element)});
    //Ajout de la responsivité des élements
    elementsGroups.forEach(svgGroup => {
        //On récupère le type de l'élément cliqué selon le dataset du cercle du groupe
        svgGroup.addEventListener("click", (e) => { drawForcesFaiblessesData(fetchedData, e.target.dataset["type"]) })
        svgGroup.addEventListener("mouseover", (e) => { e.target.setAttribute("stroke", e.target.getAttribute("fill")); e.target.setAttribute("fill", "white")})
        svgGroup.addEventListener("mouseleave", (e) => {  e.target.setAttribute("fill",  e.target.getAttribute("stroke")); e.target.setAttribute("stroke","white")})

    });
}


function drawPokemonsParType(fetchedData) {
    console.log("Partype", dataToUpdate.pokemonsPerType);


    //Organisation de la donnée 
    const nbPerElements = [
        { Type1: "Ghost", nbPokemons: dataToUpdate.pokemonsPerType.Ghost.length },
        { Type1: "Grass", nbPokemons: dataToUpdate.pokemonsPerType.Grass.length },
        { Type1: "Ground", nbPokemons: dataToUpdate.pokemonsPerType.Ground.length },
        { Type1: "Rock", nbPokemons: dataToUpdate.pokemonsPerType.Rock.length },
        { Type1: "Psychic", nbPokemons: dataToUpdate.pokemonsPerType.Psychic.length },
        { Type1: "Water", nbPokemons: dataToUpdate.pokemonsPerType.Water.length },
        { Type1: "Electric", nbPokemons: dataToUpdate.pokemonsPerType.Electric.length },
        { Type1: "Normal", nbPokemons: dataToUpdate.pokemonsPerType.Normal.length },
        { Type1: "Fighting", nbPokemons: dataToUpdate.pokemonsPerType.Fighting.length },
        { Type1: "Poison", nbPokemons: dataToUpdate.pokemonsPerType.Poison.length },
        { Type1: "Bug", nbPokemons: dataToUpdate.pokemonsPerType.Bug.length },
        { Type1: "Flying", nbPokemons: dataToUpdate.pokemonsPerType.Flying.length },
        { Type1: "Ice", nbPokemons: dataToUpdate.pokemonsPerType.Ice.length },
        { Type1: "Dark", nbPokemons: dataToUpdate.pokemonsPerType.Dark.length },
        { Type1: "Fire", nbPokemons: dataToUpdate.pokemonsPerType.Fire.length },
        { Type1: "Dragon", nbPokemons: dataToUpdate.pokemonsPerType.Dragon.length },
        { Type1: "Fairy", nbPokemons: dataToUpdate.pokemonsPerType.Fairy.length },
        { Type1: "Steel", nbPokemons: dataToUpdate.pokemonsPerType.Steel.length }
    ]

    nbPerElements.sort(function (a,b) { return b.nbPokemons - a.nbPokemons})

    console.log(nbPerElements)

    //Dimensions du svgs montrant les forces et les faiblesses
    const margin = { top: 10, right: 40, bottom: 10, left: 40 };
    const nbParTypeWidth = screen.width - margin.left - margin.right - screen.width * 0.15;
    const nbParTypeHeight = screen.width * 0.4 - margin.top - margin.bottom;


    //Dessin du svg
    //Effacement de l'ancienne d'éléments
    d3.select('.nb-par-type-drawn').remove()
    d3.select('.nb-par-type-text-drawn').remove()
    let nbParTypeSvg = d3.select('.nb-par-type-svg');
    // console.log(nbParTypeSvg)
    nbParTypeSvg.attr("width", nbParTypeWidth + margin.left + margin.right)
        .attr("height", nbParTypeHeight + margin.top + margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    let groupeNbParType = nbParTypeSvg.append('g').attr('class', 'np-par-type-drawn')
    let groupNbParTypeText = nbParTypeSvg.append('g').attr('class', 'np-par-type-text-drawn')
    // console.log("nbPerElements", nbPerElements)



    const y = d3.scaleLinear()
        .domain([0, 112])
        .range([nbParTypeHeight, 0])

    //axe y
    nbParTypeSvg.append('g')
        .call(d3.axisLeft(y))
        .attr('class', "yAxis")
        .attr("transform", "translate(100, 10)")

    //Dessin de barres représentant le nombre de pokemons par type:
    groupeNbParType.selectAll("nbParType")
        .data(nbPerElements)
        .enter()
        .append("rect")
        .attr("height", d => nbParTypeHeight - y(d.nbPokemons)) 
        .transition()
        .duration(3000) 
        .attr('transform', 'translate(120, 10)')      
        .attr("width", 35)
        .attr("class", d => d.Type1)
        .attr("fill", d => chooseColorDisplayOnType(d))
        .attr("x", (d, i) => i * 25 + 30 * i)
        .attr("y", d => y(d.nbPokemons))


        // .transition()
        // .duration(3000)
        // .attr('transform', 'translate(400, 0)')


    //Dessin de texte représentant l'élément à l'intérieur de chaque barre
    groupNbParTypeText.selectAll('text')
        .data(nbPerElements)
        .join(enter => enter.append('text')
            .attr("x", (d, i) => i * 25 + 30 * i)
            .attr("y", d => nbParTypeHeight + 10)
            .attr("font-size", 14)
            .attr("font-family", "Calibri")
            .attr("font-weight", "bold")
            .attr("class", "elementText")
            .attr("fill", d => "Black")
            .text(d => d.Type1.length > 10 ? d.Type1.slice(0, 9) : d.Type1)
            .attr('data-type', (d) => `${d.Type1}`)
            .attr("transform", "translate(120, 20)")
        )

        document.querySelector('svg.nb-par-type-svg').setAttribute('height', 600)
}


function drawSchemaElements(){

    //Generate pokemon types dynamically
    const pokeTypes = ['Ghost', 'Grass', 'Ground', 'Rock', 'Psychic', 'Water', 'Electric', 'Normal', 'Fighting', 'Poison', 'Bug', 'Flying', 'Ice', 'Dark', 'Fire', 'Dragon', 'Fairy']
    console.log("dessine schema");
    let htmlList = document.querySelector('select');
    console.log(htmlList, dataToUpdate.pokemonsPerType)
    pokeTypes.forEach(element => {
        if(element != "Fairy" && element != "Normal"){
            let option = document.createElement('option');
            option.textContent = element;
            option.setAttribute("value", element);
            option.setAttribute("data-element", element)
            htmlList.append(option);
        }
    });

    //Dessin du schema
    let svg = d3.select('.schema-element-svg')
    .attr('width', window.innerWidth * 0.75)
    .attr('height', window.innerWidth * 0.75)

    let schema = svg.append('image')
    .attr("class", "dynamic-schema")
    .attr('href', './img/Pikachu.svg')
    .attr('width', window.innerWidth * 0.75)
    .attr('height', window.innerWidth * 0.75)

    //Dessin du schema selon l'attribu sélectionné:
    console.log(htmlList.children)
    htmlList.addEventListener("click", e => {
            console.log('select')
            let selectedElement = e.target.value;
            let imageSrc = `./img/types-svg/${selectedElement}.svg`;
            document.querySelector(".dynamic-schema").setAttribute("href", imageSrc);

                //Change de titre
    document.querySelector(".schema-element-name").textContent=`${selectedElement} element`
        })      
}

// On link la fonction "displaySection" à l'événement hashchange pour être averti d'un changement de hash dans l'url
window.addEventListener('hashchange', () => fetchData())

// Affichage au chargement pour traiter l'url en cours (exemple: on ouvre un lien dans un nouvel onglet)
fetchData()
