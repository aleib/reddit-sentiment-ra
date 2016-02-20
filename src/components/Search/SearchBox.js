import React from "react";
import Actions from '../../actions';
import _ from 'lodash';
import mui from 'material-ui';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import connectToStores from 'alt-utils/lib/connectToStores';
import SearchTermStore from '../../stores/SearchTermStore';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Progress from '../../common/components/Progress';

import ListIcon from 'material-ui/lib/svg-icons/action/list';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';

var {List, ListItem, Card, DropDownMenu, Divider } = mui;

const style = {
  searchBtn: {
    marginLeft: 20
  },
  searchIcon: {
      marginLeft: 10
  }
};

class SearchBox extends React.Component {
  constructor(props){
      super(props);
  }

  static getStores(){
    return [SearchTermStore];
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
    } else {
      this.refs.searchField.focus();
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

  handleSearchTermChange = (event) => {
    this.setState({ searchBoxSearchTerm: event.target.value })
  };

  render() {
    if(this.props.searchingTerms){
      return ( <Card style={styles.progressCard}><Progress /></Card> );
    }

    return (
      <Card style={styles.searchCard}>
        <div>
         <List>
           <ListItem
              primaryText="Search"
              leftIcon={<SearchIcon />}
              disabled={true}
              initiallyOpen={true}
              nestedItems={[
                <ListItem
                  key={1}
                  disabled={true}
                  innerDivStyle={styles.searchInnerDiv}>
                  <TextField
                    ref="searchField"
                    value={this.state.searchBoxSearchTerm}
                    onChange={this.handleSearchTermChange.bind(this)}
                    hintText="Term: eg. Micosoft"
                    style={styles.textField} />
                  <FloatingActionButton
                    mini={true}
                    style={style.searchIcon}>
                      <SearchIcon />
                    </FloatingActionButton>
                </ListItem>
             ]} />
           <Divider />
         </List>
        </div>
      </Card>
    );
    //<Divider />
    //<SearchTermList {...this.props} />
  }
}

export default connectToStores(SearchBox);

var styles = {
  searchInnerDiv: {
    marginLeft: 10,
    paddingTop: 0
  },
  progressCard: {
    flexGrow: 1
  },
  searchCard: {
      width: '300px'
  },
  textField: {
    width: 180
  }
};
