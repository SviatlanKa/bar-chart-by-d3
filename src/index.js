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

const tooltip = d3.select("#bar-chart")
                .append("div")
                .attr("id", "tooltip")
                .style("opacity", 0);

const barChart = d3.select('#bar-chart')
                .append("svg")
                .attr("height", svgHeight)
                .attr("width", svgWidth);

const defs = barChart.append("defs");

const filter = defs.append("filter")
    .attr("id", "shadow")
    .append("feDropShadow")
    .attr("dx", -0.2)
    .attr("dy", -0.2)
    .attr("stdDeviation", 2.5);


const chartPlot = barChart.append("g")
                        .attr("transform", `translate(${paddingLeft},${paddingTop})`);

d3.json(url).then(data => {
    let dataset = [];

    data.data.forEach(el => {
        const item = {
            date: new Date(el[0]),
            value: el[1]
        };
        dataset.push(item);
    });

    const maxVal = d3.max(dataset, d => d.value);
    const scaleX = d3.scaleTime()
                    .domain([d3.min(dataset, d => d.date), d3.max(dataset, d => d.date)])
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
        .style("font-size", ".8em")
        .attr("transform", `translate(0,${xAxisTranslate})`)
        .call(xAxis.ticks(d3.timeYear.every(5)));

    chartPlot.append("g")
        .attr("id", "y-axis")
        .style("font-size", ".8em")
        .call(yAxis);

    chartPlot.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .property("data-date", d => d.date)
        .property("data-gdp", d => d.value)
        .attr("x", d => scaleX(d.date))
        .attr("y", d => scaleY(d.value))
        .attr("width", (svgWidth - paddingHoriz) / dataset.length)
        .attr("height", d => svgHeight - paddingVert - scaleY(d.value))
        .style("filter", "url(#shadow)")
        .on("mouseover", d => {
            tooltip.transition()
                    .duration(350)
                    .style("opacity", .6);
            tooltip.html("<span>" + d3.timeFormat("%B %Y")(d.date) + "<br>"
                + d3.format("$,")(d.value) + " Billion" + "</span>")
                    .style("left", d3.event.pageX + 15 + "px")
                    .style("top", d3.event.pageY - 75 + "px");
        })
        .on("mouseout", (d) => {
            tooltip.transition()
                .duration(200)
                .style("opacity", 0);
        });

    chartPlot.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("x", -50)
            .attr("y", paddingLeft / 2)
            .text("GDP, in billions USD");
});





