import * as d3 from 'd3';
import './style.css';

const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';

const svgHeight = 500;
const svgWidth = 1200;
const paddingLeft = 65;
const paddingRight = 50;
const paddingTop = 10;
const paddingBottom = 50;
const paddingVert = paddingTop + paddingBottom;
const paddingHoriz = paddingLeft + paddingRight;

const barChart = d3.select('#bar-chart')
                .append("svg")
                .attr("height", svgHeight)
                .attr("width", svgWidth);

const chartPlot = barChart.append("g")
                        .attr("transform", `translate(${paddingLeft},${paddingTop})`);

d3.json(url).then(data => {
    let dataset = [];

    data.data.forEach(el => dataset.push(el));

    const maxVal = d3.max(dataset, d => d[1]);
    const scaleX = d3.scaleBand()
                    .domain(dataset.map(d => d[0]))
                    .range([0, svgWidth - paddingHoriz]);
    const scaleY = d3.scaleLinear()
                    .domain([0, maxVal])
                    .range([svgHeight - paddingVert, 0]);
    const xAxis = d3.axisBottom()
                    .scale(scaleX);
    const yAxis = d3.axisLeft()
                    .scale(scaleY);

    const xAxisTranslate = svgHeight - paddingVert;
    chartPlot.append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(0,${xAxisTranslate})`)
        .call(xAxis);

    chartPlot.append("g")
        .attr("id", "y-axis")
        .call(yAxis);



    chartPlot.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => scaleX(d[0]))
        .attr("y", d => scaleY(d[1]))
        .style("width", scaleX.bandwidth())
        .style("height", d => svgHeight - paddingVert - scaleY(d[1]))
    //     .append("div")
    //     .attr("class", "tip");
    //     .html(d => d[0] + " <i>" + d[1]


    //     .append("text")
    //         .attr("text-anchor", "end")
    //         .attr("transform", "rotate(-90)")
    //         .attr("x", 10)
    //         .attr("y", -20)
    //         .text("GDP, billions of dollars");+"</i>")


});





