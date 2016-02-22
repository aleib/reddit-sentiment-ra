import Colors from 'material-ui/lib/styles/colors';
import connectToStores from 'alt-utils/lib/connectToStores';
import CommentStore from '../../stores/CommentStore';
import cstyles from "./style.css";
import Progress from '../../common/components/Progress';
import Listing from './Children/Listing.js';
import Comment from './Children/Comment.js';
import CommentOptions from './Children/CommentOptions';
import theme from '../../common/theme-config';

//Icons
import CommentIcon from 'material-ui/lib/svg-icons/communication/comment';

var {Card, List, CardHeader, Divider } = mui;
var themeColors = theme.palette;

//Reddit Comments
class CommentList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      comments: null,
      listing: null
    };
  }

  static getStores(){
    return [CommentStore];
  }

  static getPropsFromStores(){
    return  CommentStore.getState();
  }

  render(){
    if(!this.props.commentsLoaded || !this.props.sentimentLoaded) return (<div></div>);

    if(this.props.searchingForComments){
      return (<Card><Progress/></Card>);
    }

    let listingCard = null;

    let commentNodes = _.values(this.props.displayComments).map((comment, i)=> {
      return ( <Comment comment={comment} key={comment.key} />);
    });

    if(this.props.listing){
      listingCard = <Listing />
    }

    return (
      <Card>
        <div>{listingCard}</div>
        <Card style={styles.filterCard}>
          <CardHeader
            title="Comments"
            style={styles.commentsHeader}
            titleStyle={styles.commentsTitle}
            avatar={<CommentIcon color={Colors.grey50}/>} />
          <CommentOptions />
        </Card>
        <Divider />
        <List>{commentNodes}</List>
      </Card>
    );
  }
}

export default connectToStores(CommentList);

var styles = {
  filterCard: {
  },
  commentsHeader: {
    height: 50,
    paddingBottom: 0,
    backgroundColor: themeColors.primary1Color,
  },
  commentsTitle: {
    fontSize: 16,
    marginLeft: 16,
    marginTop: 4,
    color: themeColors.alternateTextColor,
  }
};
