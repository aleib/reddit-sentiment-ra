import { VictoryChart, VictoryLine, VictoryBar, VictoryAxis } from "victory"

class VictoryBarChart extends React.Component {
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
  };

  render () {
    var {width, height, data} = this.props

    //ToDo: investigate if binning is possible
    // var groupedData = _.values(_.groupBy(data, 'group'));
    // _(groupedData).forEach(function(arrayGroup) {
    //   _(arrayGroup).forEach(function(comment, index) {
    //     comment.x = index;
    //   });
    // });

     return (
      <VictoryChart
        width={width}
        padding={{
          top: 30,
          bottom: 40,
          left: 80,
          right: 20
        }}
        domainPadding={{x: 20}}>
        <VictoryAxis dependentAxis
          label="Confidence Score"
          orientation="left"
          tickValues={[0, 25, 50, 75, 100]}
          style={{
            grid: {
              stroke: "grey",
              strokeWidth: 1
            },
            axis: {stroke: "transparent"},
            ticks: {stroke: "transparent"}
          }}/>
        <VictoryBar
          padding={50}
          width={width}
          data={data}
          style={{
            data: {
              fill: (data) => data.group === "Positive" ? "#64dd17"
                : data.group === "Negative" ? "#f44336" : "#aaaaaa"
            }
          }}
        />

    </VictoryChart>
    );
  };
}

export default VictoryBarChart
