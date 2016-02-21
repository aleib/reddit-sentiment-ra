import React from 'react';
import Actions from '../../actions';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import SearchTermStore from '../../stores/SearchTermStore';
import connectToStores from 'alt-utils/lib/connectToStores';

class FromDropDown extends React.Component {
  constructor(props) {
    super(props);
  }

  static getStores(){
    return [SearchTermStore];
  }

  static getPropsFromStores(){
    return  SearchTermStore.getState();
  }

  updateOption(event, index, value){
    Actions.updateOptions({fromWhen: value});
  }

  render() {
    return (
      <div>
        <span style={styles.dropDownMenuText}>From: </span>
        <DropDownMenu
          value={this.props.fromWhen}
          openImmediately={false}
          onChange={this.updateOption}
          style={styles.dropDownMenu} >
          <MenuItem value={'all'} primaryText="Any time"/>
          <MenuItem value={'1d'} primaryText="Past 24 hours"/>
          <MenuItem value={'1w'} primaryText="Past week"/>
          <MenuItem value={'4w'} primaryText="Past month"/>
        </DropDownMenu>
      </div>
    );
  }
}

export default connectToStores(FromDropDown);

var styles = {
  dropDownMenuText: {
    width: 150,
    display: 'inline-block'
  },
  dropDownMenu: {
    position: 'absolute',
    overflow: 'visible',
    top: -6,
    right: 14
  }
};
