import Actions from '../../../actions';
import Comment from './Comment.js';
import connectToStores from 'alt-utils/lib/connectToStores';
import CommentStore from '../../../stores/CommentStore';
import cstyles from "../style.css";
import mstyles from 'material-ui/lib/styles';
import Progress from '../../../common/components/Progress';
import Listing from './Listing.js';
import CommentIcon from 'material-ui/lib/svg-icons/communication/comment';

var { RaisedButton, DatePicker } = mui;
const colors = mstyles.Colors;

class CommentOptions extends React.Component {
  constructor(props){
    super(props);
    // this.state = {
    //   showPositive: null,
    //   listing: null
    // };
  }

  static getStores(){
    return [CommentStore];
  }

  static getPropsFromStores(){
    return  CommentStore.getState();
  }

  toggleOption(e){
    var option = this;
    if(option){
        Actions.updateCommentFilterOptions({toggle: option});
    }
  }

  dateFromChange = (event, date) => {
    Actions.updateCommentFilterOptions({minDate: date});
  };
  dateToChange = (event, date) => {
    Actions.updateCommentFilterOptions({maxDate: date});
  };

  render(){
    let btnStyle = function(enabled){
      if(enabled)
        return { color: colors.grey50, backgroundColor: colors.orange900 };
      return { color: colors.grey900, backgroundColor: colors.grey50 };
    }
    let formatDate = function(date){
      return moment(date).format('Do MMM YYYY');
    }

    let allStyle = btnStyle(this.props.showAll);
    let posStyle = btnStyle(this.props.showPositive);
    let neuStyle = btnStyle(this.props.showNeutral);
    let negStyle = btnStyle(this.props.showNegative);

    return (
      <div style={styles.optionsDiv}>
        <RaisedButton label="All"
          style={styles.toggleBtn}
          labelColor={allStyle.color}
          backgroundColor={allStyle.backgroundColor}
          onClick={this.toggleOption.bind('showAll')} />
        <RaisedButton label="Positive"
          style={styles.toggleBtn}
          labelColor={posStyle.color}
          backgroundColor={posStyle.backgroundColor}
          onClick={this.toggleOption.bind('showPositive')} />
        <RaisedButton label="Neutral"
          style={styles.toggleBtn}
          labelColor={neuStyle.color}
          backgroundColor={neuStyle.backgroundColor}
          onClick={this.toggleOption.bind('showNeutral')} />
        <RaisedButton label="Negative"
          style={styles.toggleBtn}
          labelColor={negStyle.color}
          backgroundColor={negStyle.backgroundColor}
          onClick={this.toggleOption.bind('showNegative')} />
        <div style={styles.datepickerDiv}>
          <span style={styles.datepickerSpan}>From Date:</span>
          <div style={styles.datepickerDiv}>
            <DatePicker hintText="From Date"
              mode="landscape"
              textFieldStyle={styles.datepickerTextField}
              defaultDate={this.props.minDate}
              minDate={this.props.minDate}
              maxDate={new Date()}
              formatDate={formatDate}
              onChange={this.dateFromChange}/>
          </div>
        </div>
        <div style={styles.datepickerDiv}>
          <span style={styles.datepickerSpan}>To Date:</span>
          <div style={styles.datepickerDiv}>
            <DatePicker hintText="To Date"
              mode="landscape"
              textFieldStyle={styles.datepickerTextField}
              defaultDate={new Date()}
              minDate={this.props.minDate}
              maxDate={new Date()}
              formatDate={formatDate}
              onChange={this.dateToChange}/>
          </div>
        </div>
      </div>
    );
  }
}

export default connectToStores(CommentOptions);

var styles = {
  optionsDiv: {
    padding: '10px 10px 10px 40px',
  },
  toggleBtn: {
    marginRight: 10,
  },
  datepickerSpan: {
    display: 'inline-block',
    marginLeft: 30,
    marginRight: 8,
    fontWeight: 'bold'
  },
  datepickerDiv: {
    display: 'inline-block'
  },
  datepickerTextField: {
    width: 120
  }
};
