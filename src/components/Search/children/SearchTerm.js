import React from 'react';
import mui from 'material-ui';
import Actions from '../../../actions';
import { Router, Route, Link, browserHistory } from 'react-router'

var {ListItem} = mui;

class SearchTerm extends React.Component {
  constructor(props){
    super(props);
  }

  onClick(){
    Actions.termSelected(this.props.term);
  }

  render(){
    let style = {};

    if(this.props.term.selected){
      style.backgroundColor = '#f0f0f0';
    }

    return (
      <ListItem
        href={'/#/search/' + this.props.term.name}
        style={style}
        key={this.props.term.key}
        primaryText={this.props.term.name}
      />
    );
  }
}

export default SearchTerm;
