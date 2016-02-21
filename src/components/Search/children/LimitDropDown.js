import React from 'react';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import SearchTermStore from '../../../stores/SearchTermStore';
import Actions from '../../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';

class LimitDropDown extends React.Component {
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
    Actions.updateOptions({limitCount: value});
  }

  render() {
    return (
      <div>
        <span style={styles.dropDownMenuText}>No. of Comments: </span>
        <DropDownMenu
          value={this.props.limitCount}
          openImmediately={false}
          onChange={this.updateOption}
          style={styles.dropDownMenu} >
          <MenuItem value={10} primaryText="10"/>
          <MenuItem value={50} primaryText="50"/>
          <MenuItem value={100} primaryText="100"/>
          <MenuItem value={200} primaryText="200"/>
        </DropDownMenu>
      </div>
    );
  }
}

export default connectToStores(LimitDropDown);

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
