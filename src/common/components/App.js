import React from 'react';
import mui from 'material-ui';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeConfig from '../theme-config';
import IconButton from 'material-ui/lib/icon-button';

var AppBar = mui.AppBar;

class App extends React.Component {

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getChildContext(){
    return {
      muiTheme: ThemeManager.getMuiTheme(ThemeConfig),
    };
  }
  //TODO
  render() {
    return (
      <div id="container">
        <AppBar
          title="Reddit Sentiment Analysis"
          iconElementRight={<IconButton
            iconClassName="muidocs-icon-custom-github" />} />
        {this.props.children}
      </div>
    );
  }
}

export default App;
