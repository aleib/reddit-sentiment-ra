import React from 'react';
import mui from 'material-ui';
import _ from 'lodash';
import moment from 'moment'
import cstyles from './style'
import connectToStores from 'alt-utils/lib/connectToStores';
import CommentStore from '../../stores/CommentStore';
import LineChart from '../../common/d3/LineChart';
//import BubbleChart from '../../common/d3/BubbleChart';
import MessageCard from './MessageCard';
import InfoTab from './InfoTab'

//Icons
import InfoIcon from 'material-ui/lib/svg-icons/action/info-outline';
import ChartIcon from 'material-ui/lib/svg-icons/editor/insert-chart';

var {Card, Tabs, Tab} = mui;

class ResultContainer extends React.Component {
  constructor(props){
    super(props);
  }

  static getStores(){
    return [CommentStore];
  }

  static getPropsFromStores(){
    return  CommentStore.getState();
  }

  render(){
    if(this.props.retrievingSentiment)
      return ( <MessageCard
        title="Searching"
        msg="Analyzing Sentiment..."
        useProgress={true} />);
    if(this.props.searchingForComments)
      return ( <MessageCard
        title="Searching"
        msg="Retrieving Comments..."
        useProgress={true} />);
    if(!this.props.commentsLoaded)
      return ( <MessageCard
        title="Info"
        msg="Welcome, enter a term to search Reddit comments"
        useProgress={false} />);

    if(!this.props.retrievingSentiment){
      let lineData = _.map(this.props.comments, function square(d) {
        return {
          x: moment.unix(d.createdDate),
          y: d.confidenceNum };
      });

        // var data = this.props.data.map(d => ({
        //   _id: d._id,
        //   value: d.value,
        //   colorValue: d.sentiment,
        //   selected: d.selected
        // }));

      return (
        <Card style={styles.mainCard}>
          <Tabs>
             <Tab icon={<InfoIcon />}>
                <InfoTab {...this.props} />
             </Tab>
             <Tab icon={<ChartIcon />} >
               <div className="lineChart">
                   <LineChart
                      width={800}
                      height={250}
                      data={lineData}
                    />
               </div>
             </Tab>
           </Tabs>
        </Card>
      );
    };

    return (<div></div>);
  }
}

export default connectToStores(ResultContainer);

var styles = {
  mainCard: {
    marginLeft: 30,
    width: 970
  }
};
