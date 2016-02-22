import d3 from 'd3'
import ReactFauxDOM from 'react-faux-dom'
import Donut3DLib from './Donut3D';

var Donut3D = Donut3DLib.lib;

class DonutChart extends React.Component {
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    data: React.PropTypes.array,
    colorRange: React.PropTypes.array,
  };

  render () {
    var {width, height, data, colorRange} = this.props
    var radius = Math.min(width, height) / 2;

    var node = ReactFauxDOM.createElement('svg')

    var svg = d3.select(node)
        .attr("width", width)
        .attr("height", height);

      var salesData=[
        	{label:"Basic", color:"#3366CC"},
        	{label:"Plus", color:"#DC3912"},
        	{label:"Lite", color:"#FF9900"},
        	{label:"Elite", color:"#109618"},
        	{label:"Delux", color:"#990099"}
        ];



svg.append("g").attr("id","salesDonut");
svg.append("g").attr("id","quotesDonut");

Donut3D.draw("salesDonut", randomData(), width/2, height/2, width/2, height/2, 10, 0.4);
//Donut3D.draw("quotesDonut", randomData(), 450, 150, 130, 100, 30, 0);

function changeData(){
	Donut3D.transition("salesDonut", randomData(), 130, 100, 30, 0.4);
	//Donut3D.transition("quotesDonut", randomData(), 130, 100, 30, 0);
}

function randomData(){
	return salesData.map(function(d){
		return {label:d.label, value:1000*Math.random(), color:d.color};});
}


     return node.toReact()
  }
}

export default DonutChart
