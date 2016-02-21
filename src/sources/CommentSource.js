import Actions from '../actions';
import request from 'superagent';
import mockcomments from './mockdata/comments.js';
import mocksentiment from './mockdata/sentiment.js';

let CommentSource = {
  getComments: {
    remote(state, searchData){
      return new Promise((resolve, reject) => {
        let term = null,
        limitCount = 2,
        fromWhen = null;
        if(searchData && searchData.searchTerm){
          term = searchData.searchTerm;
          limitCount = searchData.limitCount;
          fromWhen = searchData.fromWhen;
        }
        if (!term && state.selectedTerm){
          term = state.selectedTerm.name;
        }
        if(!term) reject("No term");;

        var url = "https://api.pushshift.io/reddit/search/comment?q=" +
           term + "&limit=" + limitCount;
        if(fromWhen)
          url += "&after=" + fromWhen;

        if(false){
          setTimeout(function(){resolve({term: term, res: mockcomments})},100);
        } else {
          request
            .get(url)
            .on('error', reject)
            .end(function(err, res){
              if(err)
                reject(err, res);
              resolve({term: term, res: JSON.parse(res.text)});
            });
        }

      });
    },
    success: Actions.commentsReceived,
    error: Actions.commentsFailed,
    loading: Actions.searchingForComments
  },

  getSentiment: {
    remote(state, comment){
      return new Promise((resolve, reject) => {
        var url = `https://twinword-sentiment-analysis.p.mashape.com/analyze/`;
        let txt = "text=" + comment.data.body;

        if(false){
          setTimeout(function(){
            let score = ((Math.random() * 2) - 1);
            let mockData = {"type":"neutral","score":0.029744551857835,"ratio":-0.19125097879389,"keywords":[{"word":"enjoy","score":0.989764632},],"version":"4.0.0","author":"twinword inc.","email":"feedback@twinword.com","result_code":"200","result_msg":"Success"};
            mockData.score = score;
            mockData.type = score > 0 ? "positive" : "negative";

            resolve({
              key: comment.key,
              res: mockData
            });
          },100);
        } else {
          request
            .post(url)
            .type('form')
            .set('X-Mashape-Key', 'j77ElPnAUamshgMwUzWdstRcRnK4p18xrHmjsnZO4p8rsAhXwt')
            .set('Accept', 'application/json')
            .send(txt)
            .on('error', reject)
            .end(function(err, res){
              if(err)
                reject(err, res);
              resolve({
                key: comment.key,
                res: JSON.parse(res.text)
              });
            });
        }
      });
    },
    success: Actions.sentimentReceived,
    error: Actions.sentimentFailed
  },

  getSentimentBatch: {
    remote(state, comments){
      return new Promise((resolve, reject) => {
        if(false){
          setTimeout(function(){resolve(mocksentiment);},100);
        } else {
          let url = `http://sentiment.vivekn.com/api/batch/`;
          let xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
              } else {
                reject(xhr.responseText);
              }
            }
          };
          xhr.open("POST", url);
          xhr.send(JSON.stringify(comments));
        }
      });
    },
    success: Actions.sentimentBatchReceived,
    error: Actions.sentimentBatchFailed
  }
}

export default CommentSource;
