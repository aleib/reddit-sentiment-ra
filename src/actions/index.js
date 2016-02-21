import alt from '../alt';

class Actions {
  constructor(){
    this.generateActions(
      'redditSearchReceived',
      'redditSearchFailed',
      'searchingReddit',
      'searchDataReceived',
      'termSelected',
      'searchingTerms',
      'searchTermsReceived',
      'searchTermsFailed',
      'listingsReceived',
      'listingsFailed',
      'listingSelected',
      'commentsReceived',
      'commentsFailed',
      'searchingForComments',
      'sentimentReceived',
      'sentimentFailed',
      'sentimentBatchReceived',
      'sentimentBatchFailed',
      'updateOptions',
      'updateCommentFilterOptions',
    );
  }
}

export default alt.createActions(Actions);
