import React from 'react';
import mui from 'material-ui';
import cs from "./style.css";
import mstyles from 'material-ui/lib/styles';
import SatisfiedIcon from '../../common/svg/sentimentSatisfied';
import NeutralIcon from '../../common/svg/sentimentNeutral';
import DissatisfiedIcon from '../../common/svg/sentimentDissatisfied';

var {ListItem, Avatar} = mui;
const colors = mstyles.Colors;

var {ListItem, Avatar, Card, CardActions, CardHeader, CardTitle, CardText, FlatButton, CardText } = mui;

class Listing extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let cmt = this.props.comment;
    let subtitle = `${cmt.createdAgo} by ${cmt.author} | Subreddit: ${cmt.subreddit}`;
    let backgroundColor = cmt.sentiment === "Positive" ? colors.lightGreenA700
      : cmt.sentiment === "Negative" ? colors.red500 : colors.grey300;
    let sentimentIcon = cmt.sentiment === "Positive" ? <SatisfiedIcon />
      : cmt.sentiment === "Negative" ? <DissatisfiedIcon /> : <NeutralIcon />;
    let urlDiv = <div></div>;
    if(cmt.data.url)
      urlDiv = <div style={styles.labelDiv}><span style={styles.label}>Link:</span><a href="{cmt.data.url}" target="_blank">{cmt.data.url}</a></div>

    return (
      <ListItem
        initiallyOpen={false}
        primaryTogglesNestedList={true}
        innerDivStyle={styles.listItemInnerDiv}
        nestedItems={[
          <Card key={1}>
             <CardText style={styles.cardText}>
               <div><h3 style={styles.infoTitle}>Comment Info</h3></div>
               <div style={styles.labelDiv}><span style={styles.label}>Sentiment:</span>{cmt.sentiment}</div>
               <div style={styles.labelDiv}><span style={styles.label}>Confidence:</span>{cmt.confidence}</div>
               <div style={styles.labelDiv}><span style={styles.label}>Subreddit:</span>{cmt.data.subreddit}</div>
               <div style={styles.labelDiv}><span style={styles.label}>Author:</span>{cmt.data.author}</div>
               {urlDiv}
               <div style={styles.labelDiv}><span style={styles.label}>Comment Text:</span><div>{cmt.text}</div></div>
             </CardText>
          </Card>,
        ]}
        leftAvatar={
          <Avatar
            color={colors.grey50}
            backgroundColor={backgroundColor}
            size={30} >
            <span className={cs.scoreCount}>{sentimentIcon}</span>
          </Avatar> }
          >
        <div className={cs.titleText}>{cmt.data.body}</div>
        <div className={cs.subtitleText}>{subtitle}</div>
      </ListItem>
    )
  };
}

export default Listing;

var styles = {
  listItemInnerDiv: {
    paddingTop: 10,
    paddingBottom: 10
  },
  cardText: {
    margin: '0 10px 10px 10px',
    paddingTop: 2,
    paddingBottom: 2
  },
  infoTitle: {
    marginTop: 5,
  },
  labelDiv: {
    marginLeft: 5
  },
  label: {
    fontWeight: 'bold',
    display: 'inline-block',
    width: 120,
    padding: '5px 0',
  }
};
