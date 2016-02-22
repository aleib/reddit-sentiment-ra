import alt from '../alt';
import Actions from '../actions';
import SearchTermSource from '../sources/SearchTermSource';
import CommentSource from '../sources/CommentSource';

class SearchTermStore {
  constructor(){
    this.bindListeners({
      termSelected: Actions.termSelected,
      searchingTerms: Actions.searchingTerms,
      searchTermsReceived: Actions.searchTermsReceived,
      termSelected: Actions.termSelected,
      updateOptions: Actions.updateOptions
    });

    this.registerAsync(SearchTermSource);
    this.registerAsync(CommentSource);

    this.state = {
      searchTerms: [],
      searchingTerms: false,
      selectedTerm: null,
      limitCount: 50,
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
    });

    setTimeout(this.getInstance().getComments(selectedTerm), 100);
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

    setTimeout(this.getInstance().getComments, 100);
  }

  updateOptions(options){
    if(options && options["limitCount"])
      this.setState({ limitCount: options["limitCount"] });
    if(options && options["fromWhen"])
      this.setState({ fromWhen: options["fromWhen"] });
  };
}

export default alt.createStore(SearchTermStore, 'SearchTermStore');
