"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawResumeDatas = drawResumeDatas;

function drawResumeDatas(orderedDatas, currentSeason) {
  console.log("dessin"); //Dessiner

  var margin = {
    top: 10,
    right: 40,
    bottom: 10,
    left: 40
  };
  var resumeWidth = screen.width / 2 - margin.left - margin.right;
  var resumeHeight = screen.width * 4 / 5 - margin.top - margin.bottom; //Effacement des circles resumés

  d3.select('.circle-resume').remove();
  var resumeSvg = d3.select('.resume-svg');
  resumeSvg.attr("width", resumeWidth + margin.left + margin.right).attr("height", resumeHeight + margin.top + margin.bottom).attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var groupe = resumeSvg.append('g').attr('class', 'circle-resume'); //Création de cercles dont la couleur dépend du type du pokemon

  var lineCircle = 0;
  var colCircle = 0;
  groupe.selectAll("seasonsPokemon").data(orderedDatas.seasons[currentSeason]).join(function (enter) {
    return enter.append("circle").attr("cx", function (d, i) {
      if (i % 12 == 0) {
        colCircle = 0;
        console.log("colCircle", colCircle);
      } else {
        colCircle++;
      }

      return colCircle * 40 - 40;
    }) //affichage des cercles en ligne
    .attr("cy", function (d, i) {
      if (i % 12 == 0) {
        lineCircle++;
      }

      return lineCircle * 45 - 20;
    }).attr("r", function (d) {
      return 15;
    }).style("fill", function (d) {
      return chooseColorDisplayOnType(d);
    }).attr("transform", "translate(100, 10)").attr("class", function (d) {
      return d.Name;
    }).attr("class", function (d) {
      return "pokeCircle ".concat(d.Name);
    }).attr('data-name', function (d) {
      return "".concat(d.Name);
    });
  }); // Dessin des textes

  var lineText = 0;
  var colText = 0;
  groupe.selectAll('text').data(orderedDatas.seasons[currentSeason]).join(function (enter) {
    return enter.append('text').attr('x', function (d, i) {
      if (i % 12 == 0) {
        colText = 0;
      } else {
        colText++;
      }

      return colText * 40 + 50;
    }).attr("y", function (d, i) {
      if (i % 12 == 0) {
        lineText++;
      }

      return lineText * 45 + 15;
    }).attr("font-size", 6).attr("font-family", "Calibri").attr("font-weight", "bold").attr("class", "pokeText").text(function (d) {
      return d.Name.length > 10 ? d.Name.slice(0, 9) : d.Name;
    });
  }); //Ajout de la responsivité des boutons

  var reumeButtons = document.querySelectorAll('.season-select-button');
  reumeButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      var currentSeason = e.target.dataset.season;
      drawResumeDatas(orderedDatas, currentSeason);
    });
  });
}