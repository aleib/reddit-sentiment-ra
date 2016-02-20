import alt from '../alt';
import Actions from '../actions';
import SearchTermSource from '../sources/SearchTermSource';
import _ from 'lodash';

class SearchTermStore {
  constructor(){
    this.bindListeners({
      termSelected: Actions.termSelected,
      searchingTerms: Actions.searchingTerms,
      searchTermsReceived: Actions.searchTermsReceived,
      updateOptions: Actions.updateOptions
    });

    this.registerAsync(SearchTermSource);

    this.state = {
      searchTerms: [],
      searchingTerms: false,
      selectedTerm: null,
      limitCount: 10,
      fromWhen: "all"
    };
  }

  searchingTerms(){
    this.setState({
      searchingTerms: true
    });
  }

  termSelected(selectedTerm){
    _(this.state.searchTerms)
      .values()
      .each((term)=> {
        term.selected = false;
      })
      .value();

    selectedTerm.selected = true;

    this.setState({
      selectedTerm: selectedTerm,
      searchTerms: this.state.searchTerms,
      //messagesDirty: true
    });

  }

  searchTermsReceived(terms){
    let selectedTerm;
    _(terms)
      .each((term) => {
        if(term.selected){
          selectedTerm = term;
        }
      });

    this.setState({
      searchTerms: terms,
      selectedTerm: selectedTerm,
      searchingTerms: false
    });

  }

  updateOptions(options){
    if(options && options["limitCount"])
      this.setState({ limitCount: options["limitCount"] });
    if(options && options["fromWhen"])
      this.setState({ fromWhen: options["fromWhen"] });
  };
}

export default alt.createStore(SearchTermStore, 'SearchTermStore');
