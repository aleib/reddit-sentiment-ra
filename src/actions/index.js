import alt from '../alt';

class Actions {
  constructor(){
    this.generateActions(
      'termSelected',
      'searchingTerms',
      'searchTermsReceived',
      'searchTermsFailed',
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
