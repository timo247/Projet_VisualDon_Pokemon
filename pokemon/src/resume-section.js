
export function drawResumeDatas(orderedDatas, currentSeason) {
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