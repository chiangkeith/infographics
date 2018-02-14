import _ from 'lodash'
const debug = require('debug')('d3')
export class FertilityD3 {
  constructor () {
    this.init = this.init.bind(this)
    this.updateScales = this.updateScales.bind(this)
    this.updateChart = this.updateChart.bind(this)
    this.makeXAxis = this.makeXAxis.bind(this)
    this.makeYAxis = this.makeYAxis.bind(this)
    // this.renderPoint = this.renderPoint.bind(this)
  }
  init (eleSelector, year) {
    d3.json('./data/1980.json', (rawdata) => {
      this.xAxis = 'rate1'
      this.yAxis = 'rate2'
      this.rawdata = rawdata
      this.data = year ? rawdata[ year ] : rawdata[ '1980' ]
      this.bounds = this.getBounds(_.concat(..._.map(rawdata, d => d)), 1)
      debug(this.data)
      debug('bounds', this.bounds)
      debug(_.concat(..._.map(rawdata, d => d)))

      this.svgWidth = document.querySelector(eleSelector).clientWidth || 1000
      // this.scale = this.svgWidth / 1000
      // this.ratio = this.svgWidth < 1000 ? (740 / 828) : ( 640 / 1000)
      // this.svgHeight = this.svgWidth * this.ratio
      this.svgHeight = document.querySelector(eleSelector).clientHeight || 640
      this.bias = this.svgWidth < 1100 ? 300 : 130
      // this.bias = 0
      debug('eleSelector.width', document.querySelector(eleSelector).clientWidth)
      debug('eleSelector.width', document.querySelector(eleSelector).clientWidth)
      debug('eleSelector.width', document.querySelector(eleSelector).clientWidth)
      this.eleSelector = eleSelector
      const svg = d3.select(eleSelector)
        .append('svg')
        .attr('width', this.svgWidth)
        .attr('height', this.svgHeight)

      svg.append('g')
        .classed('chart', true)
        .attr('transform', 'translate(80, 0)')

      d3.select(`${this.eleSelector} svg g.chart`)
      .append('line')
      .attr('id', 'bestfit')

      d3.select(`${this.eleSelector} svg g.chart`)
        .append('text')
        .attr({'id': 'xLabel', 'x': this.svgWidth / 2, 'y': this.svgHeight + 50 - this.bias / 2, 'text-anchor': 'middle'})
        .text('生育率')

      d3.select(`${this.eleSelector} svg g.chart`)
        .append('text')
        .attr('transform', `translate(${this.svgWidth > 500 ? -60 : -30}, ${this.svgWidth > 500 ? (this.svgHeight / 3 + (this.bias / 2)) : this.bias})rotate(-90)`)
        .attr({'id': 'yLabel', 'text-anchor': 'middle'})
        .text('女性勞参率')

      this.updateScales()
      d3.select(`${this.eleSelector} svg g.chart`)
      .selectAll('circle')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('cx', (d) => {
        return (isNaN(d[this.xAxis]) ? d3.select(this).attr('cx') : this.xScale(d[this.xAxis])) + (this.svgWidth > 500 ? 0 : -50);
      })
      .attr('cy', (d) => {
        return (isNaN(d[this.yAxis]) ? d3.select(this).attr('cy') : this.yScale(d[this.yAxis])) + this.bias / 2;
      })
      .attr('class', function (d) {
        const _class = d.class === 'L' ? 'low'
                                      : d.class === 'H'
                                      ? 'high'
                                      : 'avg'
        return _class
      })
      d3.select(`${this.eleSelector} svg g.chart`)
      .selectAll('text.name')
      .data(this.data)
      .enter()
      .append('text')
      .attr('class', 'name')
      .attr("x", (d) => { return (isNaN(d[this.xAxis]) ? d3.select(this).attr('cx') : this.xScale(d[this.xAxis])) + (this.svgWidth > 500 ? 0 : -50) })
      .attr("y", (d) => { return ((isNaN(d[this.yAxis]) ? d3.select(this).attr('cy') : this.yScale(d[this.yAxis])) + 20 + (this.bias / 2)) })
      .text((d) => {
        debug('d.name', d.name)
        return d.name
      })

      this.updateChart(true)
      d3.select(`${this.eleSelector} svg g.chart`)
        .append("g")
        .attr('transform', `translate(${this.svgWidth > 500 ? 0 : -50}, ${this.svgHeight - (this.bias / 2) + 10})`)
        .attr('id', 'xAxis')
        .call(this.makeXAxis);
      d3.select(`${this.eleSelector} svg g.chart`)
        .append("g")
        .attr('id', 'yAxis')
        .attr('transform', `translate(${this.svgWidth > 500 ? -10 : -50}, ${this.bias / 2})`)
        .call(this.makeYAxis);

      debug('g size', d3.select(`${this.eleSelector} svg g.chart`).node().getBBox())
      const newSize = d3.select(`${this.eleSelector} svg g.chart`).node().getBBox()
      d3.select(`${this.eleSelector} svg`)
        .attr("width", newSize.width + 10)
        .attr("height", newSize.height + this.bias / 2)
    })
  }
  updateScales () {
    this.xScale = d3.scale.linear()
    .domain([this.bounds[this.xAxis].min, this.bounds[this.xAxis].max])
    .range([0, this.svgWidth > 500 ? this.svgWidth > 1200 ? this.svgWidth - 600 : this.svgWidth - 400 : this.svgWidth - 40 ])

    this.yScale = d3.scale.linear()
    .domain([this.bounds[this.yAxis].min, this.bounds[this.yAxis].max])
    .range([this.svgHeight - this.bias, 0])
  }
  updateChart (init) {
    this.updateScales()
    d3.select(`${this.eleSelector} svg g.chart`)
      .selectAll('circle')
      .transition()
      .duration(500)
      .ease('quad-out')
      .attr('cx', (d) => {
        return (isNaN(d[this.xAxis]) ? d3.select(this).attr('cx') : this.xScale(d[this.xAxis])) + (this.svgWidth > 500 ? 0 : -50);
      })
      .attr('cy', (d) => {
        return (isNaN(d[this.yAxis]) ? d3.select(this).attr('cy') : this.yScale(d[this.yAxis])) + (this.bias / 2);
      })
      .attr('r', (d) => {
        return isNaN(d[this.xAxis]) || isNaN(d[this.yAxis]) ? 0 : 12;
      });
    d3.select(`${this.eleSelector} svg g.chart`)
      .selectAll('text.name')
      .transition()
      .duration(500)
      .ease('quad-out')
      .attr("x", (d) => { return (isNaN(d[this.xAxis]) ? d3.select(this).attr('cx') : this.xScale(d[this.xAxis])) + (this.svgWidth > 500 ? 0 : -50) })
      .attr("y", (d) => { return ((isNaN(d[this.yAxis]) ? d3.select(this).attr('cy') : this.yScale(d[this.yAxis])) + 20 + (this.bias / 2)) })

    d3.select('#xAxis')
      .transition()
      .call(this.makeXAxis);
    d3.select('#yAxis')
      .transition()
      .call(this.makeYAxis);

    const xArray = _.map(this.data, (d) => {return d[this.xAxis];});
    const yArray = _.map(this.data, (d) => {return d[this.yAxis];});
    const c = this.getCorrelation(xArray, yArray);
    const x1 = this.xScale.domain()[0], y1 = c.m * x1 + c.b;
    const x2 = this.xScale.domain()[1], y2 = c.m * x2 + c.b;

    d3.select('#bestfit')
      .style('opacity', 0)
      .attr({'x1': this.xScale(x1), 'y1': (this.yScale(y1) + (this.bias / 2)), 'x2': this.xScale(x2), 'y2': (this.yScale(y2) + (this.bias / 2))})
      .transition()
      .duration(1500)
      .style('opacity', 1);
  }
  getBounds(d, paddingFactor) {
    // Find min and maxes (for the scales)
    paddingFactor = typeof paddingFactor !== 'undefined' ? paddingFactor : 1;
  
    var keys = _.keys(d[0]), b = {};
    _.each(keys, (k) => {
      b[k] = {};
      _.each(d, function(d) {
        if(isNaN(d[k]))
          return;
        if(b[k].min === undefined || d[k] < b[k].min)
          b[k].min = d[k];
        if(b[k].max === undefined || d[k] > b[k].max)
          b[k].max = d[k];
      });
      b[k].max > 0 ? b[k].max *= paddingFactor : b[k].max /= paddingFactor;
      b[k].min > 0 ? b[k].min /= paddingFactor : b[k].min *= paddingFactor;
    });
    return b;
  }
  makeXAxis(s) {
    s.call(d3.svg.axis()
      .scale(this.xScale)
      .orient("bottom"));
  }
  makeYAxis(s) {
    s.call(d3.svg.axis()
      .scale(this.yScale)
      .orient("left"));
  }
  getCorrelation(xArray, yArray) {
    function sum(m, v) {return m + v;}
    function sumSquares(m, v) {return m + v * v;}
    function filterNaN(m, v, i) {isNaN(v) ? null : m.push(i); return m;}
  
    // clean the data (because we know that some values are missing)
    var xNaN = _.reduce(xArray, filterNaN , []);
    var yNaN = _.reduce(yArray, filterNaN , []);
    var include = _.intersection(xNaN, yNaN);
    var fX = _.map(include, function(d) {return xArray[d];});
    var fY = _.map(include, function(d) {return yArray[d];});
  
    var sumX = _.reduce(fX, sum, 0);
    var sumY = _.reduce(fY, sum, 0);
    var sumX2 = _.reduce(fX, sumSquares, 0);
    var sumY2 = _.reduce(fY, sumSquares, 0);
    var sumXY = _.reduce(fX, function(m, v, i) {return m + v * fY[i];}, 0);
  
    var n = fX.length;
    var ntor = ( ( sumXY ) - ( sumX * sumY / n) );
    var dtorX = sumX2 - ( sumX * sumX / n);
    var dtorY = sumY2 - ( sumY * sumY / n);
   
    var r = ntor / (Math.sqrt( dtorX * dtorY )); // Pearson ( http://www.stat.wmich.edu/s216/book/node122.html )
    var m = ntor / dtorX; // y = mx + b
    var b = ( sumY - m * sumX ) / n;
  
    // console.log(r, m, b);
    return {r: r, m: m, b: b};
  }
  update (year) {
    
    this.data = this.rawdata[ year ]
    
    d3.select(`${this.eleSelector} svg g.chart`)
    .selectAll('circle')
    .data(this.data)
    .enter()
    .append('circle')
    .attr('cx', (d) => {
      return (isNaN(d[this.xAxis]) ? d3.select(this).attr('cx') : this.xScale(d[this.xAxis])) + (this.svgWidth > 500 ? 0 : -50);
    })
    .attr('cy', (d) => {
      return (isNaN(d[this.yAxis]) ? d3.select(this).attr('cy') : this.yScale(d[this.yAxis])) + (this.bias / 2);
    })
    .attr('class', function (d) {
      const _class = d.class === 'L' ? 'low'
                                   : d.class === 'H'
                                   ? 'high'
                                   : 'avg'
      return _class
    })


    // const names =  d3.select(`${this.eleSelector} svg g.chart`)
    // .selectAll('text.name')
    // .data(this.data);

    d3.select(`${this.eleSelector} svg g.chart`)
    .selectAll('text.name')
    .data(this.data)
    .attr("x", (d) => { return (isNaN(d[this.xAxis]) ? d3.select(this).attr('cx') : this.xScale(d[this.xAxis])) + (this.svgWidth > 500 ? 0 : -50) })
    .attr("y", (d) => { return (isNaN(d[this.yAxis]) ? d3.select(this).attr('cy') : this.yScale(d[this.yAxis]) + 20 + (this.bias / 2)) })
    .text((d) => { return d.name });

    d3.select(`${this.eleSelector} svg g.chart`)
    .selectAll('text.name')
    .data(this.data)
    .enter()
    .append('text')
    .attr('class', 'name')
    .attr("x", (d) => { return (isNaN(d[this.xAxis]) ? d3.select(this).attr('cx') : this.xScale(d[this.xAxis])) + (this.svgWidth > 500 ? 0 : -50) })
    .attr("y", (d) => { return (isNaN(d[this.yAxis]) ? d3.select(this).attr('cy') : this.yScale(d[this.yAxis]) + 20 + (this.bias / 2)) })
    .text((d) => { return d.name })

    this.updateChart()

    const circle = d3.select(`${this.eleSelector} svg g.chart`).selectAll("circle").data(this.data)
    const names = d3.select(`${this.eleSelector} svg g.chart`).selectAll('text.name').data(this.data)
    circle.exit().remove()
    names.exit().remove()
    // const name = d3.select(`${this.eleSelector} svg g.chart`).selectAll("text").data(this.data)
    // name.exit().empty()
  }
}