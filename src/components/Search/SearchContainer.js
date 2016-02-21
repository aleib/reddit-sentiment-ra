import React from "react";
import Actions from '../../actions';
import _ from 'lodash';
import mui from 'material-ui';
import connectToStores from 'alt-utils/lib/connectToStores';
import SearchTermStore from '../../stores/SearchTermStore';
import CommentStore from '../../stores/CommentStore';
import SearchOptions from './children/SearchOptions';
import SearchInput from './children/SearchInput';
import Progress from '../../common/components/Progress';
import theme from '../../common/theme-config';

import ListIcon from 'material-ui/lib/svg-icons/action/list';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';

var {List, Card, Divider } = mui;
var themeColors = theme.palette;

class SearchContainer extends React.Component {
  constructor(props){
      super(props);
  }

  static getStores(){
    return [SearchTermStore, CommentStore];
  }

  static getPropsFromStores(){
    return  SearchTermStore.getState();
  }

  componentDidMount(){
    let term = null;
    if(this.props.location.hash.startsWith('#/search/') ){
        term = this.props.location.hash.replace('#/search/', '');
        this.state.selectedTerm = term;
        SearchTermStore.getSearchTerms(this.state.selectedTerm);
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.location.hash.startsWith('#/search/') ){
      let term = nextProps.location.hash.replace('#/search/', '');
      if(this.state.selectedTerm != term){
        this.state.selectedTerm = term;
        SearchTermStore.getSearchTerms(this.state.selectedTerm);
      }
    }
  }

  render() {
    if(this.props.searchingTerms){
      return ( <Card style={styles.progressCard}><Progress /></Card> );
    }

    return (
      <Card style={styles.searchCard}>
        <div>
         <List style={styles.searchList}>
           <SearchInput location={this.props.location} />
           <Divider />
           <SearchOptions />
         </List>
        </div>
      </Card>
    );
    //<Divider />
    //<SearchTermList {...this.props} />
  }
}

export default connectToStores(SearchContainer);

var styles = {
  searchList: {
    paddingTop: 0,
    paddingBottom: 0
  },
  progressCard: {},
  searchCard: {
      width: '330px',
      flex: '0 0 330px'
  },
};
