import d3 from 'd3'
import React from 'react'
import ReactFauxDOM from 'react-faux-dom'

class PieChart extends React.Component {
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    data: React.PropTypes.array,
    colorRange: React.PropTypes.array,
  };

  render () {
    var {width, height, data, colorRange} = this.props

    var radius = Math.min(width, height) / 2;
    var margin = {top: 20, right: 20, bottom: 30, left: 50};
    colorRange = colorRange != null ? colorRange : ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];
    var color = d3.scale.ordinal().range(colorRange);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value; });

    var node = ReactFauxDOM.createElement('svg')

    var svg = d3.select(node)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.label); });

      g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.data.label; });

     return node.toReact()
  }
}

export default PieChart
