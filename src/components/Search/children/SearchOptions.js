import React from "react";
import mui from 'material-ui';
import ListIcon from 'material-ui/lib/svg-icons/action/list';
import LimitDropDown from './LimitDropDown';
import FromDropDown from './FromDropDown';
import theme from '../../../common/theme-config';

var { ListItem } = mui;
var themeColors = theme.palette;

class SearchOptions extends React.Component {
  constructor(props){
      super(props);
  }

  render() {
    return (
      <ListItem
       primaryText="Options"
       leftIcon={<ListIcon color={themeColors.alternateTextColor} />}
       initiallyOpen={true}
       disabled={false}
       primaryTogglesNestedList={true}
       style={styles.searchOptions}
       nestedItems={[
         <ListItem
           key={1}
           disabled={true}
           innerDivStyle={styles.innerDivStyle} >
            <LimitDropDown />
         </ListItem>,
          <ListItem
            key={2}
            disabled={true}
            innerDivStyle={styles.innerDivStyle} >
              <FromDropDown />
          </ListItem>,
       ]}
     />
    );
  } //render
}

export default SearchOptions;

var styles = {
  searchOptions: {
    backgroundColor: themeColors.primary1Color,
    color: themeColors.alternateTextColor
  },
  innerDivStyle: {
      marginLeft: 10
  }
};
