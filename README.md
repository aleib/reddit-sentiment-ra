# Reddit Sentiment Analysis
Reddit sentiment analysis project using React &amp; Flux (Alt)

- [Project Aims](#project-aims)
- [Core Technologies](#core-technologies)
- [Getting Started](#getting-started)
- [Additional info](#additional-info)

## Project Aims

- Retrieve latest comments from Reddit containing a specific term.
- Run sentiment analysis on comments.
- Aggregate results
- Display all comments retrieved & allow for filtering
- Test React & Flux (Alt)

## Core Technologies

- React 0.14
- Flux (Alt)
- D3
- Material UI
- Webpack
- Babel 6
- Express
- Node

## Getting Started

```sh
$ npm install
```

Start the local dev server:

```sh
$ npm run start
```
Navigate to **http://localhost:8080/** to view the app.

## Additional Info
- React Boilerplate:
    - Code taken from Git repo: [pheuter/essential-react](https://github.com/pheuter/essential-react)
    - Clean and simple layout with minimal tools.
- Reddit Search API:
    - Currently Reddit does not allow searching for a term in comments, only in posts/listings.
    - Used [https://api.pushshift.io](https://www.reddit.com/r/redditdev/comments/3zug2y/a_tool_for_searching_reddit_comments_and/) as it tracks latest comments.
- Sentiment Analysis API:
	- Using [vivekn/sentiment-web](https://github.com/vivekn/sentiment-web)
	- Using this API as it is free and allows batch processing
	- Not necessarily accurate sentiment analysis, however meets the needs for the current project
	- Addtional APIs to consider implementing at a later stage:
		- [Alchemy API](http://www.alchemyapi.com/api/sentiment/textc.html): Free (limited use per day), but no batch processing  
       	- [TwinWord](https://www.twinword.com/index.php): Free, no batch processing
