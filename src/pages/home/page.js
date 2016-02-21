import React from "react";
import mui from 'material-ui';
import SearchBox from '../../components/Search/SearchBox.js';
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
          <SearchBox {...this.props} />
          <ResultContainer />
      </div>
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
