import React from 'react';
import mui from 'material-ui';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeConfig from '../theme-config';

var Colors = mui.Styles.Colors;
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

  render() {
    return (
      <div id="container">
        <AppBar title="Reddit Sentiment Analysis" />
        {this.props.children}
      </div>
    );
  }
}

export default App;
