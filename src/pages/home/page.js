import React from "react";
import mui from 'material-ui';
import SearchContainer from '../../components/Search/SearchContainer.js';
import CommentList from '../../components/Comment/CommentList.js';
import ResultContainer from '../../components/ResultDashboard/ResultContainer.js';

class HomePage extends React.Component {
  constructor(){
    super();
  }

  //  <ListingList />
  render() {
    return (
    <div style={styles.mainDiv}>
      <div style={styles.searchRow}>
          <SearchContainer {...this.props} />
          <ResultContainer />
      </div>
      <CommentList />
    </div>
    );
  }
}

export default HomePage;

var styles = {
  mainDiv: {
    width: 1200,
    margin: '20px auto'
  },
  searchRow: {
      display: 'flex',
      flexFlow: 'row',
      margin: '20px auto'
  },
};
