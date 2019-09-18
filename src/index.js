import getData from './getData';
import * as d3 from 'd3';
import './style.css';

const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
let dataset = [];
let temp = [[1,2], [1,3]];
console.log(temp[0][1])
d3.json(url).then(data => data.data.forEach(el => {
    dataset.push(el);
console.log(el[0], el[1])
console.log(dataset.length);
})).then(console.log(dataset));

// dataset.forEach(el => console.log(`el: ${el}`));
console.log(dataset.length);

const svgHeight = 500;
const svgWidth = 1200;

let barChart = d3.select('#bar-chart')
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

let bar = barChart.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .style("height", d => d[1])
    .style("width", "120")
    .style("fill", "grey")
    .attr("x", (d, i) => svgWidth / dataset.length * i)
    .attr("y", (d, i) => svgHeight - d[1]);


