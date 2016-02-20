import Actions from '../actions';

let SearchTermSource = {
  getSearchTerms: {
    remote(state, selectedSearchTermKey){
      return new Promise((resolve, reject) => {
        var mockData = {
          'Microsoft': {
            name: 'Microsoft'
          },
          'Nike': {
            name: 'Nike'
          }
        };

        selectedSearchTermKey = selectedSearchTermKey || _.keys(mockData)[0];
          var selectedTerm = mockData[selectedSearchTermKey];
          if(selectedTerm){
            selectedTerm.selected = true;
          }

        setTimeout(function () {
          resolve(mockData);
        }, 7000);
      });
    },
    success: Actions.searchTermsReceived,
    error: Actions.searchTermsFailed
  }
}

export default SearchTermSource;
