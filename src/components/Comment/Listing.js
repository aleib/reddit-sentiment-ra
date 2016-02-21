import React from 'react';
import mui from 'material-ui';

var {Card, CardHeader} = mui;

class Listing extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let subtitle =
      <div className={styles.additionalInfo}>
        <span>Reddit Score: {this.props.listing.data.score} | </span>
        <span>Total Comments: {this.props.listing.data.num_comments} | </span>
        <span>submitted {this.props.listing.created} ago by {this.props.listing.data.author}</span>
      </div>

    return (
      <Card>
        <CardHeader
          title={lsting.data.title}
          subtitle={subtitle}
          avatar={lsting.data.thumbnail}
        />
      </Card>
    );
  }
}

export default Listing;
