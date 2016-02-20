import alt from '../alt';

class Actions {
  constructor(){
    this.generateActions(
      'termSelected',
      'searchingTerms',
      'searchTermsReceived',
      'searchTermsFailed',
      'updateOptions',
    );
  }
}

export default alt.createActions(Actions);
