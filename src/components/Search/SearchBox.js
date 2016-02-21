import React from "react";
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Actions from '../../actions';
import _ from 'lodash';
import mui from 'material-ui';
import connectToStores from 'alt-utils/lib/connectToStores';
import SearchTermStore from '../../stores/SearchTermStore';
import CommentStore from '../../stores/CommentStore';
import SearchTermList from '../../components/Search/SearchTermList.js';
import MenuItem from 'material-ui/lib/menus/menu-item';
import SearchOptions from './SearchOptions';
import Progress from '../../common/components/Progress';
import theme from '../../common/theme-config';

import ListIcon from 'material-ui/lib/svg-icons/action/list';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';

var {List, ListItem, Card, DropDownMenu, Divider } = mui;
var themeColors = theme.palette;

class SearchBox extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        searchBoxSearchTerm: '',
      };
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

  searchButtonEvent(e){
    if(this.state.searchBoxSearchTerm){
      var data = {
        searchTerm: this.state.searchBoxSearchTerm,
        limitCount: this.props.limitCount,
        fromWhen: this.props.fromWhen,
      };
      CommentStore.getComments(data);
    }
  }

  searchEnterEvent(e){
    if (e.key === "Enter") {
      var data = {
        searchTerm: this.state.searchBoxSearchTerm,
        limitCount: this.props.limitCount,
        fromWhen: this.props.fromWhen,
      };
      CommentStore.getComments(data);
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
         <List style={styles.searchList}>
           <ListItem
              primaryText="Search"
              leftIcon={<SearchIcon color={themeColors.alternateTextColor} />}
              disabled={true}
              initiallyOpen={true}
              style={styles.search}
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
                    onKeyDown={this.searchEnterEvent.bind(this)}
                    style={styles.textField} />
                  <FloatingActionButton
                    mini={true}
                    style={styles.searchIcon}
                    onClick={this.searchButtonEvent.bind(this)}>
                      <SearchIcon />
                    </FloatingActionButton>
                </ListItem>
             ]} />
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

export default connectToStores(SearchBox);

var styles = {
  search: {
    backgroundColor: themeColors.primary1Color,
    color: themeColors.alternateTextColor
  },
  searchList: {
    paddingTop: 0,
    paddingBottom: 0
  },
  searchInnerDiv: {
    marginLeft: 10,
    paddingTop: 0
  },
  progressCard: {

  },
  searchCard: {
      width: '330px',
      flex: '0 0 330px'
  },
  textField: {
    width: 210
  },
  searchBtn: {
    marginLeft: 20
  },
  searchIcon: {
      marginLeft: 20,
      position: 'relative',
      top: 10
  }
};
