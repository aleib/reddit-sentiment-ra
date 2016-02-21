import React from "react";
import TextField from 'material-ui/lib/text-field';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Actions from '../../../actions';
import mui from 'material-ui';
import connectToStores from 'alt-utils/lib/connectToStores';
import SearchTermStore from '../../../stores/SearchTermStore';
import CommentStore from '../../../stores/CommentStore';
import theme from '../../../common/theme-config';

//Icons
import SearchIcon from 'material-ui/lib/svg-icons/action/search';

var { ListItem } = mui;
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
    if(!this.props.location.hash.startsWith('#/search/')){
        this.refs.searchField.focus();
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
    );
  }
}

export default connectToStores(SearchBox);

var styles = {
  search: {
    backgroundColor: themeColors.primary1Color,
    color: themeColors.alternateTextColor
  },
  searchInnerDiv: {
    marginLeft: 10,
    paddingTop: 0
  },
  searchCard: {
      width: '330px',
      flex: '0 0 330px'
  },
  textField: {
    width: 210
  },
  searchIcon: {
      marginLeft: 20,
      position: 'relative',
      top: 10,
      boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 1px 5px, rgba(0, 0, 0, 0.227451) 0px 1px 5px'
  }
};
