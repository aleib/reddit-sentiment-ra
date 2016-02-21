import d3 from 'd3'
import React from 'react'
import ReactFauxDOM from 'react-faux-dom'

class LineChart extends React.Component {
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    data: React.PropTypes.array,
  };

  render () {
    const {width, height, data} = this.props

    var margin = {top: 20, right: 20, bottom: 30, left: 70},
    newWidth = width - margin.left - margin.right,
    newHeight = height - margin.top - margin.bottom;

   var x = d3.time.scale()
    .range([0, newWidth])

   var y = d3.scale.linear()
    .range([newHeight, 0])

    var xAxis = d3.svg.axis()
   .scale(x)
   .orient('bottom')

   var yAxis = d3.svg.axis()
   .scale(y)
   .orient('left')

   var line = d3.svg.line()
     .x(function (d) { return x(d.x) })
     .y(function (d) { return y(d.y) })

     var node = ReactFauxDOM.createElement('svg')
     var svg = d3.select(node)
     .attr('width', newWidth + margin.left + margin.right)
     .attr('height', newHeight + margin.top + margin.bottom)
     .append('g')
     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

     x.domain(d3.extent(data, function (d) { return d.x }))
     y.domain(d3.extent(data, function (d) { return d.y }))

     svg.append('g')
     .attr('class', 'x axis')
     .attr('transform', 'translate(0,' + newHeight + ')')
     .call(xAxis)

     svg.append('g')
     .attr('class', 'y axis')
     .call(yAxis)
     .append('text')
     .attr('y', 6)
     .attr('dy', '.71em')
     .style('text-anchor', 'end')
     .text('Confidence Score')
     .attr('transform', 'translate(-60,0) rotate(-90)')

     svg.append('path')
     .datum(data)
     .attr('class', 'line')
     .attr('d', line)

     return node.toReact()
  }
}

export default LineChart
