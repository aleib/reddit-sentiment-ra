import React from 'react';
import mui from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import Progress from '../../common/components/Progress';
import theme from '../../common/theme-config';

//Icons
import InfoIcon from 'material-ui/lib/svg-icons/action/info-outline';

var {Card, CardHeader} = mui;
var themeColors = theme.palette;

export default class MessageCard extends React.Component {
  constructor(props) {
    super(props);
  };

  render(){
    let progress = this.props.useProgress
      ? <Progress/> : <div></div>;

    return (
      <Card style={styles.resultContainerCard}>
        <CardHeader
          title={this.props.title}
          style={styles.commentsHeader}
          titleStyle={styles.commentsTitle}
          avatar={<InfoIcon color={Colors.grey50}/>} />
        <div>{progress}</div>
        <div style={styles.msg}>{this.props.msg}</div>
      </Card>
    );
  };
}

var styles = {
  resultContainerCard: {
    flexGrow: 1,
    marginLeft: 20,
    textAlign: 'center'
  },
  commentsHeader: {
    height: 48,
    paddingTop: 12,
    backgroundColor: themeColors.primary1Color,
    textAlign: 'left'
  },
  commentsTitle: {
    fontSize: 16,
    marginLeft: 16,
    marginTop: 4,
    color: themeColors.alternateTextColor
  },
  msg: {
    verticalAlign: 'middle',
    marginTop: 30,
  },
};
