import React from 'react';
import mui from 'material-ui';
import _ from 'lodash';
import moment from 'moment'
import Colors from 'material-ui/lib/styles/colors';
import PieChart from '../../../common/d3/PieChart'
import theme from '../../../common/theme-config';
import Actions from '../../../actions';

//Icons
import InfoIcon from 'material-ui/lib/svg-icons/action/info-outline';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';
import NumberIcon from 'material-ui/lib/svg-icons/editor/format-list-numbered';
import SatisfiedIcon from '../../../common/svg/sentimentSatisfied';
import NeutralIcon from '../../../common/svg/sentimentNeutral';
import DissatisfiedIcon from '../../../common/svg/sentimentDissatisfied';

var {List, ListItem} = mui;
var themeColors = theme.palette;

class ResultContainer extends React.Component {
  constructor(props){
    super(props);
  }

  toggleFilterOption(e){
    var option = this;
    if(option){
        Actions.updateCommentFilterOptions({toggle: option});
    }
  }

  render(){
    let cmmts = this.props.comments;
    let positives = _.filter(cmmts, function(c) { return c.sentiment === "Positive"; });
    let neutrals = _.filter(cmmts, function(c) { return c.sentiment === "Neutral"; });
    let negatives = _.filter(cmmts, function(c) { return c.sentiment === "Negative"; });
    let posCnt = positives.length;
    let neuCnt = neutrals.length;
    let negCnt = negatives.length;
    let totalCnt = posCnt + negCnt + neuCnt;
    let posPercent = Math.round(posCnt / totalCnt * 100);
    let neuPercent = Math.round(neuCnt / totalCnt * 100);
    let negPercent = Math.round(negCnt / totalCnt * 100);

    let searchTerm = `Search Term: ${this.props.searchTerm}`;
    let total = `Total Comments: ${totalCnt}`;
    let pos = `${posPercent}% Positive (${posCnt})`;
    let neu = `${neuPercent}% Neutral (${neuCnt})`;
    let neg = `${negPercent}% Negative (${negCnt})`;

    let pieData = [{label: "Positive", value: posPercent},{label: "Neutral", value: neuPercent},{label: "Negative", value: negPercent}];
    let colorRange = [Colors.lightGreenA700, Colors.grey300, Colors.red500];

    return (
      <div style={styles.infoDiv}>
          <div style={styles.innerInfoDiv}>
            <List>
              <ListItem primaryText={searchTerm}
                disabled={true}
                leftIcon={<SearchIcon />}
                innerDivStyle={styles.infoListItem} />
              <ListItem primaryText={total}
                leftIcon={<NumberIcon />}
                innerDivStyle={styles.infoListItem}
                onClick={this.toggleFilterOption.bind('showAll')} />
              <ListItem primaryText={pos}
                leftIcon={<SatisfiedIcon />}
                innerDivStyle={styles.infoListItem}
                onClick={this.toggleFilterOption.bind('showPositive')} />
              <ListItem primaryText={neu}
                leftIcon={<NeutralIcon />}
                innerDivStyle={styles.infoListItem}
                onClick={this.toggleFilterOption.bind('showNeutral')} />
              <ListItem primaryText={neg}
                leftIcon={<DissatisfiedIcon />}
                innerDivStyle={styles.infoListItem}
                onClick={this.toggleFilterOption.bind('showNegative')} />
            </List>
          </div>
          <div style={styles.pieDiv}>
              <PieChart
                 width={300}
                 height={230}
                 data={pieData}
                 colorRange={colorRange}
               />
          </div>
      </div>
    );
  }
}

export default ResultContainer;

var styles = {
  infoDiv: {
      margin: '10px 20px 10px 30px'
    },
  innerInfoDiv: {
      width: '50%',
      display: 'inline-block',
      verticalAlign: 'top'
    },
  infoListItem: {
    padding: '16px 16px 12px 66px',
  },
  pieDiv: {
      width: '50%',
      display: 'inline-block'
    }
};
