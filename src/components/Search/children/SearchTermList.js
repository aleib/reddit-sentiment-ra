import React from 'react';
import SearchTerm from './SearchTerm.js';
import mui from 'material-ui';
import connectToStores from 'alt-utils/lib/connectToStores';
import SearchTermStore from '../../../stores/SearchTermStore';
import HistoryIcon from 'material-ui/lib/svg-icons/action/history';

var {Card, List, CircularProgress, ListItem} = mui;

class SearchTermList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchTerms: null
    };
  }

  componentDidMount(){
    let term = null;
    if(this.props.location.hash.startsWith('#/search/') ){
        term = this.props.location.hash.replace('#/search/', '');
    }
    this.state.selectedTerm = term;
    SearchTermStore.getSearchTerms(this.state.selectedTerm);
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

  static getStores(){
    return [SearchTermStore];
  }

  static getPropsFromStores(){
    return SearchTermStore.getState();
  }

  // <Card style={{
  //   flexGrow: 1
  // }}>
  //   <List
  //     subheader="Previous Search Terms">
  //     {searchTermNodes}
  //   </List>
  // </Card>

  render(){
    if(!this.props.searchTerms){
      return (
        <Card style={{ flexGrow: 1 }}>
        <CircularProgress
          mode="indeterminate"
          style={{
            paddingTop: '20px',
            paddingBottom: '20px',
            margin: '0 auto',
            display: 'block',
            width: '60px'
          }}
        />
      </Card>
      );
    }

    var searchTermNodes = _(this.props.searchTerms)
      .keys()
      .map((k, i)=> {
        let term = this.props.searchTerms[k];
        return (
          <SearchTerm term={term} key={i}/>
        );
      }).value();

    return (
      <ListItem
       primaryText="Previous Terms"
       leftIcon={<HistoryIcon />}
       initiallyOpen={true}
       disabled={true}
       primaryTogglesNestedList={true}
       nestedItems={searchTermNodes}
     />
    );
  }
}

export default connectToStores(SearchTermList);
