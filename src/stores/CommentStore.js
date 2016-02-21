import alt from '../alt';
import Actions from '../actions';
import CommentSource from '../sources/CommentSource';
import _ from 'lodash';
import moment from 'moment';

class CommentStore {
  constructor(){
    this.bindListeners({
      searchingForComments: Actions.searchingForComments,
      commentsReceived: Actions.commentsReceived,
      commentsFailed: Actions.commentsFailed,
      sentimentReceived: Actions.sentimentReceived,
      sentimentBatchReceived: Actions.sentimentBatchReceived,
      updateCommentFilterOptions: Actions.updateCommentFilterOptions,
    });

    this.registerAsync(CommentSource);

    this.state = {
      searchTerm: '',
      listings: null,
      commentsLoaded: false,
      searchingForComments: false,
      retrievingSentiment: false,
      sentimentLoaded: false,
      sentimentCount: 0,
      comments: [],
      displayComments: [],
      showAll: true,
      showPositive: false,
      showNegative: false,
      showNeutral: false,
      minDate: null,
      maxDate: null,
    };
  }

  searchingForComments(){
    this.setState({
      searchingForComments: true,
      commentsLoaded: false,
      sentimentLoaded: false
    });
  }

  commentsReceived(data){
    let headComments = data.res.data;
    let newComments = [];

    if(headComments && headComments.length > 0){
      this.setState({
        retrievingSentiment: true,
        sentimentCount: headComments.length
      });
    }

    var minDate = moment.unix(_.minBy(headComments, 'created_utc').created_utc);
    var maxDate = moment.unix(_.maxBy(headComments, 'created_utc').created_utc);

    _(headComments)
      .each((k)=> {
        let mDate = moment.unix(k.created_utc);
        let newComment = {
          key: k.id,
          data: k,
          text: k.body,
          sentiment: '',
          confidence: '0',
          confidenceNum: 0,
          createdDate: mDate.toDate(),
          createdAgo: mDate.fromNow(),
          link_id: k.link_id,
          subreddit: k.subreddit,
          author: k.author,
        };
        //this.getInstance().getSentiment(newComment);
        newComments.push(newComment);
      });

    let commentArray = _.map(newComments, function(c){ return c.text});

    this.setState({
      searchTerm: data.term,
      comments: newComments,
      displayComments: newComments,
      commentsLoaded: true,
      searchingForComments: false,
      minDate: minDate.toDate(),
      maxDate: maxDate.toDate(),
    });

    this.getInstance().getSentimentBatch(commentArray);
  };

  commentsFailed(){
    this.setState({
      searchTerm: null,
      comments: [],
      displayComments: [],
      commentsLoaded: false,
      searchingForComments: false
    });
  };

  sentimentReceived(sentiment){
      let comment = this.state.comments[sentiment.key];
      if(comment){
        let results = sentiment.res;
        let sentScore = Math.floor(results.score * 100);
        comment.sentiment = results;
        comment.sentimentScore = sentScore;
        comment.sentimentPercent = sentScore + "%";

        if(this.state.retrievingSentiment === true){
          let sentCnt = this.state.sentimentCount - 1;
          if(sentCnt <= 0){
            this.setState({
              retrievingSentiment: false,
              sentimentCount: 0
            });
          } else {
            this.setState({
              sentimentCount: sentCnt
            });
          }
        }
      }
  };

  sentimentBatchReceived(results){
      if(results && results.length > 0){
        let comments = this.state.comments;
        _(results).each((s, i)=> {
          comments[i].sentiment = s.result;
          comments[i].confidence = s.confidence;
          comments[i].confidenceNum = isNaN(s.confidence) ? 0 : parseInt(s.confidence);
        });

        this.setState({
          retrievingSentiment: false,
          sentimentLoaded: true,
          sentimentCount: 0
        });
      }
  };

  updateCommentFilterOptions(options){
    let btnToggle = options["toggle"];
    if(btnToggle){
      let stateSet = {};
      stateSet[btnToggle] = true;
      this.setState({ showAll: false, showPositive: false, showNegative: false, showNeutral: false });
      this.setState(stateSet);
    } else {
      if(this.state.showAll) btnToggle = "showAll";
      else if(this.state.showPositive) btnToggle = "showPositive";
      else if(this.state.showNegative) btnToggle = "showNegative";
      else  btnToggle = "showNeutral";
    }

    let allCmts = this.state.comments;
    let filteredCmts = null;
    let minDate = options["minDate"];
    if(minDate){
      this.setState({ minDate: minDate });
    } else {
      minDate = this.state.minDate;
    }
    let maxDate = options["maxDate"];
    if(maxDate){
      this.setState({ maxDate: maxDate });
    } else {
      maxDate = this.state.maxDate;
    }

    let momentMinDate = moment(minDate);
    let momentMaxDate = moment(maxDate);
    filteredCmts = _.filter(allCmts, function(c) {
      return momentMinDate.isSameOrBefore(c.createdDate) && momentMaxDate.isSameOrAfter(c.createdDate);
    });

    switch(btnToggle) {
        case "showPositive":
            filteredCmts = _.filter(filteredCmts, function(c) { return c.sentiment === "Positive"; });
            break;
        case "showNegative":
            filteredCmts = _.filter(filteredCmts, function(c) { return c.sentiment === "Negative"; });
            break;
        case "showNeutral":
            filteredCmts = _.filter(filteredCmts, function(c) { return c.sentiment === "Neutral"; });
            break;
        default:
            break;
    }
    this.setState({ displayComments: filteredCmts });
  };
}

export default alt.createStore(CommentStore, 'CommentStore');
